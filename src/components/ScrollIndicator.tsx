import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  onClick: () => void;
}

export const ScrollIndicator = ({ onClick }: ScrollIndicatorProps) => {
  return (
    <div className="flex justify-center pt-48 pb-4">
      <button
        onClick={onClick}
        className="group relative focus:outline-none focus:ring-2 focus:ring-theme-primary/20 rounded-full"
        aria-label="滚动到导航区域"
      >
        <div className="flex flex-col items-center gap-3">
          {/* 圆形边框容器 */}
          <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/60 transition-all duration-300 group-hover:scale-110">
            <ChevronDown className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-200" />
          </div>
          {/* 底部文字 */}
          <span className="text-white/60 text-xs font-medium group-hover:text-white/80 transition-colors duration-200">
            点击展开
          </span>
        </div>
      </button>
    </div>
  );
};