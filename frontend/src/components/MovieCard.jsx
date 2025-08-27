

import React, { useState, useEffect } from "react";

// Componente de estrellas
function StarRating({ value, onChange }) {
  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      {[1,2,3,4,5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{ color: star <= value ? "gold" : "gray", fontSize: "24px" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function MovieCard({ movie, user }) {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  // Traer reseñas de la película (simulado)
  useEffect(() => {
    fetch(`/api/reviews/${movie.id}`)
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        if(data.length > 0){
          const avg = data.reduce((acc, r) => acc + r.estrellas, 0) / data.length;
          setAverageRating(avg.toFixed(1));
        }
      });
  }, [movie.id]);

  const submitReview = () => {
    if(!user) return alert("Debes iniciar sesión para dejar una reseña");

    const reviewData = {
      peliculaId: movie.id,
      estrellas: userRating,
      comentario: userComment
    };

    fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData)
    })
      .then(res => res.json())
      .then(newReview => {
        setReviews([...reviews, newReview]);
        const avg = [...reviews, newReview].reduce((acc, r) => acc + r.estrellas, 0) / ([...reviews, newReview].length);
        setAverageRating(avg.toFixed(1));
        setUserRating(0);
        setUserComment("");
      });
  };

  return (
    <div className="movie-card" style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem", width: "300px" }}>
      <img src={movie.poster} alt={movie.title} style={{ width: "100%" }} />
      <h3>{movie.title} ({movie.year})</h3>
      <p>{movie.sinopsis}</p>
      <p>⭐ {averageRating} ({reviews.length} reseñas)</p>

      {user ? (
        <div className="rating-section">
          <StarRating value={userRating} onChange={setUserRating} />
          <textarea
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Escribe tu reseña..."
            style={{ width: "100%", marginTop: "0.5rem" }}
          />
          <button onClick={submitReview} style={{ marginTop: "0.5rem" }}>Enviar</button>
        </div>
      ) : (
        <p style={{ fontStyle: "italic" }}>Inicia sesión para calificar y dejar tu reseña</p>
      )}

      <div style={{ marginTop: "1rem" }}>
        <h4>Reseñas:</h4>
        {reviews.map((r) => (
          <div key={r.id} style={{ borderTop: "1px solid #eee", marginTop: "0.5rem", paddingTop: "0.5rem" }}>
            <strong>{r.usuario}</strong> ⭐ {r.estrellas}
            <p>{r.comentario}</p>
          </div>
        ))}
        {reviews.length === 0 && <p>Aún no hay reseñas</p>}
      </div>
    </div>
  );
}

export default MovieCard;


