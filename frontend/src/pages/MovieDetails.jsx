import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import { useAuth } from "../context/AuthContext";
import "../styles/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // revisamos si ya dejó reseña
const yaDejoResena = user
  ? reviews.some(r => r.user?._id === user._id)
  : false;
  // Traer datos de la película
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/movies/${id}`);
        if (!res.ok) throw new Error("Error al obtener la película");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la película");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Traer reseñas
  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/review/${id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al obtener reseñas");
      const data = await res.json();
      setReviews(Array.isArray(data.resenas) ? data.resenas : []);
    } catch (err) {
      console.error(err);
      setReviews([]);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  // Traer promedio
  const fetchAverage = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/ratings/${id}/promedio`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Error al obtener promedio");
      const data = await res.json();
      setAverageRating(data.promedio || 0);
      setTotalReviews(data.total || 0);
    } catch (err) {
      console.error(err);
      setAverageRating(0);
      setTotalReviews(0);
    }
  };

  useEffect(() => {
    fetchAverage();
  }, [id]);

  const submitReview = async () => {
    if (!user) {
      alert("Debes iniciar sesión para enviar una reseña");
      return;
    }
    if (!userComment.trim() || !userRating) {
      alert("Debes escribir un comentario y seleccionar una calificación");
      return;
    }

    try {
      // 1. Crear reseña
      const resResena = await fetch("http://localhost:3000/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ movieId: id, texto: userComment }),
      });

      if (!resResena.ok) {
        const errorData = await resResena.json();
        throw new Error(errorData.message || "Error al enviar reseña");
      }

      // 2. Crear rating
      const resRating = await fetch("http://localhost:3000/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ movieId: id, score: userRating }),
      });

      if (!resRating.ok) {
        const errorData = await resRating.json();
        throw new Error(errorData.message || "Error al enviar rating");
      }

      // todo bien → limpiar y refrescar
      setUserComment("");
      setUserRating(0);
      fetchReviews();
      fetchAverage();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading || authLoading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No se encontró la película</p>;

  return (
    <div className="movie-details">
      <img
        src={movie.poster}
        alt={movie.title}
        style={{ width: "200px", borderRadius: "8px" }}
      />
      <h2>
        {movie.title} ({movie.release_date?.slice(0, 4) || "Año desconocido"})
      </h2>
      <p>{movie.overview || "Sin sinopsis"}</p>
      <p>
        ⭐ {averageRating} ({totalReviews} reseñas)
      </p>

      {/* Formulario reseñas */}
      {user ? (
        yaDejoResena ? (
          <p style={{ fontStyle: "italic", color: "#aaa" }}>
            Ya dejaste una reseña para esta película
          </p>
        ) : (
          <div>
            <StarRating value={userRating} onChange={setUserRating} />
            <textarea
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              placeholder="Escribe tu reseña..."
              style={{
                width: "100%",
                marginTop: "0.5rem",
                padding: "0.5rem",
                borderRadius: "6px",
                background: "#465149",
                color: "#fff",
                border: "1px solid #879C90",
              }}
            />
            <button className="btn" onClick={submitReview}>
              Enviar
            </button>
          </div>
        )
      ) : (
        <p style={{ fontStyle: "italic" }}>
          Inicia sesión para calificar y dejar tu reseña
        </p>
      )}

      <div style={{ marginTop: "1rem" }}>
        <h4>Reseñas:</h4>
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div
              key={r._id || r.id}
              style={{ borderTop: "1px solid #444", paddingTop: "0.5rem" }}
            >
              <strong>{r.user?.username || "Anónimo"}</strong>
              {r.rating ? (
                <span> ⭐ {r.rating}</span>
              ) : (
                <span style={{ fontStyle: "italic", color: "#aaa" }}>
                  {" "}
                  (no calificó)
                </span>
              )}
              <p>{r.texto}</p>
            </div>
          ))
        ) : (
          <p>Aún no hay reseñas</p>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
