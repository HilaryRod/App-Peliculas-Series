// ⭐ Componente de estrellas mejorado
import React from "react";

function StarRating({ value = 0, onChange = () => {}, readOnly = false }) {
  return (
    <div style={{ display: "flex", cursor: readOnly ? "default" : "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => !readOnly && onChange(star)} // 👈 solo funciona si NO es readOnly
          style={{
            color: star <= value ? "gold" : "gray",
            fontSize: "24px",
            marginRight: "5px",
            pointerEvents: readOnly ? "none" : "auto" // bloquea clics si es readOnly
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;