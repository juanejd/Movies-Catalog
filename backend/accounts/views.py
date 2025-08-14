from .serializers import (
    UserSerializer,
    RegisterSerializer,
    MyTokenObtainPairSerializer,
)
from .models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework.response import Response
from rest_framework import status


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


@api_view(["GET", "POST"])
@permission_classes(IsAuthenticated)
def dashboard(request) -> Response:
    if request.method == "GET":
        context = f"Hey {request.user} Estas viendo una respuesta GET"
        return Response({"response": context}, status=status.HTTP_200_OK)
    elif request.method == "POST":
        text = request.POST.get("texto")
        response = f"Hey {request.user} tu texto es {text}"
        return Response({"response": response}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


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
