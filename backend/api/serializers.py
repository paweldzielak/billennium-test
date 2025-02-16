from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}  # do not send password back

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        print('UserSerializer.Meta.create user=', user)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        # TODO: check if is there any way to take all by default, and not repeat code for specifying fields
        fields = ('id', 'title', 'content', 'created_at', 'author')
        extra_kwargs = {'author': {'read_only': True}}
