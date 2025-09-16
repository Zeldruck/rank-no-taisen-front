import React from 'react';
import { motion } from 'framer-motion';

export default function VoteCard({ item, onVote, disabled }) {
  if (!item) return null;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative aspect-[10/12]  bg-gray-100 overflow-hidden">
        <img
          src={item.image || 'https://via.placeholder.com/300x420'}
          alt={item.title}
          className="w-full h-full object-cover object-top"
        />
        <span className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{item.title}</h3>
        {item.sub && <p className="text-sm text-gray-500 line-clamp-1">{item.sub}</p>}
        <p className="text-xs text-gray-400">{item.year}</p>

        <div className="mt-auto flex justify-between items-center pt-3">
          <div className="text-sm font-mono text-indigo-600">ELO: {item.elo}</div>

          <motion.button
            onClick={() => onVote(item.id)}
            whileHover={{ scale: 1.05, boxShadow: '0 0 12px rgba(99, 102, 241, 0.7)' }}
            whileTap={{ scale: 0.95 }}
            className="relative px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold shadow overflow-hidden transition-all duration-300"
            disabled={disabled}
          >
            {disabled ? 'Voting...' : 'Vote'}
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-0 pointer-events-none animate-shine"></span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}