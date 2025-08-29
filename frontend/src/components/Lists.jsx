import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

function Lists({ token }) {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    if (token) {
      // Simulación de fetch (aquí iría tu backend)
            fetch("http://localhost:3000/api/auth/lists", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setLists(data))
        .catch(() => {
          // En caso de error
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
  }, [token]);

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    const newList = { id: Date.now(), name: newListName, movies: [] };

    setLists([...lists, newList]);
    setNewListName("");
  };

  if (!token) {
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
                      <MovieCard key={m.id} movie={m} token={token} />
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

