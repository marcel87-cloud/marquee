import { Card, CardActionArea, Box, Typography, IconButton, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { img, year } from '../api';
import { useWatchlist } from '../WatchlistContext';

const overlay = { position: 'absolute', bgcolor: 'rgba(16,21,28,.85)' };

export default function MovieCard({ item }) {
  const { has, toggle } = useWatchlist();
  const saved = has(item);
  const src = img(item.poster);
  return (
    <Card sx={{ position: 'relative', height: '100%', transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 } }}>
      <CardActionArea component={Link} to={`/${item.type}/${item.id}`} sx={{ height: '100%' }}>
        {src ? (
          <Box component="img" src={src} alt={`${item.title} poster`} loading="lazy" sx={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }} />
        ) : (
          <Box sx={{ aspectRatio: '2/3', display: 'grid', placeItems: 'center', p: 2, textAlign: 'center', bgcolor: 'action.hover' }}>
            <Typography variant="body2" color="text.secondary">No poster available</Typography>
          </Box>
        )}
        <Box sx={{ p: 1.25 }}>
          <Typography variant="subtitle2" noWrap title={item.title}>{item.title}</Typography>
          <Typography variant="caption" color="text.secondary">
            {year(item.date)}, {item.type === 'tv' ? 'TV show' : 'Movie'}
          </Typography>
        </Box>
      </CardActionArea>
      <Chip size="small" icon={<StarIcon />} label={item.rating ? item.rating.toFixed(1) : 'N/A'}
        sx={{ ...overlay, top: 8, left: 8, '& .MuiChip-icon': { color: 'primary.main' } }} />
      <IconButton size="small" onClick={() => toggle(item)} aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
        sx={{ ...overlay, top: 6, right: 6, '&:hover': { bgcolor: 'background.paper' } }}>
        {saved ? <FavoriteIcon color="primary" fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
      </IconButton>
    </Card>
  );
}
