import { useState } from 'react';
import { Search, Globe, ArrowRight, ChevronDown, Bot } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type SearchMode = 'search' | 'ai';

interface SearchEngine {
  name: string;
  url: string;
  placeholder: string;
  icon: string;
}

interface AIEngine {
  name: string;
  url: string;
  placeholder: string;
  icon: string;
}

const aiEngines: AIEngine[] = [
  {
    name: 'ChatGPT',
    url: 'https://chatgpt.com/?model=gpt-4&q=',
    placeholder: '向 ChatGPT 提问',
    icon: 'fas fa-robot'
  },
  {
    name: 'Grok',
    url: 'https://grok.com/',
    placeholder: '向 Grok 提问',
    icon: 'fas fa-bolt'
  },
  {
    name: 'Deepseek',
    url: 'https://chat.deepseek.com/',
    placeholder: '向 Deepseek 提问',
    icon: 'fas fa-brain'
  },
  {
    name: '豆包',
    url: 'https://www.doubao.com/chat/',
    placeholder: '向豆包提问',
    icon: 'fas fa-comment-dots'
  }
];

const searchEngines: SearchEngine[] = [
  {
    name: '百度',
    url: 'https://www.baidu.com/s?wd=',
    placeholder: '百度一下，你就知道',
    icon: 'fas fa-search'
  },
  {
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    placeholder: 'Search Google',
    icon: 'fab fa-google'
  },
  {
    name: '必应',
    url: 'https://www.bing.com/search?q=',
    placeholder: '必应搜索',
    icon: 'fab fa-microsoft'
  }
];

export const SearchEngine = () => {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('search');
  const [selectedSearchEngine, setSelectedSearchEngine] = useState(0);
  const [selectedAIEngine, setSelectedAIEngine] = useState(0); // 默认ChatGPT

  const currentEngines = searchMode === 'search' ? searchEngines : aiEngines;
  const selectedEngineIndex = searchMode === 'search' ? selectedSearchEngine : selectedAIEngine;
  const setSelectedEngineIndex = searchMode === 'search' ? setSelectedSearchEngine : setSelectedAIEngine;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const engine = currentEngines[selectedEngineIndex];
      let url = engine.url;
      
      // 对于AI引擎，使用不同的URL构建方式
      if (searchMode === 'ai') {
        const encodedQuery = encodeURIComponent(query.trim());
        switch (engine.name) {
          case 'ChatGPT':
            url = `https://chatgpt.com/?model=gpt-4&q=${encodedQuery}`;
            break;
          case 'Grok':
            url = `https://grok.com/?q=${encodedQuery}`;
            break;
          case 'Deepseek':
            url = `https://chat.deepseek.com/`;
            break;
          case '豆包':
            url = `https://www.doubao.com/chat/`;
            break;
          default:
            url = engine.url + encodedQuery;
        }
      } else {
        url = engine.url + encodeURIComponent(query.trim());
      }
      
      window.open(url, '_blank');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      setSelectedEngineIndex((prev: number) => (prev + 1) % currentEngines.length);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up relative">
      {/* 模式切换按钮 */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-white/10 rounded-lg p-1 glass-card backdrop-blur-sm">
          <button
            onClick={() => setSearchMode('search')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
              searchMode === 'search'
                ? 'bg-theme-primary text-white shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Search className="w-4 h-4" />
            搜索
          </button>
          <button
            onClick={() => setSearchMode('ai')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
              searchMode === 'ai'
                ? 'bg-theme-primary text-white shadow-md'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Bot className="w-4 h-4" />
            AI
          </button>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <div className="glass-card p-2 flex items-center gap-3">
          {/* Search Engine Selector */}
          <Select 
            value={selectedEngineIndex.toString()} 
            onValueChange={(value) => setSelectedEngineIndex(parseInt(value))}
          >
            <SelectTrigger className="w-auto min-w-[120px] bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-all duration-200 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <i className={`${currentEngines[selectedEngineIndex].icon} text-sm text-theme-primary`}></i>
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-background/95 backdrop-blur-xl border-white/20 shadow-glass">
              {currentEngines.map((engine, index) => (
                <SelectItem 
                  key={index} 
                  value={index.toString()}
                  className="text-foreground hover:bg-theme-primary/10 focus:bg-theme-primary/10 cursor-pointer"
                >
                  {engine.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={currentEngines[selectedEngineIndex].placeholder}
              className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder-white/60 text-lg focus:outline-none"
              aria-label={searchMode === 'search' ? '搜索输入框' : 'AI问答输入框'}
              autoComplete="off"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="btn-primary flex items-center gap-2 px-4 sm:px-6 py-3"
            aria-label={searchMode === 'search' ? '开始搜索' : '开始询问'}
          >
            <span className="hidden sm:inline">{searchMode === 'search' ? '搜索' : '询问'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Search Engine Hints */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4 text-white/60 text-xs sm:text-sm">
        <span>Tab 切换引擎</span>
        <span className="hidden sm:inline">•</span>
        <span>Enter {searchMode === 'search' ? '搜索' : '询问'}</span>
      </div>
    </div>
  );
};