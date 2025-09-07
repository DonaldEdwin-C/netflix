// routes/tmdb.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_KEY = process.env.TMDB_API_KEY;

// Trending movies (weekly)
router.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE}/trending/movie/week`, {
      params: { api_key: TMDB_KEY },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching trending movies');
  }
});

// Movies by genre
router.get('/genre/:genreId/movies', async (req, res) => {
  try {
    const { genreId } = req.params;
    const response = await axios.get(`${TMDB_BASE}/discover/movie`, {
      params: { api_key: TMDB_KEY, with_genres: genreId, sort_by: 'popularity.desc' },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching movies by genre');
  }
});

// TV series by genre
router.get('/genre/:genreId/series', async (req, res) => {
  try {
    const { genreId } = req.params;
    const response = await axios.get(`${TMDB_BASE}/discover/tv`, {
      params: { api_key: TMDB_KEY, with_genres: genreId, sort_by: 'popularity.desc' },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching series by genre');
  }
});

// Genre lists
router.get('/genres', async (req, res) => {
  try {
    const [movieGenres, tvGenres] = await Promise.all([
      axios.get(`${TMDB_BASE}/genre/movie/list`, { params: { api_key: TMDB_KEY } }),
      axios.get(`${TMDB_BASE}/genre/tv/list`, { params: { api_key: TMDB_KEY } }),
    ]);
    res.json({ movies: movieGenres.data.genres, series: tvGenres.data.genres });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching genres');
  }
});

module.exports = router;
