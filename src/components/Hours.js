import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hours({ hourlyData, currentHour }) {
  const nextHours = hourlyData.slice(currentHour, currentHour + 6);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2 xl:col-span-1"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Clock className="w-6 h-6 mr-2 text-blue-500" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Hourly Forecast
        </span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {nextHours.map((hour, index) => (
          <motion.div
            key={hour.time}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-center"
          >
            <p className="font-medium">{new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric' })}</p>
            <img src={hour.condition.icon} alt={hour.condition.text} className="w-10 h-10 mx-auto my-2" />
            <p className="">{hour.condition.text}</p>
            <p className="text-lg font-bold">{hour.temp_c}°C</p>
            <p className="text-xs text-blue-500">{hour.chance_of_rain}% rain</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

