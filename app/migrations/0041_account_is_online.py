# Generated by Django 3.1.7 on 2021-09-09 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0040_mynotes'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='is_online',
            field=models.BooleanField(default=False),
        ),
    ]
