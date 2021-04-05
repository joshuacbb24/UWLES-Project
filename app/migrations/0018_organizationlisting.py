# Generated by Django 2.2.18 on 2021-03-21 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0017_individuallisting_servicesprovided_skillsexpertise'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrganizationListing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('org_name', models.CharField(max_length=100, unique=True)),
                ('phone_number', models.CharField(max_length=10)),
                ('email', models.EmailField(max_length=60)),
                ('address', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=25)),
                ('state', models.CharField(max_length=20)),
                ('zipcode', models.CharField(max_length=10)),
                ('description', models.CharField(max_length=500)),
                ('services_provided', models.ManyToManyField(blank=True, related_name='providedservices', to='app.ServicesProvided')),
            ],
        ),
    ]
