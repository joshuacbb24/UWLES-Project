# Generated by Django 3.1.7 on 2021-09-25 04:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0045_auto_20210924_2031'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='mynotes',
            options={'ordering': ('date',)},
        ),
    ]