import React from 'react';
import { Sunrise, Sunset, MoonStar, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Astronomy({ astronomyData, locationName }) {
  const { astro } = astronomyData.astronomy;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2 xl:col-span-1"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Moon className="w-6 h-6 mr-2 text-blue-500" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          Astronomy for {locationName}
        </span>
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <AstronomyItem icon={<Sunrise className="w-5 h-5 text-orange-500" />} label="Sunrise" value={astro.sunrise} />
        <AstronomyItem icon={<Sunset className="w-5 h-5 text-indigo-500" />} label="Sunset" value={astro.sunset} />
        <AstronomyItem icon={<MoonStar className="w-5 h-5 text-gray-500" />} label="Moonrise" value={astro.moonrise} />
        <AstronomyItem icon={<Moon className="w-5 h-5 text-yellow-500" />} label="Moonset" value={astro.moonset} />
        <AstronomyItem icon={<Moon className="w-5 h-5 text-purple-500" />} label="Moon Phase" value={astro.moon_phase} colSpan={2} />
      </div>
    </motion.div>
  );
}

function AstronomyItem({ icon, label, value, colSpan = 1 }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg ${colSpan === 2 ? 'col-span-2' : ''}`}
    >
      {icon}
      <div className="ml-2">
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </motion.div>
  );
}

