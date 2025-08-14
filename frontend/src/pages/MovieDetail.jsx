import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function MovieDetail() {
  const [movie, setMovie] = useState([]);

  const { movie_id } = useParams();
  console.log(movie_id);
  const navigate = useNavigate();

  const baseUrl = "http://127.0.0.1:8000/api/movies";
  const getMovie = () => {
    fetch(`${baseUrl}/${movie_id}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("pelicula", data);
        setMovie(data);
      })
      .catch((error) => {
        console.error("No se pudo obtener la pelicula con ese id", error);
      });
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 ">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {movie.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {movie.overview}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {movie.release_date}
              </p>
              <div className="space-y-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Agregar a favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MovieDetail;
