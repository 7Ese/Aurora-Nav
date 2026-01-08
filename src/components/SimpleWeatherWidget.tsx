import { useState, useEffect } from 'react';
import { MapPin, Settings } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  icon: string;
}

interface CityData {
  name: string;
  lat: number;
  lon: number;
}

// 从环境变量读取 API 密钥
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '4699d55f9c8ccd0546da8f4248cb3958';

export const SimpleWeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCityInput, setShowCityInput] = useState(false);
  const [customCity, setCustomCity] = useState('');

  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('浏览器不支持定位'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      });
    });
  };

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      console.log('正在获取天气数据，坐标:', lat, lon);
      // 使用OpenWeatherMap API (需要真实API密钥)
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=zh_cn`
      );

      if (!response.ok) {
        throw new Error('天气数据获取失败');
      }

      const data = await response.json();
      console.log('API返回数据:', data);

      setWeather({
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        location: data.name,
        icon: data.weather[0].icon
      });
      console.log('天气数据设置成功');
    } catch (error) {
      // 如果API调用失败，使用模拟数据
      console.warn('天气API调用失败，使用模拟数据', error);
      const mockWeather: WeatherData = {
        temperature: Math.floor(Math.random() * 20) + 15,
        condition: ['晴天', '多云', '阴天'][Math.floor(Math.random() * 3)],
        location: '当前位置',
        icon: '01d'
      };
      setWeather(mockWeather);
    }
  };

  const getYantaiWeather = async (): Promise<WeatherData> => {
    try {
      // 烟台坐标
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=37.4638&lon=121.4478&appid=${WEATHER_API_KEY}&units=metric&lang=zh_cn`
      );

      if (response.ok) {
        const data = await response.json();
        return {
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].description,
          location: '烟台',
          icon: data.weather[0].icon
        };
      }
    } catch (error) {
      console.warn('烟台天气API调用失败');
    }

    // API失败时的烟台模拟数据
    const month = new Date().getMonth();
    let tempBase = 15;
    if (month >= 5 && month <= 7) tempBase = 25; // 夏季
    else if (month >= 11 || month <= 1) tempBase = 2; // 冬季
    else if (month >= 2 && month <= 4) tempBase = 12; // 春季

    return {
      temperature: Math.floor(Math.random() * 8) + tempBase,
      condition: ['晴天', '多云', '海风'][Math.floor(Math.random() * 3)],
      location: '烟台',
      icon: '01d'
    };
  };

  const fetchWeatherByCity = async (cityName: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${WEATHER_API_KEY}&units=metric&lang=zh_cn`
      );

      if (!response.ok) {
        throw new Error('城市天气数据获取失败');
      }

      const data = await response.json();
      setWeather({
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        location: data.name,
        icon: data.weather[0].icon
      });
      setError(null);
    } catch (error) {
      setError('无法获取该城市天气');
      // 如果自定义城市失败，回退到烟台
      const yantaiWeather = await getYantaiWeather();
      setWeather(yantaiWeather);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('晴')) {
      return <i className="fas fa-sun text-yellow-400 text-xl"></i>;
    } else if (condition.includes('云')) {
      return <i className="fas fa-cloud text-gray-300 text-xl"></i>;
    } else if (condition.includes('雨')) {
      return <i className="fas fa-cloud-rain text-blue-400 text-xl"></i>;
    } else {
      return <i className="fas fa-cloud text-gray-300 text-xl"></i>;
    }
  };

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('开始获取天气数据...');

        // 优先尝试获取当前位置
        const position = await getCurrentLocation();
        console.log('获取到位置:', position.coords.latitude, position.coords.longitude);
        await fetchWeather(position.coords.latitude, position.coords.longitude);
      } catch (err) {
        console.warn('获取位置失败，使用烟台默认天气', err);
        setError('定位失败，显示烟台天气');
        // 定位失败时显示烟台天气
        const yantaiWeather = await getYantaiWeather();
        setWeather(yantaiWeather);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  const handleCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customCity.trim()) {
      fetchWeatherByCity(customCity.trim());
      setShowCityInput(false);
      setCustomCity('');
    }
  };

  if (loading) {
    return (
      <div className="text-center animate-pulse">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-16 h-8 bg-white/20 rounded"></div>
          <div className="w-6 h-6 bg-white/20 rounded-full"></div>
        </div>
        <div className="w-12 h-4 bg-white/20 rounded mx-auto mb-1"></div>
        <div className="w-16 h-3 bg-white/20 rounded mx-auto"></div>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="text-center animate-slide-up relative">
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="text-3xl font-light text-white">
          {weather.temperature}°C
        </div>
        <div className="text-xl">
          {getWeatherIcon(weather.condition)}
        </div>
      </div>
      <div className="text-white/80 text-sm mb-1">
        {weather.condition}
      </div>

      <div className="flex items-center justify-center text-white/60 text-xs relative">
        <MapPin className="w-3 h-3 mr-1" />
        <button
          onClick={() => setShowCityInput(!showCityInput)}
          className="hover:text-white transition-colors underline decoration-dotted"
          title="点击切换城市"
        >
          {weather.location}
        </button>
        {error && (
          <i className="fas fa-exclamation-triangle ml-2 text-yellow-400" title={error}></i>
        )}
      </div>

      {/* 城市输入框 */}
      {showCityInput && (
        <div className="absolute top-full left-0 right-0 mt-2 z-10 animate-fade-in flex justify-center">
          <form onSubmit={handleCitySubmit} className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 shadow-lg">
            <input
              type="text"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              placeholder="输入城市名称"
              className="px-2 py-1 text-xs bg-white/20 text-white placeholder-white/60 rounded border-none outline-none w-24"
              autoFocus
            />
            <button
              type="submit"
              className="px-2 py-1 text-xs bg-theme-primary text-white rounded hover:bg-theme-primary-dark transition-colors"
            >
              确定
            </button>
          </form>
        </div>
      )}
    </div>
  );
};