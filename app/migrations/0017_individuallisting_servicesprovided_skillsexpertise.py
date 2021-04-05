# Generated by Django 2.2.18 on 2021-03-21 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0016_auto_20210320_1646'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServicesProvided',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='SkillsExpertise',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='IndividualListing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('phone_number', models.CharField(max_length=10)),
                ('email', models.EmailField(max_length=60)),
                ('address', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=25)),
                ('state', models.CharField(max_length=20)),
                ('zipcode', models.CharField(max_length=10)),
                ('description', models.CharField(max_length=500)),
                ('services_provided', models.ManyToManyField(blank=True, related_name='servicesprovided', to='app.ServicesProvided')),
                ('skills_expertise', models.ManyToManyField(blank=True, related_name='skillsexpertise', to='app.SkillsExpertise')),
            ],
            options={
                'unique_together': {('first_name', 'last_name', 'email')},
            },
        ),
    ]
