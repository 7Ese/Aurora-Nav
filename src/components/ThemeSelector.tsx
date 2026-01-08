import { Palette } from 'lucide-react';
import { useTheme, Theme } from '../hooks/useTheme';

const themes: { name: string; value: Theme; color: string; description: string }[] = [
  { name: '深海', value: 'deepsea', color: '#0891b2', description: '神秘海洋风格' },
  { name: '玫瑰金', value: 'rosegold', color: '#f472b6', description: '优雅奢华风格' },
  { name: '梦幻紫', value: 'purple', color: '#a855f7', description: '优雅神秘风格' },
  { name: '日落', value: 'sunset', color: '#f97316', description: '温暖夕阳风格' },
  { name: '自然绿', value: 'green', color: '#10b981', description: '清新自然风格' }
];

export const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-5 h-5 text-white" />
        <h3 className="text-white font-medium">主题选择</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`
              p-3 rounded-lg border transition-all duration-300 text-left
              ${theme === themeOption.value 
                ? 'bg-white/20 border-white/40 scale-105' 
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: themeOption.color }}
              />
              <div>
                <div className="text-white text-sm font-medium">
                  {themeOption.name}
                </div>
                <div className="text-white/60 text-xs">
                  {themeOption.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};