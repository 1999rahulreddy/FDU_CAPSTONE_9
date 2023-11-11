from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Professor

from rest_framework.serializers import Serializer, FileField


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(
            username=self.validated_data['username']
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError(
                {'password': 'Passwords must match.'})
        user.set_password(password)
        user.save()
        return user


class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_new_password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ['old_password', 'new_password', 'confirm_new_password']

    def save(self):
        current_user = self.context['request'].user
        old_password = self.validated_data['old_password']
        new_password = self.validated_data['new_password']
        confirm_new_password = self.validated_data['confirm_new_password']
        if not current_user.check_password(old_password):
            raise serializers.ValidationError({"old_password": "Old Password is incorrect."})
        elif new_password != confirm_new_password:
            raise serializers.ValidationError({"new_password": "New passwords do not match."})
        else:
            current_user.set_password(new_password)
            current_user.save()
            return current_user
        



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    description = serializers.CharField(required=False, allow_blank=True)


class ProfSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        fields = ('prof_name', 'prof_family', 'prof_email')
