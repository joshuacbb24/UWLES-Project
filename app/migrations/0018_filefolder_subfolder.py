# Generated by Django 3.1.7 on 2021-07-12 23:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0017_auto_20210712_1844'),
    ]

    operations = [
        migrations.AddField(
            model_name='filefolder',
            name='subfolder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app.filefolder'),
        ),
    ]
