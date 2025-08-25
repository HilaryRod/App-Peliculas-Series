import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import "./style.css";

function Home() {
  const movies = [
    { id: 1, title: "Inception", year: 2010, poster: "https://via.placeholder.com/150" },
    { id: 2, title: "Interstellar", year: 2014, poster: "https://via.placeholder.com/150" },
  ];

  return (
    <div>
      <Navbar />
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
