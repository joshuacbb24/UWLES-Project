# Generated by Django 3.1.7 on 2021-09-22 19:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0042_merge_20210920_1413'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='mynotes',
            options={'ordering': ('date',)},
        ),
    ]