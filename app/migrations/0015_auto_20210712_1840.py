# Generated by Django 3.1.7 on 2021-07-12 22:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_recentfiles'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recentfiles',
            name='time_viewed',
            field=models.DateField(),
        ),
    ]
