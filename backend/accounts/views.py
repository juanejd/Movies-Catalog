from .serializers import (
    UserSerializer,
    RegisterSerializer,
    MyTokenObtainPairSerializer,
)
from .models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework.response import Response
from rest_framework import status


# login de usuario
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# registro de usuario
class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request):
        response = super().create(request)
        if response.status_code == 201:
            return Response(
                {
                    "message": "Usuario Creado Satisfactoriamente",
                    "status": status.HTTP_201_CREATED,
                },
                status=status.HTTP_201_CREATED,
            )
        return response


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def dashboard(request) -> Response:
    if request.method == "GET":
        context = f"Hey {request.user} Estas viendo una respuesta GET"
        return Response({"response": context}, status=status.HTTP_200_OK)
    elif request.method == "POST":
        text = request.POST.get("texto")
        response = f"Hey {request.user} tu texto es {text}"
        return Response({"response": response}, status=status.HTTP_200_OK)

    return Response({}, status=status.HTTP_400_BAD_REQUEST)


# lista de usuarios
class UsersView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# user por id
class UserDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
