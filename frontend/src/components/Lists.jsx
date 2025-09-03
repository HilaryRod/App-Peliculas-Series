import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";

function Lists() {
  const { user } = useAuth();
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  // Cargar listas al entrar
  useEffect(() => {
    if (user) {
      fetch("http://localhost:3000/api/auth/lists", { //direccion backend
        credentials: "include"
      })
        .then((res) => res.json())
        .then((data) => setLists(data))
        .catch(() => {
          // En caso de error, muestra algo de prueba
          setLists([
            {
              id: 1,
              name: "Favoritas",
              movies: [
                {
                  id: 3,
                  title: "The Matrix",
                  year: 1999,
                  poster:
                    "https://play-lh.googleusercontent.com/JCgd2EG9UkbJE9n1bWuBwsvwVr81mS7Ad2ve0K35_w10rqOtRlm9OlPAuAENQXVmh3YpHDGJbsKiT5iaqL8",
                },
              ],
            },
          ]);
        });
    }
  }, [user]);

  // Crear nueva lista
  const handleCreateList = async () => {
    if (!newListName.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/api/auth/lists", { //fireccion backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({ name: newListName }),
      });

      if (!res.ok) throw new Error("Error al crear lista");

      const data = await res.json();
      setLists([...lists, data]); // agregar la nueva lista a estado
      setNewListName("");
    } catch (err) {
      console.error("Error al crear la lista", err);

      // fallback local (que funcione sin backend)
      const newList = { id: Date.now(), name: newListName, movies: [] };
      setLists([...lists, newList]);
      setNewListName("");
    }
  };

  const handleAddToList = async (listId, movie) => {
  try {
    const res = await fetch(`http://localhost:3000/api/auth/lists/${listId}/movies`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: movie.id }),
    });

    if (!res.ok) throw new Error("Error al agregar película");

    // 🔄 refrescar listas desde el backend
    const updated = await fetch("http://localhost:3000/api/auth/lists", {
      credentials: "include",
    });
    const data = await updated.json();
    setLists(data);

  } catch (err) {
    console.error("Error al agregar película", err);
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
          <div>
            {lists.map((list) => (
              <div key={list.id} style={{ marginTop: "2rem" }}>
                <h3>{list.name}</h3>
                {list.movies.length === 0 ? (
                  <p>Lista vacía</p>
                ) : (
                  <div className="movies-grid">
                    {list.movies.map((m) => (
                      <MovieCard 
                      key={m.id} 
                      movie={m} 
                      lists={lists}                 // todas tus listas para el prompt
                      onAddToList={handleAddToList}/>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Lists;
