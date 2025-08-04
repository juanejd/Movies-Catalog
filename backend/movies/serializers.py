from rest_framework import serializers
from .models import MovieFavorite


class MoviesSerializer(serializers.Serializer):
    # Nombres de los campos que vienen desde la api
    id = serializers.IntegerField()
    original_language = serializers.CharField()
    original_title = serializers.CharField()
    title = serializers.CharField()
    overview = serializers.CharField()
    release_date = serializers.CharField()
    backdrop_path = serializers.CharField()
    poster_path = serializers.CharField()

    # def to_representation(self, instance):
    #     """Transform to match your desired output format"""
    #     return {"title": instance.get("Title"), "imdb_id": instance.get("imdbID")}


class FavoriteMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieFavorite
        fields = "__all__"
