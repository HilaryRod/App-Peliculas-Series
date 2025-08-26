import MovieCard from "../components/MovieCard";
import "./Home.css";

function Home() {
  const movies = [
      { 
      id: 1, 
      title: "Inception", 
      year: 2010, 
      poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg" 
    },
    { 
      id: 2, 
      title: "Interstellar", 
      year: 2014, poster: "https://www.originalfilmart.com/cdn/shop/products/interstellar_2014_original_film_art_5000x.jpg?v=1595564403"
    }
  ];

  return (
    <div>
      <h2>Películas Populares</h2>
      <div className="movies-grid">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}

export default Home;
