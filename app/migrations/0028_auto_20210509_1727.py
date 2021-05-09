# Generated by Django 3.1.7 on 2021-05-09 21:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0027_auto_20210416_1537'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='messages',
            name='to_user',
        ),
        migrations.AddField(
            model_name='account',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pics'),
        ),
        migrations.AddField(
            model_name='account',
            name='bgColor',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='messages',
            name='from_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='messages_sent', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='UploadedFile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ChatGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group_name', models.CharField(max_length=100, null=True, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
                ('members', models.ManyToManyField(related_name='all_group_members', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='messages',
            name='chat_group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.chatgroup'),
        ),
    ]
