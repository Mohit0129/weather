import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Forecast({ forecastData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Calendar className="w-6 h-6 mr-2 text-blue-500" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          5-Day Forecast
        </span>
      </h2>
      <div className="space-y-4">
        {forecastData.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
          >
            {/* <span>{day.date}</span> */}
            <span className="font-medium">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
            <img src={day.day.condition.icon} alt={day.day.condition.text} className="w-10 h-10" />
            {/* <span>{day.day.condition.text}</span> */}
            <span className='text-blue-500 text-xs'>{day.day.daily_chance_of_rain}%</span>
            <span className="text-lg font-bold">{day.day.mintemp_c}°C / {day.day.maxtemp_c}°C </span>
            {/* <span className="text-lg font-bold">{day.day.avgtemp_c}°C</span> */}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
