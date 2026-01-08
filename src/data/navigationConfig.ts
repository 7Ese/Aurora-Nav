export interface LinkItem {
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

export const defaultConfig: NavigationConfig = {
  "title": "11.MD导航",
  "subtitle": "快速访问您的常用网站",
  "categories": [
    {
      "id": "ai",
      "name": "AI工具",
      "icon": "fas fa-robot",
      "links": [
        {
          "title": "ChatGPT",
          "url": "https://chat.openai.com",
          "description": "OpenAI聊天机器人",
          "icon": "fas fa-comments"
        },
        {
          "title": "Grok",
          "url": "https://grok.x.ai",
          "description": "xAI智能助手",
          "icon": "fas fa-brain"
        },
        {
          "title": "DeepSeek",
          "url": "https://chat.deepseek.com",
          "description": "DeepSeek AI助手",
          "icon": "fas fa-microscope"
        },
        {
          "title": "Gemini",
          "url": "https://gemini.google.com",
          "description": "Google AI助手",
          "icon": "fas fa-gem"
        }
      ]
    },
    {
      "id": "dev",
      "name": "开发工具",
      "icon": "fas fa-code",
      "links": [
        {
          "title": "GitHub",
          "url": "https://github.com",
          "description": "代码托管平台",
          "icon": "fab fa-github"
        },
        {
          "title": "Stack Overflow",
          "url": "https://stackoverflow.com",
          "description": "程序员问答社区",
          "icon": "fab fa-stack-overflow"
        },
        {
          "title": "MDN Web Docs",
          "url": "https://developer.mozilla.org",
          "description": "Web开发文档",
          "icon": "fas fa-book"
        },
        {
          "title": "CodePen",
          "url": "https://codepen.io",
          "description": "在线代码编辑器",
          "icon": "fab fa-codepen"
        },
        {
          "title": "VS Code",
          "url": "https://code.visualstudio.com",
          "description": "代码编辑器",
          "icon": "fas fa-laptop-code"
        },
        {
          "title": "npm",
          "url": "https://npmjs.com",
          "description": "Node.js包管理器",
          "icon": "fab fa-npm"
        }
      ]
    },
    {
      "id": "network",
      "name": "网络工具",
      "icon": "fas fa-network-wired",
      "links": [
        {
          "title": "ifconfig.me",
          "url": "https://ifconfig.me",
          "description": "查看公网IP地址",
          "icon": "fas fa-globe"
        },
        {
          "title": "奇安信威胁情报",
          "url": "https://hunter.qianxin.com",
          "description": "网络安全威胁情报",
          "icon": "fas fa-shield-alt"
        }
      ]
    },
    {
      "id": "design",
      "name": "设计资源",
      "icon": "fas fa-palette",
      "links": [
        {
          "title": "Figma",
          "url": "https://figma.com",
          "description": "协作设计工具",
          "icon": "fab fa-figma"
        },
        {
          "title": "Dribbble",
          "url": "https://dribbble.com",
          "description": "设计师作品展示",
          "icon": "fab fa-dribbble"
        },
        {
          "title": "Unsplash",
          "url": "https://unsplash.com",
          "description": "免费高质量图片",
          "icon": "fas fa-camera"
        },
        {
          "title": "Font Awesome",
          "url": "https://fontawesome.com",
          "description": "图标字体库",
          "icon": "fab fa-font-awesome"
        },
        {
          "title": "Adobe Color",
          "url": "https://color.adobe.com",
          "description": "配色方案工具",
          "icon": "fas fa-fill-drip"
        },
        {
          "title": "Canva",
          "url": "https://canva.com",
          "description": "在线设计平台",
          "icon": "fas fa-paint-brush"
        }
      ]
    },
    {
      "id": "tools",
      "name": "实用工具",
      "icon": "fas fa-tools",
      "links": [
        {
          "title": "Google",
          "url": "https://google.com",
          "description": "搜索引擎",
          "icon": "fab fa-google"
        },
        {
          "title": "百度翻译",
          "url": "https://fanyi.baidu.com",
          "description": "在线翻译工具",
          "icon": "fas fa-language"
        },
        {
          "title": "谷歌翻译",
          "url": "https://translate.google.com",
          "description": "Google翻译服务",
          "icon": "fab fa-google"
        },
        {
          "title": "DeepL",
          "url": "https://deepl.com",
          "description": "AI翻译工具",
          "icon": "fas fa-robot"
        },
        {
          "title": "Notion",
          "url": "https://notion.so",
          "description": "笔记和协作工具",
          "icon": "fas fa-sticky-note"
        },
        {
          "title": "Trello",
          "url": "https://trello.com",
          "description": "项目管理工具",
          "icon": "fab fa-trello"
        },
        {
          "title": "1Password",
          "url": "https://1password.com",
          "description": "密码管理器",
          "icon": "fas fa-key"
        }
      ]
    },
    {
      "id": "video",
      "name": "视频娱乐",
      "icon": "fas fa-video",
      "links": [
        {
          "title": "腾讯视频",
          "url": "https://v.qq.com",
          "description": "腾讯视频平台",
          "icon": "fas fa-play-circle"
        },
        {
          "title": "哔哩哔哩",
          "url": "https://bilibili.com",
          "description": "B站视频平台",
          "icon": "fas fa-tv"
        },
        {
          "title": "爱奇艺",
          "url": "https://iqiyi.com",
          "description": "爱奇艺视频",
          "icon": "fas fa-film"
        },
        {
          "title": "Netflix",
          "url": "https://netflix.com",
          "description": "流媒体服务",
          "icon": "fa-solid fa-cloud"
        },
        {
          "title": "YouTube",
          "url": "https://youtube.com",
          "description": "视频分享平台",
          "icon": "fab fa-youtube"
        },
        {
          "title": "网易云音乐",
          "url": "https://music.163.com",
          "description": "网易云音乐平台",
          "icon": "fas fa-headphones"
        },
        {
          "title": "Spotify",
          "url": "https://spotify.com",
          "description": "音乐流媒体",
          "icon": "fab fa-spotify"
        }
      ]
    },
    {
      "id": "learning",
      "name": "学习教育",
      "icon": "fas fa-graduation-cap",
      "links": [
        {
          "title": "Coursera",
          "url": "https://coursera.org",
          "description": "在线课程平台",
          "icon": "fas fa-chalkboard-teacher"
        },
        {
          "title": "edX",
          "url": "https://edx.org",
          "description": "免费在线课程",
          "icon": "fas fa-university"
        },
        {
          "title": "Khan Academy",
          "url": "https://khanacademy.org",
          "description": "免费教育资源",
          "icon": "fas fa-book-open"
        },
        {
          "title": "Udemy",
          "url": "https://udemy.com",
          "description": "技能学习平台",
          "icon": "fas fa-laptop"
        },
        {
          "title": "Duolingo",
          "url": "https://duolingo.com",
          "description": "语言学习应用",
          "icon": "fas fa-globe"
        },
        {
          "title": "TED",
          "url": "https://ted.com",
          "description": "思想分享平台",
          "icon": "fas fa-microphone"
        }
      ]
    }
  ]
};