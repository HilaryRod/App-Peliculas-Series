import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";

function Lists() {
  const { user } = useAuth();
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  // Cargar listas al entrar
  useEffect(() => {
    if (!user) return;

    const fetchLists = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/list", {
          credentials: "include",
        });
        const data = await res.json();
        setLists(
        data.listas.map(l => ({
          _id: l._id || l.id,
          nombre: l.nombre || l.name,
          peliculas: l.peliculas || [],
        }))
      );
      } catch (err) {
        console.error("Error al cargar listas:", err);
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
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ nombre: newListName, peliculas: [] }),
      });

      if (!res.ok) throw new Error("Error al crear lista");

      const data = await res.json();
      setLists([...lists, data.lista || data]); // agregar al estado
      setNewListName("");
    } catch (err) {
      console.error("Error al crear lista:", err);
      alert(err.message);
    }
  };

  // Agregar película a lista
  const handleAddToList = async (listId, movie) => {
    try {
      const res = await fetch(`http://localhost:3000/api/list/${listId}/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ movie }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al agregar película");
      }

      const updatedList = await res.json();
      setLists((prev) =>
        prev.map((l) => (l._id === updatedList._id ? updatedList : l))
      );
    } catch (err) {
      console.error("Error al agregar película:", err);
      alert(err.message);
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

        {/* Crear nueva lista */}
        <input
          type="text"
          placeholder="Nombre de la nueva lista..."
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button className="btn" onClick={handleCreateList}>
          Crear
        </button>

        {/* Mostrar listas */}
        {lists.length === 0 ? (
          <p>No tienes listas creadas 😢</p>
        ) : (
          lists.map((list) => (
            <div key={list._id} style={{ marginTop: "2rem" }}>
              <h3>{list.nombre}</h3>
              {list.peliculas.length === 0 ? (
                <p>Lista vacía</p>
              ) : (
                <div className="movies-grid">
                  {list.peliculas.map((m) => (
                    <MovieCard
                      key={m.movieId}
                      movie={m}
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