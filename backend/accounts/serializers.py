from rest_framework import serializers
from rest_framework_simplejwt.tokens import Token
from .models import User, Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = "__all__"
        fields = ["id", "username", "email"]


class TokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["full_name"] = user.profile.full_name
        token["username"] = user.username
        token["email"] = user.mail
        token["image"] = user.profile.image
        token["verified"] = user.profile.verified

        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["email", "username", "password", "password2"]

    # custom username validation
    def validate_username(self, value):
        if len(value) < 3:
            raise serializers.ValidationError(
                {"message": "El nombre de usuario debe tener al menos 5 caracteres"}
            )

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                {"message": "El nombre de usuario ya esta en uso"}
            )
        return value

    # custom email validation
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError({"message": "El email ya esta en uso"})
        return value

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Las contraseñas no coinciden"}
            )
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
