import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Alerts({ alertsData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">
          Weather Alerts
        </span>
      </h2>
      <div className="space-y-4">
        {alertsData.map((alert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-red-100 dark:bg-red-900 p-4 rounded-md"
          >
            <h3 className="font-bold mb-2 text-red-700 dark:text-red-300">{alert.event}</h3>
            <p className="text-red-600 dark:text-red-200">{alert.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

