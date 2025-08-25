import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";

function Lists() {
  // Ejemplo: aquí luego conectas a tu backend o localStorage
  const myList = [
    { id: 3, title: "The Matrix", year: 1999, poster: "https://via.placeholder.com/150" },
  ];

  return (
    <div>
      <Navbar />
      <h2>Mis Listas</h2>
      {myList.length === 0 ? (
        <p>No tienes películas en tu lista 😢</p>
      ) : (
        <div className="movies-grid">
          {myList.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Lists;
