from django.contrib import admin
from .models import Todo, Category, Comment

# Register your models here.
admin.site.register(Todo)
admin.site.register(Comment)
admin.site.register(Category)
