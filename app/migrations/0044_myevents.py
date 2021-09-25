# Generated by Django 3.1.7 on 2021-09-25 00:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0043_merge_20210924_1956'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyEvents',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=70)),
                ('description', models.TextField(max_length=200)),
                ('start_day', models.DateField()),
                ('start_time', models.TimeField()),
                ('end_day', models.DateField()),
                ('end_time', models.TimeField()),
                ('all_day', models.BooleanField()),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_who_created_event', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
