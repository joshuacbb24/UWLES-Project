# Generated by Django 3.1.7 on 2021-07-12 22:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_auto_20210712_1840'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recentfiles',
            name='time_viewed',
            field=models.DateTimeField(),
        ),
    ]