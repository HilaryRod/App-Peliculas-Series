import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import "./MovieModal.css";

function MovieModal({ movie, token, onClose }) {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

    // Traer reseñas del backend
  useEffect(() => {
    fetch(`/api/reviews/${movie.id}`) // RUTA BACKEND
      .then(res => res.json())
      .then(data => {
        // backend debería enviar algo como: { id, estrellas, comentario, usuario: "Nombre" }
        setReviews(data);
        if (data.length > 0) {
          const avg = data.reduce((acc, r) => acc + r.estrellas, 0) / data.length;
          setAverageRating(avg.toFixed(1));
        }
      })
      .catch(() => setReviews([]));
  }, [movie.id]);

  const submitReview = () => {
    if (!token) return alert("Debes iniciar sesión para dejar una reseña");

    const reviewData = {
      peliculaId: movie.id,
      estrellas: userRating,
      comentario: userComment
    };

    fetch("/api/reviews", { // RUTA BACKEND
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // ⚡ token al backend para verificación
      },
      body: JSON.stringify(reviewData)
    })
      .then(res => res.json())
      .then(newReview => {
        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);

        const avg = updatedReviews.reduce((acc, r) => acc + r.estrellas, 0) / updatedReviews.length;
        setAverageRating(avg.toFixed(1));

        setUserRating(0);
        setUserComment("");
      });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <img src={movie.poster} alt={movie.title} style={{ width: "200px", borderRadius: "8px" }} />
        <h2>{movie.title} ({movie.year})</h2>
        <p>{movie.sinopsis}</p>
        <p>⭐ {averageRating} ({reviews.length} reseñas)</p>

        {token ? (
          <div>
            <StarRating value={userRating} onChange={setUserRating} />
            <textarea
              value={userComment}
              onChange={e => setUserComment(e.target.value)}
              placeholder="Escribe tu reseña..."
              style={{
                width: "100%",
                marginTop: "0.5rem",
                padding: "0.5rem",
                borderRadius: "6px",
                background: "#465149",
                color: "#fff",
                border: "1px solid #879C90"
              }}
            />
            <button className="btn" onClick={submitReview}>Enviar</button>
          </div>
        ) : (
          <p style={{ fontStyle: "italic" }}>Inicia sesión para calificar y dejar tu reseña</p>
        )}

        <div style={{ marginTop: "1rem" }}>
          <h4>Reseñas:</h4>
          {reviews.map(r => (
            <div key={r.id} style={{ borderTop: "1px solid #444", paddingTop: "0.5rem" }}>
            {/* Aquí se mostrará el nombre real del usuario si el backend lo devuelve */}
            <strong>{r.usuario ? r.usiario : "Anónimo"}</strong> ⭐ {r.estrellas}
              <p>{r.comentario}</p>
            </div>
          ))}
          {reviews.length === 0 && <p>Aún no hay reseñas</p>}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
