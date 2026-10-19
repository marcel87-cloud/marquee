import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { list } from '../api';
import useFetch from '../useFetch';
import DataView from '../components/DataView';
import { MovieGrid } from '../components/MovieList';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const state = useFetch(
    (s) => (q ? list('/search/multi', { query: q, include_adult: false }, s) : Promise.resolve({ items: [] })),
    [q]
  );
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>{q ? `Results for “${q}”` : 'Search'}</Typography>
      <DataView state={state} empty={q ? `No matches for “${q}”. Check the spelling or try a shorter title.` : 'Type a title in the search box to begin.'}>
        {(d) => <MovieGrid items={d.items} />}
      </DataView>
    </>
  );
}
