import { useState } from "react";
import { Calendar, Film } from "lucide-react";
import MovieSearch from "../components/MovieSearch";
import { Link } from "react-router-dom";

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
          <div className="grid grid-cols-3 gap-4">
            {movies.map((movie) => {
              return (
                <div
                  className=" group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 dark:border-gray-700"
                  key={movie.id}
                >
                  {/* Portada de la pelicula */}
                  <div className="relative overflow-hidden">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Titulo de la pelicula */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {movie.title}
                    </h3>

                    {/* Fecha de estreno */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {movie.release_date}
                      </div>
                    </div>

                    {/* Descripcion de la pelicula */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                      {movie.overview || "No hay descripción disponible"}
                    </p>

                    {/* Boton para ver mas detalles */}
                    <Link to={`/movies/${movie.id}`}>
                      <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer">
                        Ver mas detalles
                      </button>
                    </Link>
                  </div>
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
