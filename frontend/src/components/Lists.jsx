import MovieCard from "../components/MovieCard";

function Lists() {
  // Backend o localStorage
  const myList = [
    { id: 3, title: "The Matrix", year: 1999, poster: "https://play-lh.googleusercontent.com/JCgd2EG9UkbJE9n1bWuBwsvwVr81mS7Ad2ve0K35_w10rqOtRlm9OlPAuAENQXVmh3YpHDGJbsKiT5iaqL8" },
  ];

  return (
    <div>
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
