# Generated by Django 3.1.7 on 2021-09-25 00:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0044_myevents'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tasks',
            old_name='description',
            new_name='task_description',
        ),
        migrations.RenameField(
            model_name='tasks',
            old_name='title',
            new_name='task_title',
        ),
        migrations.AlterUniqueTogether(
            name='tasks',
            unique_together={('assigner', 'task_title', 'task_description')},
        ),
    ]