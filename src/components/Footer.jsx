import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-white/70 backdrop-blur-md shadow-inner flex flex-col md:flex-row justify-center items-center gap-2 text-sm text-gray-500">
      <span>ランクの対戦</span>
      <span className="hidden md:inline">•</span>
      <a
        href="https://github.com/Zeldruck/rank-no-taisen"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-indigo-600 transition-colors"
      >
        GitHub
      </a>
      <span className="hidden md:inline">•</span>
      <a
        href="https://github.com/Zeldruck"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-indigo-600 transition-colors"
      >
        @Zeldruck
      </a>
    </footer>
  );
}
