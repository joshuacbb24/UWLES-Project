# Generated by Django 2.2.18 on 2021-03-28 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0021_auto_20210325_1830'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servicesprovided',
            name='tag',
            field=models.CharField(max_length=25, unique=True),
        ),
        migrations.AlterField(
            model_name='skillsexpertise',
            name='tag',
            field=models.CharField(max_length=25, unique=True),
        ),
    ]
