import React, { useState } from 'react';
import { submitSuggestion } from '../api';

const TYPES = ['anime', 'character', 'opening', 'cover'];

export default function Suggestions() {
  const [activeType, setActiveType] = useState('anime');
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitSuggestion(activeType, name, activeType === 'anime' ? undefined : title);
    setSubmitted(true);
    setTitle('');
    setName('');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col">
      <main className="max-w-3xl mx-auto flex-1">
        <h1 className="text-2xl font-extrabold mb-6">Suggestions</h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
          {submitted && (
            <div className="p-3 bg-green-100 text-green-800 rounded mb-4">
              Thank you for your suggestion!
            </div>
          )}

          <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-2">
            {TYPES.map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 rounded-t-lg text-sm font-medium transition ${
                  activeType === type
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {activeType !== 'anime' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anime title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Ex: Naruto"
                  className="w-full h-12 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name of {activeType === 'anime' ? 'anime' : activeType}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={activeType === 'anime' ? 'Ex: Naruto' : 'Ex: Kakashi Hatake'}
                className="w-full h-12 rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
