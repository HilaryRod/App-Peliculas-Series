import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";

function Home() {
  const { user } = useAuth(); 
  const [movies, setMovies] = useState([]);
  const [lists, setLists] = useState([]); // listas del usuario

  // Cargar películas populares siempre
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/movies/popular", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Error al obtener películas");

        const data = await res.json();
        setMovies(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  // Cargar listas solo si hay usuario
  useEffect(() => {
    if (!user) return;

    const fetchLists = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/list", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Error al obtener listas");

        const data = await res.json();
        setLists(
          Array.isArray(data.listas)
            ? data.listas.map(l => ({
                _id: l._id,
                nombre: l.nombre,
                peliculas: Array.isArray(l.peliculas) ? l.peliculas : [],
              }))
            : []
        );
      } catch (err) {
        console.error("Error al obtener listas:", err);
      }
    };

    fetchLists();
  }, [user]);

  // Agregar película a lista (solo usuarios)
  const handleAddToList = async (listId, movie) => {
    if (!user) return; // seguridad extra
    try {
      const res = await fetch(`http://localhost:3000/api/list/${listId}/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ movie }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al agregar película");
      setLists(prev => prev.map(l => (l._id === data._id ? data : l)));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page-container">
      <h2>Películas Populares</h2>
      <div className="movies-grid">
        {movies.map(m => (
          <MovieCard
            key={m.id || m._id}
            movie={m}
            // Solo pasar listas y función si hay usuario
            lists={user ? lists.filter(l => !l.peliculas.some(p => p.movieId === (m.id || m._id))) : []}
            onAddToList={user ? (listId) => {
              const moviePayload = {
                id: m.id || m._id,
                title: m.title,
                poster_path: m.poster || m.poster_path,
              };
              handleAddToList(listId, moviePayload);
            } : null}
          />
        ))}
      </div>

      {!user && (
        <p style={{ marginTop: "1rem", color: "#fff" }}>
          ⚠️ Inicia sesión para poder agregar películas a tus listas o dejar reseñas.
        </p>
      )}
    </div>
  );
}

export default Home;
