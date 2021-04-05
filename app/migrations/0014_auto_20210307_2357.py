# Generated by Django 2.2.18 on 2021-03-08 04:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_auto_20210307_2342'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='has_caseworker',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='account',
            name='is_caseworker',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='account',
            name='is_client',
            field=models.BooleanField(default=True),
        ),
    ]
