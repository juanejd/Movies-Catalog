from .serializers import UserSerializer
from .models import User

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def list_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)
