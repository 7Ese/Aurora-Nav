import { useState, useEffect, useRef } from 'react';
import { HomePage } from '../components/HomePage';
import { NavigationPage } from '../components/NavigationPage';
import { defaultConfig, NavigationConfig } from '../data/navigationConfig';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Index = () => {
  // Force reset config - remove this after reset
  useEffect(() => {
    const currentVersion = localStorage.getItem('config-version');
    if (currentVersion !== '2.0') {
      localStorage.removeItem('navigation-config');
      localStorage.setItem('config-version', '2.0');
    }
  }, []);

  const [config, setConfig] = useLocalStorage<NavigationConfig>('navigation-config', defaultConfig);
  const [currentPage, setCurrentPage] = useState<'home' | 'navigation'>('home');
  const navigationRef = useRef<HTMLDivElement>(null);

  const scrollToNavigation = () => {
    setCurrentPage('navigation');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const scrollToTop = () => {
    setCurrentPage('home');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleConfigUpdate = (newConfig: NavigationConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="min-h-screen">
      {currentPage === 'home' ? (
        <HomePage onScrollToNavigation={scrollToNavigation} />
      ) : (
        <div ref={navigationRef}>
          <NavigationPage 
            config={config}
            onConfigUpdate={handleConfigUpdate}
            onScrollToTop={scrollToTop}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
