import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, TextField, InputAdornment, Drawer, List,
  ListItemButton, ListItemIcon, ListItemText, Box, useMediaQuery, useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const W = 220;
const NAV = [
  { label: 'Home', to: '/', icon: <HomeIcon /> },
  { label: 'Movies', to: '/movies', icon: <MovieIcon /> },
  { label: 'TV Shows', to: '/tv', icon: <TvIcon /> },
  { label: 'My Watchlist', to: '/watchlist', icon: <BookmarkIcon /> },
];

export default function Layout() {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  const menu = (
    <Box sx={{ pt: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar />
      <List component="nav" aria-label="Main navigation">
        {NAV.map((n) => (
          <ListItemButton
            key={n.to}
            component={Link}
            to={n.to}
            selected={n.to === '/' ? pathname === '/' : pathname.startsWith(n.to)}
            onClick={() => setOpen(false)}
            sx={{ mx: 1, borderRadius: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{n.icon}</ListItemIcon>
            <ListItemText primary={n.label} />
          </ListItemButton>
        ))}
      </List>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto', p: 2 }}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" color="default" elevation={0} sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: 'background.paper' }}>
        <Toolbar sx={{ gap: 1.5 }}>
          {!desktop && (
            <IconButton edge="start" aria-label="Open menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component={Link} to="/" sx={{ color: 'primary.main', fontWeight: 800, textDecoration: 'none', letterSpacing: 1 }}>
            MARQUEE
          </Typography>
          <Box component="form" onSubmit={submit} sx={{ flexGrow: 1, maxWidth: 480, ml: { md: 4 } }} role="search">
            <TextField
              fullWidth size="small" placeholder="Search movies and TV shows"
              value={q} onChange={(e) => setQ(e.target.value)}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={desktop ? 'permanent' : 'temporary'}
        open={desktop || open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ width: desktop ? W : 0, flexShrink: 0, '& .MuiDrawer-paper': { width: W, boxSizing: 'border-box' } }}
      >
        {menu}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, p: { xs: 2, md: 3 } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
