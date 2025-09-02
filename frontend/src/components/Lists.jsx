import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

function Lists({ token }) {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");

  // Cargar listas al entrar
  useEffect(() => {
    if (token) {
      fetch("http://localhost:3000/api/auth/lists", { //direccion backend
        headers: { Authorization: `Bearer ${token}` },
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
  }, [token]);

  // Crear nueva lista
  const handleCreateList = async () => {
    if (!newListName.trim()) return;

    try {
      const res = await fetch("http://localhost:3000/api/auth/lists", { //fireccion backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
