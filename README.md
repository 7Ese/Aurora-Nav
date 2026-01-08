# 🌟 Aurora Nav - 极光导航

一个功能强大、设计简约的现代化个人导航网站,为您提供极致的浏览体验。

## ✨ 核心特色

### � 双模式智能搜索
- **搜索引擎模式** - 支持多个主流搜索引擎(Google、Bing、百度、DuckDuckGo 等)
- **AI 搜索模式** - 集成 AI 助手(ChatGPT、Claude、Gemini、Perplexity 等),智能问答
- **快速切换** - 一键在传统搜索和 AI 搜索之间无缝切换
- **实时搜索** - 输入即搜,响应迅速

### 🎨 10 种精美主题系统
精心设计的主题配色方案,满足不同审美需求:
- **Blue** - 经典蓝色,专业稳重
- **Purple** - 优雅紫色,神秘梦幻
- **Green** - 清新绿色,自然舒适
- **Orange** - 活力橙色,热情奔放
- **Japanese** - 和风主题,樱花粉与靛蓝的完美融合
- **Cyberpunk** - 赛博朋克,青色与紫色的未来感
- **Minimal** - 极简灰色,简约而不简单
- **Sunset** - 日落渐变,温暖浪漫
- **Deep Sea** - 深海青绿,沉静深邃
- **Rose Gold** - 玫瑰金,奢华典雅

每个主题都配有:
- 🌈 动态渐变背景动画
- 💫 流畅的过渡效果
- 🎭 统一的视觉风格

### ⏰ 实时信息展示
- **动态时钟** - 实时显示当前时间,支持 12/24 小时制
- **日期显示** - 完整的日期信息,包含星期
- **天气预报** - 实时天气信息,支持自定义城市
  - 温度显示
  - 天气状况图标
  - 自动更新

### 🏷️ 灵活的标签管理
- **自定义分类** - 创建无限个分类标签
- **拖拽排序** - 直观的拖拽操作调整顺序
- **图标支持** - 为每个分类设置独特图标
- **颜色标记** - 自定义分类颜色,快速识别
- **批量管理** - 支持批量添加、编辑、删除链接

### � 其他亮点功能
- ⚡ **打字机效果** - 优雅的欢迎文字动画
- �📱 **完美响应式** - 适配桌面、平板、手机等所有设备
- � **本地存储** - 所有配置保存在浏览器,无需服务器
- �🔐 **管理员模式** - 密码保护的编辑功能
- 📤 **导入导出** - 轻松备份和迁移配置
- � **一键重置** - 快速恢复默认配置
- 🧹 **缓存清理** - 管理本地存储空间

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm、pnpm 或 bun

### 安装步骤

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd nova-nav-hub-main

# 2. 安装依赖
npm install
# 或使用 pnpm
pnpm install
# 或使用 bun
bun install

# 3. 复制环境变量配置
cp .env.example .env
```

### 配置说明

编辑 `.env` 文件,配置以下参数:

```env
# 天气 API 密钥 (从 https://openweathermap.org/api 免费获取)
VITE_WEATHER_API_KEY=your_api_key_here

# 管理员密码的 SHA-256 哈希值 (默认密码: admin123)
VITE_ADMIN_PASSWORD_HASH=240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9

# 默认城市 (可选,默认为 Tokyo)
VITE_DEFAULT_CITY=Tokyo
```

### 运行项目

```bash
# 开发模式 (热重载)
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

访问 `http://localhost:8080` 开始使用。

## 🎨 主题系统详解

### 主题切换
点击页面右上角的调色板图标,即可打开主题选择器,实时预览并切换主题。

### 主题特点
每个主题都经过精心设计,包含:
- 主色调和强调色的完美搭配
- 动态渐变背景动画
- 统一的卡片、按钮、输入框样式
- 优化的文字对比度,确保可读性
- 流畅的主题切换动画

### 自定义主题
如需添加自定义主题,可编辑 `src/index.css` 中的主题配置。

## 🔧 管理功能

### 进入管理员模式

1. 点击页面右上角的设置图标 ⚙️
2. 输入管理员密码(默认: `admin123`)
3. 成功登录后进入编辑模式

### 修改管理员密码

在浏览器控制台运行以下代码生成新密码的 SHA-256 哈希:

```javascript
crypto.subtle.digest('SHA-256', new TextEncoder().encode('your_new_password'))
  .then(hash => console.log(
    Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
  ))
```

将生成的哈希值更新到 `.env` 文件的 `VITE_ADMIN_PASSWORD_HASH` 中。

### 管理导航链接

在管理员模式下,您可以:

- ➕ **添加分类** - 创建新的导航分类
- ✏️ **编辑分类** - 修改分类名称、图标、颜色
- 🗑️ **删除分类** - 移除不需要的分类
- 🔗 **添加链接** - 在分类下添加网站链接
- 📝 **编辑链接** - 修改链接标题、URL、描述、图标
- ❌ **删除链接** - 移除不需要的链接
- 💾 **保存配置** - 将修改保存到本地存储
- 🔄 **重置配置** - 恢复为默认配置
- 📤 **导出配置** - 导出为 JSON 文件备份
- � **导入配置** - 从 JSON 文件导入配置
- 🧹 **清理缓存** - 清除本地存储数据

## 📁 项目结构

```
nova-nav-hub-main/
├── src/
│   ├── components/              # React 组件
│   │   ├── HomePage.tsx         # 首页 (时间+天气+搜索)
│   │   ├── NavigationPage.tsx   # 导航页面
│   │   ├── CategoryCard.tsx     # 分类卡片组件
│   │   ├── LinkCard.tsx         # 链接卡片组件
│   │   ├── SearchBar.tsx        # 搜索栏组件
│   │   ├── ThemeSelector.tsx    # 主题选择器
│   │   ├── AdminPanel.tsx       # 管理员面板
│   │   └── ui/                  # shadcn/ui 组件库
│   ├── data/
│   │   └── navigationConfig.ts  # 默认导航配置
│   ├── hooks/
│   │   ├── useLocalStorage.ts   # localStorage 钩子
│   │   ├── useWeather.ts        # 天气数据钩子
│   │   └── useTheme.ts          # 主题管理钩子
│   ├── pages/
│   │   └── Index.tsx            # 主页面
│   ├── utils/
│   │   └── searchEngines.ts     # 搜索引擎配置
│   ├── index.css                # 全局样式和主题定义
│   ├── App.tsx                  # 应用根组件
│   └── main.tsx                 # 应用入口
├── public/                      # 静态资源
├── .env.example                 # 环境变量示例
├── package.json                 # 项目依赖
├── vite.config.ts               # Vite 配置
├── tailwind.config.ts           # Tailwind CSS 配置
└── tsconfig.json                # TypeScript 配置
```

## 🛠️ 技术栈

### 核心框架
- **React 18** - 现代化的 UI 框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite** - 极速的构建工具

### UI 组件
- **Radix UI** - 无样式的可访问组件
- **shadcn/ui** - 精美的组件库
- **Tailwind CSS** - 实用优先的 CSS 框架

### 功能库
- **React Router** - 客户端路由
- **Lucide React** - 精美的图标库
- **date-fns** - 现代化的日期处理
- **React Hook Form** - 高性能表单管理
- **Sonner** - 优雅的通知提示

### 开发工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS 处理工具
- **Autoprefixer** - CSS 自动添加前缀

## 📝 自定义配置

### 修改默认导航
有三种方式自定义导航配置:

1. **直接修改源码** - 编辑 `src/data/navigationConfig.ts` (需要重新构建)
2. **使用管理员模式** - 在线编辑,实时生效
3. **导入配置文件** - 使用管理员模式导入 JSON 配置

### 添加搜索引擎
编辑 `src/utils/searchEngines.ts`,添加新的搜索引擎配置:

```typescript
{
  name: '引擎名称',
  url: 'https://example.com/search?q=',
  icon: '🔍'
}
```

### 自定义天气城市
在 `.env` 文件中设置 `VITE_DEFAULT_CITY` 为您所在的城市名称(英文)。

## 🌐 浏览器支持

- Chrome / Edge (推荐)
- Firefox
- Safari
- Opera

建议使用最新版本的现代浏览器以获得最佳体验。

## 📊 性能优化

- ⚡ Vite 构建,启动速度极快
- 🎯 按需加载,减少初始加载时间
- 💾 本地存储,无需网络请求
- 🖼️ 图标使用 SVG,体积小加载快
- 🎨 CSS 动画,GPU 加速

## 🔒 隐私安全

- 所有数据存储在本地浏览器
- 不收集任何用户信息
- 管理员密码使用 SHA-256 加密
- 无需注册账号
- 无需服务器

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request!

### 贡献流程
1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 开源协议

本项目采用 MIT 协议开源,详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

感谢以下开源项目:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## 📮 联系方式

如有问题或建议,欢迎通过以下方式联系:
- 提交 [Issue](https://github.com/your-repo/issues)
- 发送邮件至: your-email@example.com

---

⭐ 如果这个项目对您有帮助,欢迎给个 Star!
