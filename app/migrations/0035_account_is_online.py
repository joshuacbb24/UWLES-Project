# Generated by Django 3.1.7 on 2021-09-06 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0034_auto_20210809_1400'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='is_online',
            field=models.BooleanField(default=False),
        ),
    ]
