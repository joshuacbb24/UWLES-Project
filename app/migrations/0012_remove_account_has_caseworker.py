# Generated by Django 2.2.18 on 2021-03-08 00:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_account_has_caseworker'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='has_caseworker',
        ),
    ]