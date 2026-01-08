import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  pauseTime?: number;
  deletingSpeed?: number;
}

export const TypewriterEffect = ({ 
  texts, 
  className = "",
  typingSpeed = 100,
  pauseTime = 2000,
  deletingSpeed = 50
}: TypewriterEffectProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const targetText = texts[currentTextIndex];

    const timeout = setTimeout(() => {
      if (isTyping) {
        // 正在打字
        if (currentText.length < targetText.length) {
          setCurrentText(targetText.slice(0, currentText.length + 1));
        } else {
          // 打字完成，准备删除
          setIsTyping(false);
          setTimeout(() => {
            setIsDeleting(true);
          }, pauseTime);
        }
      } else if (isDeleting) {
        // 正在删除
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // 删除完成，切换到下一个文本
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setIsTyping(true);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isTyping, texts, typingSpeed, pauseTime, deletingSpeed]);

  return (
    <span className={`${className} relative`}>
      {currentText}
      <span 
        className="inline-block w-0.5 h-5 bg-current ml-1"
        style={{ 
          animation: 'blink 1.2s infinite',
        }}
      />
    </span>
  );
};