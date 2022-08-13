# Generated by Django 4.0.5 on 2022-08-12 13:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('todos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='todos', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='todo',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category', to='todos.category'),
        ),
        migrations.AddField(
            model_name='comment',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='comment',
            name='todo',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='todos.todo'),
        ),
        migrations.AddField(
            model_name='category',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories', to=settings.AUTH_USER_MODEL),
        ),
    ]