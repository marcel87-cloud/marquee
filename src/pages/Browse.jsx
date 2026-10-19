import { useState } from 'react';
import { Box, Chip, Pagination, Typography, Select, MenuItem } from '@mui/material';
import { list, tmdb } from '../api';
import useFetch from '../useFetch';
import DataView from '../components/DataView';
import { MovieGrid } from '../components/MovieList';

export default function Browse({ type }) {
  const [genre, setGenre] = useState(''); // '' = all genres
  const [sort, setSort] = useState('popularity.desc');
  const [page, setPage] = useState(1);

  const genres = useFetch((s) => tmdb(`/genre/${type}/list`, {}, s), [type]);
  const state = useFetch(
    (s) => list(`/discover/${type}`, { with_genres: genre, sort_by: sort, page, 'vote_count.gte': 50 }, s, type),
    [type, genre, sort, page]
  );

  const pickGenre = (g) => { setGenre(g); setPage(1); };
  const label = type === 'movie' ? 'Movies' : 'TV shows';

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>{label}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        <Chip label="All" color={genre === '' ? 'primary' : 'default'} onClick={() => pickGenre('')} />
        {genres.data?.genres.map((g) => (
          <Chip key={g.id} label={g.name} color={genre === g.id ? 'primary' : 'default'} onClick={() => pickGenre(g.id)} />
        ))}
      </Box>
      <Select size="small" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} sx={{ mb: 2 }} inputProps={{ 'aria-label': 'Sort by' }}>
        <MenuItem value="popularity.desc">Most popular</MenuItem>
        <MenuItem value="vote_average.desc">Highest rated</MenuItem>
        <MenuItem value={type === 'movie' ? 'primary_release_date.desc' : 'first_air_date.desc'}>Newest</MenuItem>
      </Select>
      <DataView state={state} empty="No titles match this filter. Try another genre.">
        {(d) => (
          <>
            <MovieGrid items={d.items} />
            <Pagination sx={{ display: 'flex', justifyContent: 'center', mt: 4 }} count={d.totalPages} page={page}
              onChange={(_, p) => { setPage(p); window.scrollTo({ top: 0 }); }} siblingCount={0} />
          </>
        )}
      </DataView>
    </>
  );
}
