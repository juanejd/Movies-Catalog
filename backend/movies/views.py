from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import MoviesSerializer, FavoriteMovieSerializer

from .models import MovieFavorite

import requests
import os

API_KEY = os.getenv("TMDB_API_KEY")


@api_view(["GET"])
def get_movies(request) -> Response:
    """
    Get movies from the API
    Args:
        request: The request object with the query and language parameters
    Returns:
        Response: The response object with the movies list and the total results
    """
    params = {
        "query": request.GET.get("query", ""),
        "language": request.GET.get("language", "es-US"),
    }
    base_url = "https://api.themoviedb.org/3/search/movie"

    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {API_KEY}",
    }

    response = requests.get(base_url, headers=headers, params=params)
    if response.status_code != 200:
        return Response(
            {
                "message": "No se pudo obtener conexion con la API",
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    movies = response.json()
    movies_list = movies["results"]

    if len(movies_list) > 0:
        serializer = MoviesSerializer(movies_list, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
            headers={"Results-Found": movies["total_results"]},
        )
    else:
        return Response(
            {
                "message": "No se encontraron resultados",
                "status": status.HTTP_404_NOT_FOUND,
            },
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["GET"])
def movie_details(request, movie_id: int) -> Response:
    """
    Get movie details from the API
    Args:
        request: The request object with the movie_id parameter
    Returns:
        Response: The response object with the movie details
    """
    base_url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    params = {"language": "es-US"}
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {API_KEY}",
    }
    response = requests.get(base_url, headers=headers, params=params)
    if response.status_code != 200:
        return Response(
            {
                "message": "No se pudo obtener conexion con la API",
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    movie = response.json()

    return Response(movie, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
def favorite_user_movie(request, id):
    """
    Get favorite movies from the database
    Args:
        request: The request object with the id parameter
    Returns:
        Response: The response object with the favorite movies
    """
    movies = MovieFavorite.objects.filter(user=id)
    if not movies.exists():
        return Response(
            {
                "message": "No hay peliculas favoritas para este usuario",
                "status": status.HTTP_404_NOT_FOUND,
            },
            status=status.HTTP_404_NOT_FOUND,
        )
    if request.method == "GET":
        serializer = FavoriteMovieSerializer(movies, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        serializer = FavoriteMovieSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
