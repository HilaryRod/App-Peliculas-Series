import 'dotenv/config';
import axios from "axios";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3", 
  params: {api_key: process.env.TMDB_API_KEY},
});

// URL de imágenes
export const posterUrl = (path, size = "w500") => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
}


export const fetchMovies = async () => {
  const {data} = await tmdb.get("/trending/all/week");
  return data.results;
};