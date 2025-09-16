import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VoteCard from './VoteCard';

export default function VoteArena({ left, right, onVote }) {
  const [winnerId, setWinnerId] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  if (!left || !right)
    return <div className="text-center text-gray-500">Not enough items to vote.</div>;

  const handleVote = (id) => {
    if (isAnimating) return;

    setWinnerId(id);
    setIsAnimating(true);

    setTimeout(() => {
      setWinnerId(null);
      setIsAnimating(false);
      onVote(id).catch(err => console.error(err));
    }, 500);
  };

  return (
    <div className="relative flex flex-col items-center gap-6 w-full">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <motion.div
          animate={{
            scale: winnerId === left.id ? 1.1 : 1,
            boxShadow:
              winnerId === left.id
                ? '0 0 20px rgba(99, 102, 241, 0.7)'
                : '0 0 0px rgba(0,0,0,0)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <VoteCard item={left} onVote={handleVote} disabled={isAnimating} />
        </motion.div>

        <div className="flex md:hidden justify-center items-center text-xl font-bold text-orange-400">
          VS
        </div>

        <motion.div
          animate={{
            scale: winnerId === right.id ? 1.1 : 1,
            boxShadow:
              winnerId === right.id
                ? '0 0 20px rgba(99, 102, 241, 0.7)'
                : '0 0 0px rgba(0,0,0,0)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <VoteCard item={right} onVote={handleVote} disabled={isAnimating} />
        </motion.div>

        <div className="hidden md:flex absolute inset-y-0 left-1/2 transform -translate-x-1/2 items-center justify-center text-4xl font-extrabold text-orange-400 z-10 pointer-events-none">
          VS
        </div>
      </div>
    </div>
  );
}
