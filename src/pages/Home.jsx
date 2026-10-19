import { Box, Typography } from '@mui/material';
import { list } from '../api';
import useFetch from '../useFetch';
import DataView from '../components/DataView';
import { MovieRow } from '../components/MovieList';

function Section({ title, path, params, type }) {
  const state = useFetch((s) => list(path, params, s, type), [path, JSON.stringify(params)]);
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
      <DataView state={state}>{(d) => <MovieRow items={d.items} />}</DataView>
    </Box>
  );
}

export default function Home() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>What are you watching tonight?</Typography>
      <Section title="Trending this week" path="/trending/all/week" />
      <Section title="Popular movies" path="/movie/popular" type="movie" />
      <Section title="Action movies" path="/discover/movie" params={{ with_genres: 28, sort_by: 'popularity.desc' }} type="movie" />
      <Section title="Popular TV shows" path="/tv/popular" type="tv" />
    </>
  );
}
