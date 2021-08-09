# Generated by Django 3.1.7 on 2021-08-09 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0032_auto_20210808_1424'),
    ]

    operations = [
        migrations.CreateModel(
            name='MySurvey2',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('edit_org_difficulty', models.CharField(choices=[('Very Easy', 'Very Easy'), ('Easy', 'Easy'), ('Moderate', 'Moderate'), ('Hard', 'Hard'), ('Very Hard', 'Very Hard')], max_length=10)),
                ('edit_org_answer', models.TextField()),
                ('edit_org_comments', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='MySurvey3',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('find_org_difficulty', models.CharField(choices=[('Very Easy', 'Very Easy'), ('Easy', 'Easy'), ('Moderate', 'Moderate'), ('Hard', 'Hard'), ('Very Hard', 'Very Hard')], max_length=10)),
                ('find_org_answer', models.TextField()),
                ('find_org_comments', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='MySurvey4',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('add_folder_file_difficulty', models.CharField(choices=[('Very Easy', 'Very Easy'), ('Easy', 'Easy'), ('Moderate', 'Moderate'), ('Hard', 'Hard'), ('Very Hard', 'Very Hard')], max_length=10)),
                ('add_folder_file_answer', models.TextField()),
                ('add_folder_file_comments', models.TextField(blank=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='mysurvey',
            name='add_folder_file_answer',
        ),
        migrations.RemoveField(
            model_name='mysurvey',
            name='add_folder_file_comments',
        ),
        migrations.RemoveField(
            model_name='mysurvey',
            name='add_folder_file_difficulty',
        ),
        migrations.RemoveField(
            model_name='mysurvey',
            name='edit_org_answer',
        ),
        migrations.RemoveField(
            model_name='mysurvey',
            name='edit_org_comments',
        ),
        migrations.RemoveField(
            model_name='mysurvey',
            name='edit_org_difficulty',
        ),
        migrations.RemoveField(
            model_name='mysurvey',
            name='find_org_answer',
        ),
        migrations.RemoveField(
            model_name='mysurvey',
            name='find_org_comments',
        ),
        migrations.RemoveField(
            model_name='mysurvey',
            name='find_org_difficulty',
        ),
        migrations.AlterField(
            model_name='mysurvey',
            name='add_org_answer',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='mysurvey',
            name='add_org_comments',
            field=models.TextField(blank=True),
        ),
    ]
