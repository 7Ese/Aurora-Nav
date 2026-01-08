import { useState, useEffect } from 'react';

export const TimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getGreeting = (date: Date) => {
    const hour = date.getHours();
    
    if (hour >= 5 && hour < 11) {
      return "早安，美好的一天开始了";
    } else if (hour >= 11 && hour < 14) {
      return "午安，希望你用餐愉快";
    } else if (hour >= 14 && hour < 18) {
      return "下午好，继续加油吧";
    } else if (hour >= 18 && hour < 22) {
      return "晚上好，享受悠闲时光";
    } else {
      return "夜深了，记得早点休息";
    }
  };

  return (
    <div className="text-center mb-6 sm:mb-8 animate-fade-in">
      <div className="text-base sm:text-lg md:text-xl text-white/60 mb-2">
        {formatDate(time)}
      </div>
      <div className="text-4xl sm:text-6xl md:text-8xl font-light text-white mb-4 font-mono">
        {formatTime(time)}
      </div>
      <div className="text-lg sm:text-xl md:text-2xl text-white/70 font-light italic animate-pulse">
        {getGreeting(time)}
      </div>
    </div>
  );
};