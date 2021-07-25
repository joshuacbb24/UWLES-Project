# Generated by Django 3.1.7 on 2021-06-26 19:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_organizations_collaborators'),
    ]

    operations = [
        migrations.CreateModel(
            name='SharedWithMe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('organization', models.ManyToManyField(blank=True, to='app.Organizations')),
            ],
        ),
        migrations.DeleteModel(
            name='ShareOrgWith',
        ),
    ]
