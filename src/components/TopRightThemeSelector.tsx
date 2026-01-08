import { useState } from 'react';
import { Palette } from 'lucide-react';
import { useTheme, Theme } from '../hooks/useTheme';

const themes: { name: string; value: Theme; color: string; gradient: string; description: string }[] = [
  { 
    name: '深海', 
    value: 'deepsea', 
    color: '#0891b2', 
    gradient: 'linear-gradient(135deg, #0891b2, #0f766e)',
    description: '神秘海洋风格'
  },
  { 
    name: '玫瑰金', 
    value: 'rosegold', 
    color: '#f472b6', 
    gradient: 'linear-gradient(135deg, #f472b6, #fbbf24)',
    description: '优雅奢华风格'
  },
  { 
    name: '梦幻紫', 
    value: 'purple', 
    color: '#a855f7', 
    gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    description: '优雅神秘风格'
  },
  { 
    name: '日落', 
    value: 'sunset', 
    color: '#f97316', 
    gradient: 'linear-gradient(135deg, #f97316, #dc2626)',
    description: '温暖夕阳风格'
  },
  { 
    name: '自然绿', 
    value: 'green', 
    color: '#10b981', 
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    description: '清新自然风格'
  },
  { 
    name: '科技蓝', 
    value: 'blue', 
    color: '#3b82f6', 
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    description: '经典科技风格'
  },
  { 
    name: '活力橙', 
    value: 'orange', 
    color: '#f59e0b', 
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    description: '温暖活力风格'
  },
  { 
    name: '和风', 
    value: 'japanese', 
    color: '#ec4899', 
    gradient: 'linear-gradient(135deg, #ec4899, #1e40af)',
    description: '日式传统美学'
  },
  { 
    name: '赛博朋克', 
    value: 'cyberpunk', 
    color: '#06b6d4', 
    gradient: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
    description: '未来科幻风格'
  },
  { 
    name: '极简', 
    value: 'minimal', 
    color: '#6b7280', 
    gradient: 'linear-gradient(135deg, #6b7280, #374151)',
    description: '简约现代风格'
  }
];

export const TopRightThemeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className="glass-card p-3 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-opacity-50"
          title="切换主题"
          aria-label="打开主题选择菜单"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <Palette className="w-5 h-5 text-white" />
        </button>
        
        {isOpen && (
          <div 
            className="absolute top-full right-0 mt-2 glass-card p-4 rounded-lg min-w-[280px] max-h-[70vh] overflow-y-auto animate-slide-down z-50"
            role="menu"
            aria-label="主题选择菜单"
          >
            <h3 className="text-white font-medium mb-4 text-sm flex items-center gap-2">
              <Palette className="w-4 h-4" />
              主题风格
            </h3>
            <div className="grid grid-cols-1 gap-2" role="group">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  onKeyDown={handleKeyDown}
                  className={`
                    w-full p-3 rounded-lg border transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-opacity-50 group
                    ${theme === themeOption.value 
                      ? 'bg-white/20 border-white/40 scale-[1.02]' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.01]'
                    }
                  `}
                  role="menuitem"
                  aria-current={theme === themeOption.value ? 'true' : 'false'}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full ring-2 ring-white/20 flex-shrink-0"
                      style={{ background: themeOption.gradient }}
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium">
                        {themeOption.name}
                      </div>
                      <div className="text-white/60 text-xs mt-0.5">
                        {themeOption.description}
                      </div>
                    </div>
                    {theme === themeOption.value && (
                      <i className="fas fa-check text-theme-primary text-sm" aria-hidden="true"></i>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-white/50 text-xs text-center">
                选择您喜欢的视觉风格
              </p>
            </div>
          </div>
        )}
      </div>
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};