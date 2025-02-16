from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, NoteSerializer
from .models import Note


class NoteListCreate(generics.ListCreateAPIView):  # automatic view creation handle - by django
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # we cannot reach this route unless we are authenticated

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):  # is this name fixed?
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]  # we cannot reach this route unless we are authenticated

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):  # automatic view creation handle - by django
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
