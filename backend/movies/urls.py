from django.urls import path
from .views import get_movies, movie_details, favorite_user_movie

urlpatterns = [
    path("movies", get_movies),
    path("movies/<int:movie_id>/", movie_details),
    path("movies_user/<int:id>/", favorite_user_movie),
]
