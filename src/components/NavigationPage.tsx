import { useState, useMemo } from 'react';
import { ArrowUp } from 'lucide-react';
import { NavigationConfig, Category, LinkItem } from '../data/navigationConfig';
import { CategoryCard } from './CategoryCard';
import { SearchFilter } from './SearchFilter';
import { Footer } from './Footer';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ConfirmationDialog } from './ui/confirmation-dialog';
import { PromptDialog } from './ui/prompt-dialog';
import { NotificationDialog } from './ui/notification-dialog';
import { TypewriterEffect } from './TypewriterEffect';

interface NavigationPageProps {
  config: NavigationConfig;
  onConfigUpdate: (config: NavigationConfig) => void;
  onScrollToTop: () => void;
}

export const NavigationPage = ({ config, onConfigUpdate, onScrollToTop }: NavigationPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Dialog states
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    variant?: "destructive" | "default";
  }>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => { },
  });

  const [promptDialog, setPromptDialog] = useState<{
    open: boolean;
    title: string;
    description?: string;
    placeholder?: string;
    defaultValue?: string;
    onConfirm: (value: string) => void;
  }>({
    open: false,
    title: '',
    onConfirm: () => { },
  });

  const [notificationDialog, setNotificationDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    type?: "success" | "error" | "warning" | "info";
  }>({
    open: false,
    title: '',
    description: '',
  });

  // Admin password hash (SHA-256)
  // 从环境变量读取密码哈希,默认密码: admin123
  const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH ||
    '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

  // Typewriter texts
  const typewriterTexts = [
    "漫步云端，链接你的热爱",
    "跃然指间，通往无限可能",
    "轻启一页，奔赴你的专属宇宙",
    "方寸之间，触达万千",
    "你的好奇心导航仪"
  ];

  // Filter categories and links based on search query
  const filteredConfig = useMemo(() => {
    if (!searchQuery.trim()) return config;

    const filtered = {
      ...config,
      categories: config.categories.map(category => ({
        ...category,
        links: category.links.filter(link =>
          link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.url.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category =>
        category.links.length > 0 ||
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    };

    return filtered;
  }, [config, searchQuery]);

  const handleLogin = async (password: string) => {
    try {
      // 使用 SHA-256 哈希验证密码
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      if (hashHex === ADMIN_PASSWORD_HASH) {
        setIsAuthenticated(true);
      } else {
        setNotificationDialog({
          open: true,
          title: '登录失败',
          description: '密码错误,请重新输入',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('密码验证失败:', error);
      setNotificationDialog({
        open: true,
        title: '登录失败',
        description: '密码验证过程出错',
        type: 'error'
      });
    }
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save to localStorage and show success message
    localStorage.setItem('navigation-config', JSON.stringify(config));
    setNotificationDialog({
      open: true,
      title: '保存成功',
      description: '配置已成功保存到本地存储',
      type: 'success'
    });
  };

  const handleReset = () => {
    setConfirmDialog({
      open: true,
      title: '重置配置',
      description: '确定要重置配置吗？这将清除所有自定义设置，无法恢复。',
      variant: 'destructive',
      onConfirm: () => {
        localStorage.removeItem('navigation-config');
        window.location.reload();
      }
    });
  };

  const handleExportConfig = () => {
    const currentConfig = JSON.stringify(config, null, 2);
    const configFileContent = `export interface LinkItem {
  title: string;
  url: string;
  description: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  links: LinkItem[];
}

export interface NavigationConfig {
  title: string;
  subtitle: string;
  categories: Category[];
}

export const defaultConfig: NavigationConfig = ${currentConfig};`;

    // 创建并下载文件
    const blob = new Blob([configFileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'navigationConfig.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setNotificationDialog({
      open: true,
      title: '导出成功',
      description: '配置文件已导出到下载文件夹，请替换 src/data/navigationConfig.ts 文件'
    });
  };

  const handleClearCache = () => {
    // Clear various caches
    localStorage.removeItem('navigation-theme');
    sessionStorage.clear();
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
    setNotificationDialog({
      open: true,
      title: '清理完成',
      description: '缓存已成功清理',
      type: 'success'
    });
  };

  const handleAddCategory = () => {
    setPromptDialog({
      open: true,
      title: '添加分类',
      placeholder: '请输入分类名称',
      onConfirm: (name) => {
        const newCategory: Category = {
          id: Date.now().toString(),
          name,
          icon: 'fas fa-folder',
          links: []
        };
        onConfigUpdate({
          ...config,
          categories: [...config.categories, newCategory]
        });
      }
    });
  };

  const handleEditCategory = (category: Category) => {
    setPromptDialog({
      open: true,
      title: '编辑分类',
      placeholder: '请输入新的分类名称',
      defaultValue: category.name,
      onConfirm: (newName) => {
        if (newName !== category.name) {
          const updatedCategories = config.categories.map(cat =>
            cat.id === category.id ? { ...cat, name: newName } : cat
          );
          onConfigUpdate({
            ...config,
            categories: updatedCategories
          });
        }
      }
    });
  };

  const handleDeleteCategory = (category: Category) => {
    setConfirmDialog({
      open: true,
      title: '删除分类',
      description: `确定要删除分类"${category.name}"吗？此操作无法撤销。`,
      variant: 'destructive',
      onConfirm: () => {
        const updatedCategories = config.categories.filter(cat => cat.id !== category.id);
        onConfigUpdate({
          ...config,
          categories: updatedCategories
        });
      }
    });
  };

  const handleAddLink = (categoryId: string) => {
    let currentStep = 0;
    let linkData: Partial<LinkItem> = {};

    const steps = [
      { title: '网站名称', placeholder: '请输入网站名称', field: 'title' },
      { title: '网站链接', placeholder: '请输入网站链接（如：https://example.com）', field: 'url' },
      { title: '网站描述', placeholder: '请输入网站描述（可选）', field: 'description' },
      { title: '网站图标', placeholder: '请输入图标类名（如：fas fa-link）', field: 'icon' }
    ];

    const showNextStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setPromptDialog({
          open: true,
          title: `添加网站 - ${step.title}`,
          placeholder: step.placeholder,
          defaultValue: step.field === 'icon' ? 'fas fa-link' : '',
          onConfirm: (value) => {
            linkData[step.field as keyof LinkItem] = value || (step.field === 'icon' ? 'fas fa-link' : '');
            currentStep++;

            if (currentStep < steps.length) {
              // Skip description if empty, continue to icon
              if (currentStep === 2 && !value) {
                currentStep++;
              }
              setTimeout(showNextStep, 100);
            } else {
              // Create the link
              const newLink: LinkItem = {
                title: linkData.title!,
                url: linkData.url!,
                description: linkData.description || '',
                icon: linkData.icon || 'fas fa-link'
              };

              const updatedCategories = config.categories.map(cat =>
                cat.id === categoryId
                  ? { ...cat, links: [...cat.links, newLink] }
                  : cat
              );

              onConfigUpdate({
                ...config,
                categories: updatedCategories
              });
            }
          }
        });
      }
    };

    showNextStep();
  };

  const handleEditLink = (categoryId: string, link: LinkItem) => {
    let currentStep = 0;
    let linkData: LinkItem = { ...link };

    const steps = [
      { title: '网站名称', placeholder: '请输入网站名称', field: 'title', value: link.title },
      { title: '网站链接', placeholder: '请输入网站链接', field: 'url', value: link.url },
      { title: '网站描述', placeholder: '请输入网站描述', field: 'description', value: link.description },
      { title: '网站图标', placeholder: '请输入图标类名', field: 'icon', value: link.icon }
    ];

    const showNextStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setPromptDialog({
          open: true,
          title: `编辑网站 - ${step.title}`,
          placeholder: step.placeholder,
          defaultValue: step.value,
          onConfirm: (value) => {
            linkData[step.field as keyof LinkItem] = value || linkData[step.field as keyof LinkItem];
            currentStep++;

            if (currentStep < steps.length) {
              setTimeout(showNextStep, 100);
            } else {
              // Update the link
              const updatedCategories = config.categories.map(cat =>
                cat.id === categoryId
                  ? {
                    ...cat,
                    links: cat.links.map(l => l === link ? linkData : l)
                  }
                  : cat
              );

              onConfigUpdate({
                ...config,
                categories: updatedCategories
              });
            }
          }
        });
      }
    };

    showNextStep();
  };

  const handleDeleteLink = (categoryId: string, link: LinkItem) => {
    setConfirmDialog({
      open: true,
      title: '删除网站',
      description: `确定要删除"${link.title}"吗？此操作无法撤销。`,
      variant: 'destructive',
      onConfirm: () => {
        const updatedCategories = config.categories.map(cat =>
          cat.id === categoryId
            ? { ...cat, links: cat.links.filter(l => l !== link) }
            : cat
        );

        onConfigUpdate({
          ...config,
          categories: updatedCategories
        });
      }
    });
  };

  return (
    <div className="min-h-screen px-4 py-8 relative">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {config.title}
          </h1>
          <div className="text-xl text-white/80 mb-8 h-8">
            <TypewriterEffect
              texts={typewriterTexts}
              className="text-xl text-white/80"
              typingSpeed={80}
              pauseTime={2500}
              deletingSpeed={40}
            />
          </div>

          {/* Search Filter */}
          <div className="flex justify-center mt-8">
            <SearchFilter onSearch={setSearchQuery} />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8 pb-8">
          {filteredConfig.categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isEditing={isEditing}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
              onAddLink={handleAddLink}
              onEditLink={handleEditLink}
              onDeleteLink={handleDeleteLink}
            />
          ))}

          {filteredConfig.categories.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-search text-6xl text-white/20 mb-4"></i>
              <h3 className="text-2xl text-white mb-2">没有找到相关内容</h3>
              <p className="text-white/60">尝试使用不同的关键词搜索</p>
            </div>
          )}
        </div>

        {/* Back to Top Button */}
        <div className="fixed bottom-24 sm:bottom-8 right-4 sm:right-8 z-40">
          <button
            onClick={onScrollToTop}
            className="btn-icon bg-theme-primary/20 hover:bg-theme-primary/30 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-opacity-50"
            title="回到顶部"
            aria-label="返回顶部"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Footer with Admin Controls */}
      <Footer
        isAuthenticated={isAuthenticated}
        isEditing={isEditing}
        onLogin={handleLogin}
        onToggleEdit={handleToggleEdit}
        onSave={handleSave}
        onReset={handleReset}
        onAddCategory={handleAddCategory}
        onClearCache={handleClearCache}
        onExportConfig={handleExportConfig}
      />

      {/* Custom Dialogs */}
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.onConfirm}
      />

      <PromptDialog
        open={promptDialog.open}
        onOpenChange={(open) => setPromptDialog(prev => ({ ...prev, open }))}
        title={promptDialog.title}
        description={promptDialog.description}
        placeholder={promptDialog.placeholder}
        defaultValue={promptDialog.defaultValue}
        onConfirm={promptDialog.onConfirm}
      />

      <NotificationDialog
        open={notificationDialog.open}
        onOpenChange={(open) => setNotificationDialog(prev => ({ ...prev, open }))}
        title={notificationDialog.title}
        description={notificationDialog.description}
        type={notificationDialog.type}
      />
    </div>
  );
};