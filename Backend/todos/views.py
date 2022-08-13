from django.shortcuts import render
from django.http import HttpResponse
from .serializers import UserSerializer, TodoSerializer, CommentSerializer, CategorySerializer
from rest_framework import viewsets
from django.contrib.auth import get_user_model
from .models import Todo, Comment, Category
from rest_framework.permissions import IsAuthenticated


# Create your views here.

User = get_user_model()


def home(request):
    return HttpResponse('Home Page')


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]

    # def get_queryset(self):
    #author = self.request.user
    # return Todo.objects.filter(author=author)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


"""_summary_
from django.shortcuts import render
from .models import Student
from .serializers import StudentSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
# Create your views here.
_summary_
StudentList enables us to accept GET requests to list all the students available.
It also allows us to accept POST requests to create a new student.


class StudentList(ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]


_summary_
StudentDetail responds to GET requests to provide the details of a specific student as indicated by the id or primary_key.
It also responds to PUT requests to update one or more of the fields of a student.
It also deletes a student instance when a DELETE request is made.



class StudentDetail(RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]


_summary_
However, permission_classes = [IsAuthenticated] ensures that the responses from the views will only be available if the user making the request is logged in and authenticated.
Assuming we do not need our users to be authenticated to access the APIs,
we wouldn't include the permission class.
You can learn more about Permissions in Django REST Framework.


"""
