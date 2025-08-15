import { useState } from "react";
import { Film } from "lucide-react";
import MovieSearch from "../components/MovieSearch";
import GridMovies from "../components/GridMovies";

function Movies() {
  const [movieSearch, setmovieSearch] = useState("");

  // donde se guardan las peliculas traidas desde el backend
  const [movies, setMovies] = useState([]);

  const baseUrl = "http://127.0.0.1:8000/api/movies";

  const getMovies = () => {
    fetch(`${baseUrl}?query=${movieSearch}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("peliculas", data);
        setMovies(data);
      })

      .catch((error) => console.error("error con la solicitud", error));
  };

  return (
    <>
      <div className=" min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                <Film className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Buscador de peliculas
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Explora miles de películas y encuentra tu próxima aventura
              cinematográfica
            </p>
          </div>
          <MovieSearch
            movieSearch={movieSearch}
            setmovieSearch={setmovieSearch}
            onSearch={getMovies}
          />
          {movies.status == 404 ? (
            <div className="text-center text-gray-600 dark:text-gray-400">
              No se encontraron peliculas con la busqueda realizada
            </div>
          ) : (
            <GridMovies movies={movies} />
          )}
        </main>
      </div>
    </>
  );
}

export default Movies;
