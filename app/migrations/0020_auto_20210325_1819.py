# Generated by Django 2.2.18 on 2021-03-25 22:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0019_newcaseworkers_newclientlist_newclients'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='newclientlist',
            name='casewrkr',
        ),
        migrations.RemoveField(
            model_name='newclientlist',
            name='clnts',
        ),
        migrations.RemoveField(
            model_name='newclients',
            name='newclient',
        ),
        migrations.DeleteModel(
            name='NewCaseworkers',
        ),
        migrations.DeleteModel(
            name='NewClientList',
        ),
        migrations.DeleteModel(
            name='NewClients',
        ),
    ]