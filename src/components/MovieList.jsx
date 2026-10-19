import { Box } from '@mui/material';
import MovieCard from './MovieCard';

// Responsive poster grid (wraps)
export function MovieGrid({ items }) {
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(auto-fill, minmax(160px, 1fr))' } }}>
      {items.map((i) => <MovieCard key={`${i.type}-${i.id}`} item={i} />)}
    </Box>
  );
}

// Horizontally scrolling row (scrolls inside itself, never the page)
export function MovieRow({ items }) {
  return (
    <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1.5 }}>
      {items.map((i) => (
        <Box key={`${i.type}-${i.id}`} sx={{ flex: 'none', width: { xs: 130, sm: 160 } }}>
          <MovieCard item={i} />
        </Box>
      ))}
    </Box>
  );
}
