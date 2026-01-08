import { TimeDisplay } from './TimeDisplay';
import { SimpleWeatherWidget } from './SimpleWeatherWidget';
import { SearchEngine } from './SearchEngine';
import { TopRightThemeSelector } from './TopRightThemeSelector';
import { ScrollIndicator } from './ScrollIndicator';
import { BackgroundDecorations } from './BackgroundDecorations';

interface HomePageProps {
  onScrollToNavigation: () => void;
}

export const HomePage = ({ onScrollToNavigation }: HomePageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      {/* Background Decorations */}
      <BackgroundDecorations />
      
      {/* Theme Selector - Top Right */}
      <TopRightThemeSelector />
      
      {/* Main Content Container */}
      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Time and Weather Section */}
        <div className="flex flex-col items-center mb-12 gap-6">
          <div className="w-full">
            <TimeDisplay />
          </div>
          <div className="w-full max-w-xs">
            <SimpleWeatherWidget />
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-16">
          <SearchEngine />
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator onClick={onScrollToNavigation} />
      </div>
    </div>
  );
};