import {tmdb, posterUrl} from "../utils/api.js";

export const getPopularMovies = async (req, res) => {
    try{
        const {data} =await tmdb.get("/movie/popular", {
            params: {language: "es-MX", page: 1},
        });

        const movies = data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
            poster: posterUrl(movie.poster_path)
        }));
        res.json(movies);
    } catch (error) {
        console.error(error.response?.data || error.message); 
        res.status(500).json({error: `Error al obtener películas`});
    }
};