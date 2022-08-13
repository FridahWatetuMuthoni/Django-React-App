from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()
# Create your models here.


class Todo(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='todos')
    description = models.TextField()
    completed = models.BooleanField(default=False)
    category = models.ForeignKey(
        'Category', on_delete=models.CASCADE, related_name='category', null=True, blank=True, default='todos')
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return self.title


class Comment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    body = models.TextField(blank=False)
    author = models.ForeignKey(
        User, related_name='comments', on_delete=models.CASCADE)
    todo = models.ForeignKey(
        'Todo', related_name='comments', on_delete=models.CASCADE)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.body[:10] + '...'


class Category(models.Model):
    name = models.CharField(max_length=100, blank=False, default='')
    author = models.ForeignKey(
        User, related_name='categories', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name[:10] + '...'
