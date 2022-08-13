from django.shortcuts import render
from dj_rest_auth.registration.views import RegisterView
from .serializers import RegistrationSerializer

# Create your views here.


class RegistrationView(RegisterView):
    serializer_class = RegistrationSerializer
