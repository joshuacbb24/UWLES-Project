# Generated by Django 3.1.7 on 2021-06-26 19:39

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_shareorgwith'),
    ]

    operations = [
        migrations.AddField(
            model_name='organizations',
            name='collaborators',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]