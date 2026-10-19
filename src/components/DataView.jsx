import { Alert, Box, CircularProgress, Typography } from '@mui/material';

// Shows loading, error and empty states; renders children(data) otherwise.
export default function DataView({ state, empty = 'Nothing to show yet.', children }) {
  const { data, loading, error } = state;
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress aria-label="Loading" /></Box>;
  if (error) return <Alert severity="error">{error}. Check your connection and API key, then reload the page.</Alert>;
  if (!data?.items?.length) return <Typography color="text.secondary" sx={{ py: 4 }}>{empty}</Typography>;
  return children(data);
}
