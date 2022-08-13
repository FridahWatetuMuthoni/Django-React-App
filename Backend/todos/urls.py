from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('todos', views.TodoViewSet, basename='todos')
router.register('comments', views.CommentsViewSet, basename='comments')
router.register('category', views.CategoryViewSet, basename='category')


urlpatterns = [
    path('', include(router.urls)),
    path('home', views.home, name='home')
]
