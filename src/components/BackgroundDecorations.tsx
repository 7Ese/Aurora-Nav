export const BackgroundDecorations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 大圆形 */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/5 animate-float-slow"></div>
      
      {/* 小圆形 */}
      <div className="absolute top-3/4 right-1/3 w-16 h-16 rounded-full bg-white/3 animate-float-medium"></div>
      
      {/* 中等圆形 */}
      <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-white/4 animate-float-fast"></div>
      
      {/* 较大圆形 */}
      <div className="absolute bottom-1/4 left-1/3 w-28 h-28 rounded-full bg-white/6 animate-float-slow"></div>
      
      {/* 小圆形 */}
      <div className="absolute top-1/3 left-1/2 w-12 h-12 rounded-full bg-white/7 animate-float-medium"></div>
      
      {/* 中圆形 */}
      <div className="absolute bottom-1/3 right-1/2 w-20 h-20 rounded-full bg-white/3 animate-float-slow"></div>
      
      {/* 超小圆形 */}
      <div className="absolute top-1/2 left-1/5 w-6 h-6 rounded-full bg-white/8 animate-fade-pulse"></div>
      
      {/* 点状装饰 */}
      <div className="absolute bottom-1/2 left-3/4 w-3 h-3 rounded-full bg-white/8 animate-twinkle"></div>
      <div className="absolute top-2/3 right-1/5 w-2 h-2 rounded-full bg-white/6 animate-twinkle-delayed"></div>
    </div>
  );
};