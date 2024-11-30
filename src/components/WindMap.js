import React from 'react';
import { Wind } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WindMap({ location }) {
  const mapUrl = `https://embed.windy.com/embed2.html?lat=${location.lat}&lon=${location.lon}&detailLat=${location.lat}&detailLon=${location.lon}&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="col-span-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Wind className="w-6 h-6 mr-2 text-blue-500" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
          Wind Map
        </span>
      </h2>
      <div className="w-full" style={{ height: '240px' }}>
        <iframe
          src={mapUrl}
          frameBorder="0"
          title="Windy Map"
          className="w-full h-full rounded-lg"
          style={{ pointerEvents: 'none' }}   //to prohibit interaction
        ></iframe>
      </div>
    </motion.div>
  );
}
