import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import "../styles/Home.css";

function Home({ token }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [lists, setLists] = useState([]); // listas del usuario

  // Cargar películas populares
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/movies/popular");
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  // Cargar listas del usuario
  useEffect(() => {
    if (token) {
      fetch("http://localhost:3000/api/auth/lists", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setLists(data))
        .catch((err) => console.error("Error al obtener listas:", err));
    }
  }, [token]);

  // Agregar película a lista
  const handleAddToList = async (listId, movie) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/auth/lists/${listId}/movies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ movie }),
        }
      );

      if (!res.ok) throw new Error("Error al agregar película");

      const updatedList = await res.json();

      // actualizar estado local
      setLists(lists.map((l) => (l.id === updatedList.id ? updatedList : l)));
    } catch (err) {
      console.error("Error al agregar película:", err);
    }
  };

  return (
    <div className="page-container">
      <h2>Películas Populares</h2>
      <div className="movies-grid">
        {movies.map((m) => (
          <div key={m.id} onClick={() => setSelectedMovie(m)}>
            <MovieCard
              movie={m}
              token={token}
              lists={lists}
              onAddToList={handleAddToList}
            />
            <button onClick={() => setSelectedMovie(m)}>Ver Detalles</button>
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
