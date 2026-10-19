# Marquee: Movie Discovery Web App

A responsive movie and TV discovery site built with React (Vite), Material UI and React Router. All data comes live from the [TMDB API](https://www.themoviedb.org/documentation/api).

## Features
- Dark-themed homepage with Trending, Popular Movies, Action Movies and Popular TV Shows rows
- Sidebar (drawer on mobile) with Home, Movies, TV Shows, My Watchlist (React Router)
- Title search from the top bar, with loading, empty and error states
- Movies / TV Shows pages with genre filter, sorting and pagination
- Details page: poster, overview, release date, rating, genres, runtime, trailer link
- Watchlist saved in `localStorage` (persists after refresh)
- Handles missing posters, overviews, dates and ratings

## Tech
React 18 (JSX), Vite, Material UI, React Router 6, Fetch API, TMDB API.

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env` and set `VITE_TMDB_API_KEY` to your free TMDB **v3 API key**.
3. `npm run dev` and open the printed URL.

`npm run build` creates a production build in `dist/`.

## Deploy (Vercel / Netlify)
Add `VITE_TMDB_API_KEY` as an environment variable in the host's settings. `vercel.json` and `public/_redirects` enable client-side routing.

## Structure
```
src/
  api.js               TMDB client + data normalising
  useFetch.js          data-loading hook (useState + useEffect + abort)
  WatchlistContext.jsx watchlist state + localStorage
  components/          Layout, MovieCard, MovieList (grid/row), DataView
  pages/               Home, Browse, Search, Details, Watchlist
```

## Note on the API key
The TMDB v3 key is a free, browser-oriented key and is read from `.env`, which is git-ignored. Never commit `.env`.

## Attribution
This product uses the TMDB API but is not endorsed or certified by TMDB. Movie data and images are provided by TMDB.
