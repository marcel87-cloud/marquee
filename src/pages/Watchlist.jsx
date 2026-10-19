import { Typography } from '@mui/material';
import { useWatchlist } from '../WatchlistContext';
import { MovieGrid } from '../components/MovieList';

export default function Watchlist() {
  const { items } = useWatchlist();
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>My Watchlist</Typography>
      {items.length ? (
        <MovieGrid items={items} />
      ) : (
        <Typography color="text.secondary">Your watchlist is empty. Tap the heart on any poster to save it here.</Typography>
      )}
    </>
  );
}
