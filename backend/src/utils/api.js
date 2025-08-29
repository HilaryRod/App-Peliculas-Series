import axios from "axios";

/*
  Ejemplo de función para obtener películas de la API externa.
  Esta función solo sirve como demostración de cómo se puede
  integrar la API usando la API_KEY y axios. La lógica final
  se desarrollará y ajustará según las necesidades del proyecto.
*/

export const fetchMovies = async () => {
  const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}`);
  return res.data.results;
};
