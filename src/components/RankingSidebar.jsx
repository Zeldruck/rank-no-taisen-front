import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RankingSidebar({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <AnimatePresence>
        {items.map((item, index) => {
          const isTop3 = index <= 2;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={item.image || 'https://via.placeholder.com/300x180'}
                  alt={item.title}
                  className="w-full h-60 object-cover object-[0%_40%]"
                />
                <motion.span
                  className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold ${
                    index === 0
                      ? 'bg-yellow-400 text-white'
                      : index === 1
                      ? 'bg-gray-400 text-white'
                      : index === 2
                      ? 'bg-orange-400 text-white'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}
                  animate={isTop3 ? { scale: [1, 1.2, 1] } : {}}
                  transition={isTop3 ? { repeat: Infinity, duration: 1.2 } : {}}
                >
                  #{index + 1}
                </motion.span>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)} • {item.year}
                </p>

                <div className="mt-auto text-right font-mono font-semibold text-indigo-600 text-lg">
                  ELO: {item.elo}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
