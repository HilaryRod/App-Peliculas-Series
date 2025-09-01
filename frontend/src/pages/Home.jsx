import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import "../styles/Home.css";


function Home({ token }) {
  const [movies, setMovies]=useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/movies/popular"); // backend
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="page-container">
      <h2>Películas Populares</h2>
      <div className="movies-grid">
        {movies.map((m) => (
          <div key={m.id} onClick={() => setSelectedMovie(m)}>
          <MovieCard movie={m} />
      </div>
        ))}
    </div>
          {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          token={token}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      </div>
  );
}

export default Home;
