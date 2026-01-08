import { useState, useEffect } from 'react';
import { PromptDialog } from './ui/prompt-dialog';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationDialog, setLocationDialog] = useState({
    open: false,
    onConfirm: (location: string) => {}
  });

  const getCityName = async (latitude: number, longitude: number): Promise<string> => {
    // 使用反向地理编码获取城市名称（模拟实现）
    const cities = [
      { name: '北京', lat: 39.9042, lng: 116.4074 },
      { name: '上海', lat: 31.2304, lng: 121.4737 },
      { name: '广州', lat: 23.1291, lng: 113.2644 },
      { name: '深圳', lat: 22.3193, lng: 114.1694 },
      { name: '杭州', lat: 30.2741, lng: 120.1551 },
      { name: '成都', lat: 30.5728, lng: 104.0668 },
      { name: '西安', lat: 34.3416, lng: 108.9398 },
      { name: '南京', lat: 32.0603, lng: 118.7969 }
    ];

    // 找到距离最近的城市
    let closestCity = cities[0];
    let minDistance = Math.sqrt(
      Math.pow(latitude - closestCity.lat, 2) + Math.pow(longitude - closestCity.lng, 2)
    );

    for (const city of cities) {
      const distance = Math.sqrt(
        Math.pow(latitude - city.lat, 2) + Math.pow(longitude - city.lng, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestCity = city;
      }
    }

    return closestCity.name;
  };

  const getWeatherForLocation = async (coords: LocationCoords): Promise<WeatherData> => {
    const cityName = await getCityName(coords.latitude, coords.longitude);
    
    // 基于位置生成更真实的天气数据
    const currentHour = new Date().getHours();
    const isDay = currentHour >= 6 && currentHour <= 18;
    
    const conditions = isDay 
      ? ['晴天', '多云', '少云'] 
      : ['晴天', '多云', '阴天'];
    
    // 根据季节调整温度范围
    const month = new Date().getMonth();
    let tempBase = 20;
    if (month >= 5 && month <= 7) tempBase = 28; // 夏季
    else if (month >= 11 || month <= 1) tempBase = 8; // 冬季
    else if (month >= 2 && month <= 4) tempBase = 18; // 春季
    else tempBase = 22; // 秋季
    
    return {
      temperature: Math.floor(Math.random() * 8) + tempBase - 4,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      location: cityName,
      humidity: Math.floor(Math.random() * 30) + 45, // 45-75%
      windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
      pressure: Math.floor(Math.random() * 20) + 1010 // 1010-1030 hPa
    };
  };

  const getCurrentLocation = (): Promise<LocationCoords> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('浏览器不支持地理定位'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          let message = '无法获取位置信息';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = '用户拒绝了位置权限请求';
              break;
            case error.POSITION_UNAVAILABLE:
              message = '位置信息不可用';
              break;
            case error.TIMEOUT:
              message = '请求位置信息超时';
              break;
          }
          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5分钟缓存
        }
      );
    });
  };

  const getFallbackWeatherData = (): WeatherData => {
    const conditions = ['晴天', '多云', '少云', '阴天'];
    const cities = ['北京', '上海', '广州', '深圳', '杭州'];
    const currentHour = new Date().getHours();
    const month = new Date().getMonth();
    
    let tempBase = 20;
    if (month >= 5 && month <= 7) tempBase = 28;
    else if (month >= 11 || month <= 1) tempBase = 8;
    else if (month >= 2 && month <= 4) tempBase = 18;
    else tempBase = 22;
    
    return {
      temperature: Math.floor(Math.random() * 8) + tempBase - 4,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      location: cities[Math.floor(Math.random() * cities.length)],
      humidity: Math.floor(Math.random() * 30) + 45,
      windSpeed: Math.floor(Math.random() * 15) + 5,
      pressure: Math.floor(Math.random() * 20) + 1010
    };
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setLocationError(null);
        
        // 尝试获取用户位置
        const coords = await getCurrentLocation();
        const weatherData = await getWeatherForLocation(coords);
        setWeather(weatherData);
      } catch (error) {
        console.warn('获取位置失败，使用默认天气数据:', error);
        setLocationError(error instanceof Error ? error.message : '位置获取失败');
        
        // 使用fallback数据
        const fallbackData = getFallbackWeatherData();
        setWeather(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case '晴天':
        return <i className="fas fa-sun text-yellow-400 text-2xl"></i>;
      case '多云':
        return <i className="fas fa-cloud text-gray-300 text-2xl"></i>;
      case '小雨':
        return <i className="fas fa-cloud-rain text-blue-400 text-2xl"></i>;
      case '雪':
        return <i className="fas fa-snowflake text-blue-200 text-2xl"></i>;
      default:
        return <i className="fas fa-cloud text-gray-300 text-2xl"></i>;
    }
  };

  const handleLocationChange = () => {
    setLocationDialog({
      open: true,
      onConfirm: (newLocation) => {
        if (newLocation !== weather?.location) {
          // Update weather data with new location
          setWeather(prev => prev ? { ...prev, location: newLocation } : null);
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="w-20 h-8 bg-white/20 rounded"></div>
            <div className="w-16 h-4 bg-white/20 rounded"></div>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <>
      <div className="glass-card p-4 sm:p-6 animate-slide-up">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-2xl sm:text-3xl font-light text-white mb-1">
              {weather.temperature}°C
            </div>
            <div className="text-white/80 text-sm mb-2">
              {weather.condition}
            </div>
            <button 
              onClick={handleLocationChange}
              className="flex items-center text-white/60 text-xs hover:text-white/80 transition-colors cursor-pointer focus:outline-none focus:text-white/90 mb-2"
              title="点击更换城市"
              aria-label={`当前城市：${weather.location}，点击更换`}
            >
              <i className="fas fa-map-marker-alt mr-1" aria-hidden="true"></i>
              {weather.location}
              {locationError && (
                <i className="fas fa-exclamation-triangle ml-1 text-yellow-400" title={locationError}></i>
              )}
            </button>
            <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
              <div className="flex items-center">
                <i className="fas fa-wind mr-1" aria-hidden="true"></i>
                {weather.windSpeed} km/h
              </div>
              <div className="flex items-center">
                <i className="fas fa-tachometer-alt mr-1" aria-hidden="true"></i>
                {weather.pressure} hPa
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center ml-4">
            <div className="mb-2">
              {getWeatherIcon(weather.condition)}
            </div>
            <div className="text-white/60 text-xs text-center whitespace-nowrap">
              <i className="fas fa-tint mr-1" aria-hidden="true"></i>
              {weather.humidity}%
            </div>
          </div>
        </div>
      </div>

      <PromptDialog
        open={locationDialog.open}
        onOpenChange={(open) => setLocationDialog(prev => ({ ...prev, open }))}
        title="更换城市"
        placeholder="请输入城市名称"
        defaultValue={weather?.location}
        onConfirm={locationDialog.onConfirm}
      />
    </>
  );
};