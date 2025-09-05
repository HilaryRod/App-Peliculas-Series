import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import MovieDetails from "./MovieDetails";
import { useAuth } from "../context/AuthContext";
import "../styles/Home.css";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useAuth(); 
  const [movies, setMovies] = useState([]);
  const [lists, setLists] = useState([]); // listas del usuario

  // Cargar películas populares
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/movies/popular", {
          credentials: "include", // importante para enviar cookies
        });
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
  if (!user) return;

  const fetchLists = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/list", {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Error al obtener listas");

    const data = await res.json(); // solo leer JSON una vez
    console.log("Listas obtenidas:", data);

     setLists(
        data.listas.map(l => ({
          _id: l._id || l.id,
          nombre: l.nombre || l.name,
          peliculas: l.peliculas || [],
        }))
      );
  } catch (err) {
    console.error("Error al obtener listas:", err);
  }
};

  fetchLists();
}, [user]);

  // Agregar película a lista
  const handleAddToList = async (listId, movie) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/list/${listId}/movies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
          body: JSON.stringify({ movie }),
        }
      );
       if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al agregar película");
    }
    const updatedList = await res.json();
    setLists((prev) => prev.map((l) => l._id === updatedList._id ? updatedList : l));
  } catch (err) {
    console.error("Error al agregar película:", err);
    alert(err.message);
  }
};

  return (
    <div className="page-container">
      <h2>Películas Populares</h2>
      <div className="movies-grid">
        {movies.map((m) => (
          <MovieCard
            key={m.id||m._id}
            movie={m}
            lists={lists}
            onAddToList={handleAddToList}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
