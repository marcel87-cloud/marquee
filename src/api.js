// TMDB v3 client. The key comes from .env (VITE_TMDB_API_KEY), never hardcoded.
const KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE = 'https://api.themoviedb.org/3';

export async function tmdb(path, params = {}, signal) {
  if (!KEY) throw new Error('Missing VITE_TMDB_API_KEY (see .env.example)');
  const qs = new URLSearchParams({ api_key: KEY, language: 'en-US', ...params });
  const res = await fetch(`${BASE}${path}?${qs}`, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export const img = (p, size = 'w342') => (p ? `https://image.tmdb.org/t/p/${size}${p}` : null);
export const year = (d) => (d ? d.slice(0, 4) : 'Year unknown');

// Movies and TV shows have different field names; map both to one shape.
export function normalize(r, type) {
  return {
    id: r.id,
    type: r.media_type || type,
    title: r.title || r.name || 'Untitled',
    poster: r.poster_path,
    date: r.release_date || r.first_air_date,
    rating: r.vote_average,
    overview: r.overview,
  };
}

export async function list(path, params, signal, type) {
  const d = await tmdb(path, params, signal);
  return {
    items: d.results.map((r) => normalize(r, type)).filter((i) => i.type === 'movie' || i.type === 'tv'),
    totalPages: Math.min(d.total_pages || 1, 500),
  };
}
