# Generated by Django 2.2.18 on 2021-03-08 00:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_remove_account_has_caseworker'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='has_caseworker',
            field=models.BooleanField(default=False),
        ),
    ]
