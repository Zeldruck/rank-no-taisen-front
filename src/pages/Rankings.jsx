import React, { useEffect, useState } from 'react';
import RankingTable from '../components/RankingTable';
import { fetchItems } from '../api';

const TYPES = ['all', 'anime', 'character', 'opening', 'cover'];

export default function Rankings() {
  const [items, setItems] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [activeYear, setActiveYear] = useState('all');
  const [years, setYears] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    async function loadItems() {
      const data = await fetchItems();
      setItems(data);

      const uniqueYears = Array.from(new Set(data.map((it) => it.year))).sort((a, b) => b - a);
      setYears(uniqueYears);
    }
    loadItems();
  }, []);

  let filteredItems =
    filterType === 'all' ? items : items.filter((it) => it.type === filterType);

  filteredItems =
    activeYear === 'all'
      ? filteredItems
      : filteredItems.filter((it) => it.year === activeYear);

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredItems = filteredItems.filter(
      (it) =>
        (it.title && it.title.toLowerCase().includes(q)) ||
        (it.sub && it.sub.toLowerCase().includes(q))
    );
  }

  filteredItems = [...filteredItems].sort((a, b) =>
    sortOrder === 'desc' ? b.elo - a.elo : a.elo - b.elo
  );

  const yearTabs = ['all', ...years];

  return (
    <div className="bg-slate-50">
      <main className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Ranking</h1>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full max-w-sm mb-4"
        />

        <div className="flex flex-wrap items-center gap-2 mb-2">
          {TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filterType === type
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}

          <button
            onClick={() =>
              setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
            }
            className="px-4 py-2 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition ml-2"
          >
            ELO {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-2">
          {yearTabs.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition ${
                activeYear === year
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {year === 'all' ? 'All years' : year}
            </button>
          ))}
        </div>

        <RankingTable items={filteredItems} />
      </main>
    </div>
  );
}