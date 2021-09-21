# Generated by Django 3.1.7 on 2021-06-26 15:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0028_auto_20210509_1727'),
    ]

    operations = [
        migrations.AddField(
            model_name='messages',
            name='is_file',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='messages',
            name='is_link',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='offlinemessage',
            name='chat_group',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.chatgroup'),
        ),
    ]