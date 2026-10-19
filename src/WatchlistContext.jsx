import { createContext, useContext, useEffect, useState } from 'react';

const KEY = 'marquee-watchlist';
const Ctx = createContext();
export const useWatchlist = () => useContext(Ctx);

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  });
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(items)), [items]);

  const same = (a, b) => a.id === b.id && a.type === b.type;
  const has = (item) => items.some((i) => same(i, item));
  const toggle = (item) =>
    setItems((prev) => (prev.some((i) => same(i, item)) ? prev.filter((i) => !same(i, item)) : [item, ...prev]));

  return <Ctx.Provider value={{ items, has, toggle }}>{children}</Ctx.Provider>;
}
