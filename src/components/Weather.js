import React from 'react';
import { MapPin, Thermometer, Wind, Droplet, Cloud, Eye, Compass, Gauge, Sun, Zap, Tornado, Clock2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Weather({ weather, currentTime }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2 xl:col-span-1"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <MapPin className="w-6 h-6 mr-2 text-blue-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              {weather.location.name}
            </span>
          </h2>
          <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
            {weather.location.region}, {weather.location.country}
          </p>
          
          <p className="text-sm font-medium text-blue-600 flex py-1"><Clock2 className="w-4 h-4 mr-2 text-blue-500" />Localtime: {weather.location.localtime}</p>
        </div>
        <div className="text-right">
          <p className="text-base font-medium">{currentTime.toDateString()}</p>
          <p className="text-base font-medium">{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src={weather.current.condition.icon} alt={weather.current.condition.text} className="w-16 h-16 mr-4" />
          <div>
            <p className="text-4xl font-bold">{weather.current.temp_c}°C</p>
            <p className="text-lg">{weather.current.condition.text}</p>
          </div>
        </div>
        <div className="text-right">
          <WeatherItem icon={<Thermometer className="w-5 h-5 text-blue-500" />} value={`Feels like ${weather.current.feelslike_c}°C`} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <WeatherItem icon={<Droplet className="w-5 h-5 text-blue-500" />} label="Humidity" value={`${weather.current.humidity}%`} />
        <WeatherItem icon={<Cloud className="w-5 h-5 text-gray-500" />} label="Cloud" value={`${weather.current.cloud}%`} />
        <WeatherItem icon={<Eye className="w-5 h-5 text-green-500" />} label="Visibility" value={`${weather.current.vis_km} km`} />
        <WeatherItem icon={<Wind className="w-5 h-5 text-blue-500" />} label="Gust" value={`${weather.current.gust_mph} mph`} />
        <WeatherItem icon={<Sun className="w-5 h-5 text-yellow-500" />} label="UV Index" value={weather.current.uv} />
        <WeatherItem icon={<Compass className="w-5 h-5 text-red-500" />} label="Wind Dir" value={weather.current.wind_dir} />
        <WeatherItem icon={<Gauge className="w-5 h-5 text-purple-500" />} label="Pressure" value={`${weather.current.pressure_mb} mb`} />
        <WeatherItem icon={<Tornado className="w-5 h-5 text-orange-500" />} label="Wind" value={`${weather.current.wind_kph} km/h`} />
        
        <WeatherItem icon={<Zap className="w-5 h-5 text-orange-500" />} label="AQI" value={
          <>
            {weather.current.air_quality['us-epa-index']} {getAirQuality(weather.current.air_quality['us-epa-index'])}
          </>
        } />
      </div>
    </motion.div>
  );
}

function WeatherItem({ icon, label, value }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
      {icon}
      <div className="ml-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </motion.div>
  );
}

const getAirQuality = (aqi) => {
  // Air Quality Index description
  switch (aqi) {
    case 1:
      return <p style={{ color: 'lime' }}>Good</p>;
    case 2:
      return <p style={{ color: 'green' }}>Moderate</p>;
    case 3:
      return <p style={{ color: 'orange' }}>Unhealthy for Sensitive Groups</p>;
    case 4:
      return <p style={{ color: 'red' }}>Unhealthy</p>;
    case 5:
      return <p style={{ color: 'purple' }}>Very Unhealthy</p>;
    case 6:
      return <p style={{ color: 'maroon' }}>Hazardous</p>;
    default:
      return <p style={{ color: 'black' }}>Unknown</p>;
  }
};
