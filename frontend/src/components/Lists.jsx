import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";
import "../styles/Listas.css"

function Lists() {
  const { user } = useAuth();
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  // Cargar listas del backend
  useEffect(() => {
    if (!user) return;

    const fetchLists = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/list", {
          credentials: "include",
        });
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
        setLists([]);
      }
    };

    fetchLists();
  }, [user]);

  // Crear nueva lista
  const handleCreateList = async () => {
    if (!newListName.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/api/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({ nombre: newListName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al crear lista");

      setLists(prev => [{ _id: data.lista._id, nombre: data.lista.nombre, peliculas: [] }, ...prev]);
      setNewListName("");
    } catch (err) {
      console.error(err.message);
      const newList = { _id: Date.now(), nombre: newListName, peliculas: [] };
      setLists(prev => [newList, ...prev]);
      setNewListName("");
    }
  };

  // Agregar película a lista
  const handleAddToList = async (listId, movie) => {
    if (!user) return;

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
      console.error(err.message);
    }
  };

  if (!user) {
    return (
      <div className="auth-container">
        <div className="container">
          <h2>Mis Listas</h2>
          <p>⚠️ Inicia sesión para crear y ver tus listas de películas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="container">
        <h2>Mis Listas</h2>

        <input
          type="text"
          placeholder="Nombre de la nueva lista..."
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button className="btn" onClick={handleCreateList}>Crear</button>

        {lists.length === 0 ? (
          <p>No tienes listas creadas 😢</p>
        ) : (
          lists.map(list => (
            <div key={list._id} className="list-block">
              <h3>{list.nombre}</h3>

              {list.peliculas.length === 0 ? (
                <p>Lista vacía</p>
              ) : (
                <div className="movies-grid">
                  {list.peliculas.map(m => (
                    <MovieCard
                      key={m.movieId}
                      movie={{ id: m.movieId, title: m.titulo, poster: m.poster_path }}
                      lists={lists}
                      onAddToList={handleAddToList}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Lists;
