# Generated by Django 3.1.7 on 2021-07-05 03:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_auto_20210704_1909'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='filefolder',
            unique_together={('user', 'name')},
        ),
    ]
