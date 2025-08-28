import { useState } from "react";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import "./Home.css";


function Home({ token }) {
  const movies = [
      { 
      id: 1, 
      title: "Inception", 
      year: 2010, 
      poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
      sinopsis: "Un ladrón roba secretos a través de los sueños."

    },
    { 
      id: 2, 
      title: "Interstellar", 
      year: 2014, poster: "https://www.originalfilmart.com/cdn/shop/products/interstellar_2014_original_film_art_5000x.jpg?v=1595564403",
      sinopsis: "Exploradores viajan a través del espacio para salvar a la humanidad."

    }
  ];

  const [selectedMovie, setSelectedMovie] = useState(null);


  return (
    <div className="page-container">
      <h2>Películas Populares</h2>
      <div className="movies-grid">
        {movies.map((m) => (
          <div key={m.id} onClick={() => setSelectedMovie(m)}>
          <MovieCard movie={m} />
      </div>
        ))}
    </div>
          {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          token={token}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      </div>
  );
}

export default Home;
