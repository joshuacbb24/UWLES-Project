# Generated by Django 2.2.18 on 2021-03-08 04:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_remove_account_has_caseworker'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client_list',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
