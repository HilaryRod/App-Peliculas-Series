import React from "react";
import "../styles/MovieCard.css";

function MovieCard({ movie, lists = [], onAddToList, onSelect }) {
  // Convertimos release_date a objeto Date
  const formattedDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
      })
    : "Fecha desconocida";

  const handleAddToList = () => {
    if (lists.length === 0) return alert("No tienes listas creadas");

    const listId = prompt(
      "Ingresa el ID de la lista a la que quieres agregar la película:\n" +
        lists.map((l) => `${l.id}: ${l.name}`).join("\n")
    );

    if (listId) onAddToList(listId, movie);
  };

  return (
    <div
      className="movie-card"
      style={{
        cursor: "pointer",
        border: "1px solid #444",
        padding: "0.5rem",
        borderRadius: "10px",
        background: "#2c2c2c",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>
        {movie.title} ({formattedDate})
      </h3>

      {/* Botón para agregar a lista */}
      {onAddToList && (
        <button
          style={{
            marginTop: "0.5rem",
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            border: "none",
            background: "#879C90",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={handleAddToList}
        >
          ➕ Agregar a lista
        </button>
      )}

      {/* Botón opcional para abrir modal */}
      {onSelect && (
        <button
          style={{
            marginTop: "0.5rem",
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            border: "none",
            background: "#465149",
            color: "#fff",
            cursor: "pointer",
            display: "block",
            width: "100%",
          }}
          onClick={() => onSelect(movie)}
        >
          Ver detalles
        </button>
      )}
    </div>
  );
}

export default MovieCard;

