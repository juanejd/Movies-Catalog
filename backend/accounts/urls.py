from django.urls import path
from .views import list_users, detail_user, register_user

urlpatterns = [
    path("users/", list_users),
    path("users/<int:id>/", detail_user),
    path("users/register/", register_user),
]
