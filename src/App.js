import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, Moon, Search } from 'lucide-react';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import Hours from './components/Hours';
import Astronomy from './components/Astronomy';
import Alerts from './components/Alerts';
import Geolocation from './components/Geolocation';
import WindMap from './components/WindMap';
import { motion, AnimatePresence } from 'framer-motion';

const apiKey = process.env.REACT_APP_API_KEY;
const dayLimit = "5";

export default function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [astronomy, setAstronomy] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeatherData = async (query) => {
    setIsLoading(true);
    try {
      const weatherResponse = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=${dayLimit}&aqi=yes&alerts=yes`
      );
      setWeather(weatherResponse.data);

      const astronomyResponse = await axios.get(
        `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${query}`
      );
      setAstronomy(astronomyResponse.data);

      setAlerts(weatherResponse.data.alerts?.alert || []);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Something went wrong. Please try again later.");
      setWeather(null);
      setAstronomy(null);
      setAlerts([]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (location) {
      fetchWeatherData(location);
    } else {
      setError("Please enter a location.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-gray-900">
          <iframe src="/Loader.html" className="w-full h-full border-none" title="Loading"></iframe>
        </div>
      )}

      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Weather
          </h1>
          <h2 className="text-xl text-center flex-grow">
            {(() => {
              const hour = new Date().getHours(); // Added current time here
              if (hour >= 5 && hour < 12) return "Good Morning";
              if (hour >= 12 && hour < 17) return "Good Afternoon";
              if (hour >= 17 && hour < 21) return "Good Evening";
              return "Good Night";
            })()}
          </h2>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
          >
            {isDarkMode ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </header>


      <main className="container mx-auto px-4 py-8 flex-grow">
        <form onSubmit={handleSearch} className="mb-8 flex gap-2">
          <input type="text" placeholder="Enter City" value={location} onChange={(e) => setLocation(e.target.value)} className="flex-grow p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
          <button type="submit" className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
            <Search className="w-6 h-6" />
          </button>
        </form>

        <Geolocation onGeolocation={fetchWeatherData} />

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 mb-4"
          >
            {error}
          </motion.p>
        )}

        <AnimatePresence>
          {weather && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <Weather weather={weather} currentTime={currentTime} />
              <Forecast forecastData={weather.forecast.forecastday} />
              <Hours hourlyData={weather.forecast.forecastday[0].hour} currentHour={currentTime.getHours()} />
              {astronomy && (
                <Astronomy astronomyData={astronomy} locationName={weather.location.name} />
              )}
              {alerts.length > 0 && <Alerts alertsData={alerts} />}
              <div className="grid-cols-1 md:grid-cols-2 gap-6">
                <WindMap location={weather.location} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md mt-8">
        <div className="container mx-auto px-4 py-4 text-center">
          <p>&copy; 2023 WeatherNow. </p>
        </div>
      </footer>
    </div>
  );
}

