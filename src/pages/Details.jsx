import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Chip, CircularProgress, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import PlayCircleIcon from '@mui/icons-material/PlayCircleOutline';
import { tmdb, img, year, normalize } from '../api';
import useFetch from '../useFetch';
import { useWatchlist } from '../WatchlistContext';

export default function Details() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { has, toggle } = useWatchlist();
  const valid = type === 'movie' || type === 'tv';
  const state = useFetch(
    (s) => (valid ? tmdb(`/${type}/${id}`, { append_to_response: 'videos' }, s) : Promise.reject(new Error('Unknown content type'))),
    [type, id]
  );
  const { data: d, loading, error } = state;

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress aria-label="Loading" /></Box>;
  if (error) return <Alert severity="error">{error}. This title could not be loaded.</Alert>;

  const item = normalize({ ...d, media_type: type }, type);
  const saved = has(item);
  const poster = img(d.poster_path, 'w500');
  const trailer = d.videos?.results?.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
  const runtime = d.runtime || d.episode_run_time?.[0];

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
        <Box sx={{ flex: 'none', width: { xs: '60%', sm: 280 }, alignSelf: { xs: 'center', sm: 'flex-start' } }}>
          {poster ? (
            <Box component="img" src={poster} alt={`${item.title} poster`} sx={{ width: '100%', borderRadius: 2, display: 'block' }} />
          ) : (
            <Box sx={{ aspectRatio: '2/3', display: 'grid', placeItems: 'center', bgcolor: 'action.hover', borderRadius: 2 }}>
              <Typography color="text.secondary">No poster available</Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h4">{item.title}</Typography>
          {d.tagline && <Typography color="text.secondary" sx={{ fontStyle: 'italic', mt: 0.5 }}>{d.tagline}</Typography>}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, my: 2 }}>
            <Chip icon={<StarIcon />} label={d.vote_average ? `${d.vote_average.toFixed(1)} / 10` : 'Not rated'} sx={{ '& .MuiChip-icon': { color: 'primary.main' } }} />
            <Typography variant="body2">{year(item.date)}{item.date ? ` (${item.date})` : ''}</Typography>
            {runtime ? <Typography variant="body2">{runtime} min</Typography> : null}
            {type === 'tv' && d.number_of_seasons ? <Typography variant="body2">{d.number_of_seasons} seasons</Typography> : null}
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {d.genres?.length ? d.genres.map((g) => <Chip key={g.id} label={g.name} variant="outlined" size="small" />) : <Typography variant="body2" color="text.secondary">Genre not listed</Typography>}
          </Box>
          <Typography variant="h6" sx={{ mb: 0.5 }}>Overview</Typography>
          <Typography sx={{ maxWidth: '70ch', lineHeight: 1.7 }}>{d.overview || 'No overview is available for this title.'}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 3 }}>
            <Button variant={saved ? 'outlined' : 'contained'} onClick={() => toggle(item)}>
              {saved ? 'Remove from watchlist' : 'Add to watchlist'}
            </Button>
            {trailer && (
              <Button variant="text" startIcon={<PlayCircleIcon />} href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener noreferrer">
                Watch trailer
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
