import React from "react";
import { Search } from "lucide-react";

function MovieSearch({ movieSearch, setmovieSearch, onSearch }) {
  // funcion que evita que se recargue la pagina
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Buscar peliculas por titulo..."
              value={movieSearch}
              onChange={(e) => setmovieSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg cursor-pointer"
              >
                Buscar Peliculas
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default MovieSearch;
