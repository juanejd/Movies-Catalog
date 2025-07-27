from django.db import models
from accounts.models import User


class MovieFavorites(models.Model):
    id_movie = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)
