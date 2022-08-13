from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

GENDER = (('Female', 'Female'), ('Male', 'Male'), ('Other', 'Other'),)


class User(AbstractUser):
    phone_number = models.IntegerField(null=True)
    gender = models.CharField(max_length=200, choices=GENDER, null=True)
