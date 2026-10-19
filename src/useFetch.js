import { useEffect, useState } from 'react';

// Runs loader(signal) whenever deps change; returns { data, loading, error }.
export default function useFetch(loader, deps) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  useEffect(() => {
    const ctrl = new AbortController();
    setState({ data: null, loading: true, error: null });
    loader(ctrl.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((e) => e.name !== 'AbortError' && setState({ data: null, loading: false, error: e.message }));
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}
