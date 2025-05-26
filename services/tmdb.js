import axios from 'axios';

const API_KEY = '36397bc9d07dc1347f3653507f3061ac'; // TMDB API anahtarı
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTopRatedMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=tr-TR`);
  const json = await res.json();
  return json.results;
};

// 🔹 Tür listesi çekme
export const getGenres = async () => {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=tr-TR`);
  const json = await res.json();
  return json.genres;
};
// 🔹 Seçilen türe göre filmleri çekme
export const getMoviesByGenre = async (genreId) => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=tr-TR`);
  const json = await res.json();
  return json.results;
};
