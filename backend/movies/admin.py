from django.contrib import admin
from .models import MovieFavorite


class MovieFavoriteAdmin(admin.ModelAdmin):
    list_display = ("id_movie", "title", "user_id", "saved_at")
    search_fields = ("title", "user__username")


admin.site.register(MovieFavorite, MovieFavoriteAdmin)
