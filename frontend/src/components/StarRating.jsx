// ⭐ Componente de estrellas
import React from "react";

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{
            color: star <= value ? "gold" : "gray",
            fontSize: "24px",
            marginRight: "5px"
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;
