import React from "react";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

function GridMovies({ movies }) {
  return (
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
  );
}

export default GridMovies;
