# Generated by Django 3.1.7 on 2021-07-12 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_auto_20210712_1842'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recentfiles',
            name='time_viewed',
            field=models.DateField(),
        ),
    ]
