import React, { useEffect, useState, useCallback, useRef } from 'react';
import VoteArena from '../components/VoteArena';
import RankingSidebar from '../components/RankingSidebar';
import { fetchMatches, fetchItems, postVote } from '../api';

export default function Home() {
  const [items, setItems] = useState([]);
  const [matches, setMatches] = useState([]);
  const [currentPair, setCurrentPair] = useState([null, null]);
  const [loading, setLoading] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(false); 

  useEffect(() => { 
    fetchItems()
      .then(data => setItems(data))
      .finally(() => setLoading(false));
  }, []);

  const loadMatches = useCallback(async () => {
    if (loadingMatches) return;
    setLoadingMatches(true);

    try {
      const data = await fetchMatches();
      setMatches(prev => [...prev, ...data]);

      setCurrentPair(prev => prev[0] && prev[1] ? prev : data[0] || [null, null]);
    } catch (err) {
      console.error('Erreur fetchMatches:', err);
    } finally {
      setLoadingMatches(false);
    }
  }, [loadingMatches]);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  const handleVote = async (winnerId) => {
    if (!currentPair[0] || !currentPair[1]) return;

    const votedPair = [...currentPair];
    setCurrentPair([null, null]);

    setMatches(prev => {
      const newMatches = prev.slice(1);
      if (newMatches[0]) setCurrentPair(newMatches[0]);
      if (newMatches.length <= 3) loadMatches();
      return newMatches;
    });

    try {
      await postVote(votedPair[0].id, votedPair[1].id, winnerId);
    } catch (err) {
      console.error('Erreur postVote:', err);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;
  if (!currentPair[0] || !currentPair[1])
    return <div className="p-6 text-center text-gray-500">No matches available.</div>;

  return (
    <div className="bg-slate-50 p-6 flex flex-col flex-1">
      <main className="w-full max-w-7xl mx-auto flex flex-col gap-8 flex-1">

        <section>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 h-full">
            <h2 className="text-xl font-bold">Vote Arena</h2>
            <VoteArena
              left={currentPair[0]}
              right={currentPair[1]}
              onVote={handleVote}
            />
          </div>
        </section>

        <section>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Top Rankings</h2>
            <div className="flex flex-col flex-wrap gap-4">
              <RankingSidebar
                items={[...items].sort((a, b) => b.elo - a.elo).slice(0, 12)}
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}