import { useState } from "react";
import { Film } from "lucide-react";

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
        setmovieSearch("");
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
          <input
            type="text"
            className="border-2 border-gray-300 rounded-md p-2 mt-4 bg-amber-100 mr-2"
            placeholder="Escribe el nombre de la pelicula"
            value={movieSearch}
            onChange={(e) => setmovieSearch(e.target.value)}
          />
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-4 cursor-pointer"
            onClick={getMovies}
          >
            Obtener peliculas
          </button>

          <div className="grid grid-cols-3 gap-4">
            {movies.map((movie) => {
              return (
                <div
                  className=" bg-yellow-800 rounded-lg shadow-md p-4 text-white"
                  key={movie.id}
                >
                  <p>{movie.id}</p>
                  <p>{movie.original_title}</p>
                  <p>{movie.title}</p>
                  <p>{movie.overview}</p>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto"
                  />
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}

export default Movies;
