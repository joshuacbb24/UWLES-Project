# Generated by Django 3.1.7 on 2021-07-12 23:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0019_auto_20210712_1912'),
    ]

    operations = [
        migrations.CreateModel(
            name='FileSubFolder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('file', models.ManyToManyField(blank=True, to='app.DirectoryFiles')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'name')},
            },
        ),
        migrations.AlterField(
            model_name='filefolder',
            name='subfolder',
            field=models.ManyToManyField(blank=True, null=True, to='app.FileSubFolder'),
        ),
    ]
