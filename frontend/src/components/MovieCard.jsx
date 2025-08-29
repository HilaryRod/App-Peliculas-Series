import React from "react";

function MovieCard({ movie }) {
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
        textAlign: "center"
      }}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>{movie.title} ({movie.year})</h3>
    </div>
  );
}

export default MovieCard;
