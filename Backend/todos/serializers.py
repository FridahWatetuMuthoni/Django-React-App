from unicodedata import category
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Todo, Comment, Category

User = get_user_model()


class TodoSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    category = serializers.CharField()

    class Meta:
        model = Todo
        fields = ['id', 'title', 'description',
                  'author', 'completed', 'created', 'comments', 'category']

    def create(self, validated_data):
        category = validated_data.pop('category')
        category_instance, created = Category.objects.get_or_create(
            name=category)
        todo_instance = Todo.objects.create(
            **validated_data, category=category_instance)
        return todo_instance

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.completed = validated_data.get(
            'completed', instance.completed)

        category = validated_data.pop('category')

        if Category.objects.filter(name=category):
            category = Category.objects.get(name=category)
        else:
            category = Category.objects.create(name=category)

        instance.category = category
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    todos = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    comments = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    categories = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['pk', 'username', 'email',
                  'phone_number', 'gender', 'todos', 'categories', 'comments']


"""_summary_
Notice here that you don’t need to customize the post field. 
By adding the post field directly to the fields array,
it is serialized in the default manner (according to the ModelSerializer). 
This is equivalent to defining post = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all()).
"""


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'body', 'author', 'todo']


class CategorySerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    todos = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'author', 'todos']
