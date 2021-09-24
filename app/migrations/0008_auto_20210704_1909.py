# Generated by Django 3.1.7 on 2021-07-04 23:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20210702_0124'),
    ]

    operations = [
        migrations.AddField(
            model_name='directoryfiles',
            name='description',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='directoryfiles',
            name='tags',
            field=models.ManyToManyField(blank=True, to='app.PillTags'),
        ),
        migrations.CreateModel(
            name='FileFolder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('file', models.ManyToManyField(blank=True, to='app.DirectoryFiles')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]