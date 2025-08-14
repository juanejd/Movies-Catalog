from .serializers import UserSerializer, RegisterSerializer
from .models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# from rest_framework.authtoken.models import Token


@api_view(["GET", "POST"])
def list_users(request) -> Response:
    """
    Get all users from the database
    Args:
        request: The request object
    Returns:
        Response: The response object with the users list
    """
    if request.method == "GET":
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


# @api_view(["GET"])
# def login_user(request) -> Response:
#     serializer =


@api_view(["POST"])
def register_user(request) -> Response:
    """
    Register a new user
    Args:
        request: The request object with the user data
    Returns:
        Response: The response object with the user data
    """
    if request.method == "POST":
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "message": "Usuario Creado Satisfactoriamente",
                "status": status.HTTP_201_CREATED,
                "user": UserSerializer(user).data,
                # "user": UserSerializer(user, context={"request": request}).data,
            },
            status=status.HTTP_201_CREATED,
        )


@api_view(["GET", "PUT"])
def detail_user(request, id) -> Response:
    """
    Get a user from the database
    Args:
        request: The request object with the id parameter and the method
    Returns:
        Response: The response object with the user data or the updated user data
    """
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(
            {
                "message": "No se encontro el usuario con este id",
                "status": status.HTTP_404_NOT_FOUND,
            },
            status=status.HTTP_404_NOT_FOUND,
        )
    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = UserSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
