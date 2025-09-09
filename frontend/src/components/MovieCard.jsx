import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, lists = [], onAddToList }) {
  const formattedDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("es-ES", { year: "numeric", month: "long" })
    : "Fecha desconocida";

  const handleSelectChange = (e) => {
    const listId = e.target.value;
    if (listId && onAddToList) {
      const moviePayload = {
        id: movie.id || movie._id,
        title: movie.title,
        poster_path: movie.poster || movie.poster_path
      };
      onAddToList(listId, moviePayload);
      e.target.value = "";
    }
  };

  return (
    <div 
    style={{ 
      border: "1px solid #444", 
      padding: "0.5rem", 
      borderRadius: "10px", 
      background: "#2c2c2c", 
      color: "#fff", 
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      }}>
      <img src={movie.poster || movie.poster_path} alt={movie.title} style={{ width: "100%", borderRadius: "8px" }} />
      <h3>{movie.title} ({formattedDate})</h3>

      {lists.length > 0 && onAddToList && (
        <select onChange={handleSelectChange} defaultValue="" style={{ marginTop: "0.5rem", padding: "0.4rem 0.8rem", borderRadius: "6px", border: "none", background: "#879C90", color: "#fff", cursor: "pointer" }}>
          <option value="" disabled>➕ Agregar a lista...</option>
          {lists.map(l => <option key={l._id} value={l._id}>{l.nombre}</option>)}
        </select>
      )}

      <Link 
      to={`/movies/${movie._id || movie.id}`} 
      style={{ 
        marginTop: "0.5rem", 
        padding: "0.4rem 0.8rem", 
        borderRadius: "0 0 10px 10px", 
        border: "none", 
        background: "#465149", 
        color: "#fff", 
        display: "block", 
        width: "100%",
        textAlign: "center",
        alignSelf: "stretch",
        boxSizing: "border-box"
      }}
        

        >
          Ver detalles</Link>
    </div>
  );
}

export default MovieCard;
