const BASE_URL = import.meta.env.VITE_BACK_API_URL || 'http://localhost:4000/api';

export async function fetchItems(type, year) {
  const params = new URLSearchParams();
  if (type) params.append('type', type);
  if (year) params.append('year', year);

  const res = await fetch(`${BASE_URL}/items?${params.toString()}`);
  return res.json();
}

export async function postVote(itemA_id, itemB_id, winner_id) {
  const res = await fetch(`${BASE_URL}/votes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemA_id, itemB_id, winner_id })
  });
  return res.json();
}

export async function submitSuggestion(type, name, title) {
  const res = await fetch(`${BASE_URL}/suggestions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, name, title })
  });
  return res.json();
}

export async function fetchMatches(count = 10, type = null) {
  const res = await fetch(`${BASE_URL}/matches?count=${count}${type == null ? '' : '&type='+type}`);
  return res.json();
}