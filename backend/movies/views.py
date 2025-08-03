from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import MoviesSerializer

import requests
import os

API_KEY = os.getenv("TMDB_API_KEY")


@api_view(["GET"])
def get_movies(request):
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
