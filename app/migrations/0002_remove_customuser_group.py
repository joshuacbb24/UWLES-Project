# Generated by Django 2.2.18 on 2021-03-01 01:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='group',
        ),
    ]