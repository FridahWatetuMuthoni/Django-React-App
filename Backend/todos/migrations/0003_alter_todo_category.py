# Generated by Django 4.0.5 on 2022-08-13 06:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='category',
            field=models.ForeignKey(blank=True, default='todos', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='category', to='todos.category'),
        ),
    ]
