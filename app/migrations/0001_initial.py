# Generated by Django 2.2.18 on 2021-03-01 01:54

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('group', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='auth.Group')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='bg_info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=50)),
                ('lastname', models.CharField(max_length=50)),
                ('middle_initial', models.CharField(max_length=3)),
                ('phone_number', models.CharField(max_length=10)),
                ('birthday', models.DateField()),
                ('email', models.EmailField(max_length=254)),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other'), ('Prefer not to say', 'Prefer Not To Say')], max_length=20)),
                ('insurance_provider', models.CharField(default='Provider', max_length=100)),
                ('insurance_member_id', models.CharField(default='0000000', max_length=25)),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('firstname', 'lastname', 'middle_initial', 'email')},
            },
        ),
        migrations.CreateModel(
            name='patient_notes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notes', models.CharField(max_length=10000)),
                ('background', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.bg_info')),
            ],
            options={
                'unique_together': {('background', 'notes')},
            },
        ),
        migrations.CreateModel(
            name='ec_info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('phone_number', models.CharField(max_length=10)),
                ('relationship', models.CharField(max_length=20)),
                ('primary_care_physician', models.CharField(max_length=50)),
                ('physician_phone', models.CharField(max_length=10)),
                ('background', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.bg_info')),
            ],
            options={
                'unique_together': {('background', 'name')},
            },
        ),
        migrations.CreateModel(
            name='demo_info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street_address', models.CharField(max_length=100)),
                ('apt_unit', models.CharField(max_length=10)),
                ('city', models.CharField(max_length=25)),
                ('zipcode', models.CharField(max_length=5)),
                ('county', models.CharField(choices=[('Worcester', 'Worcester'), ('Wicomico', 'Wicomico'), ('Somerset', 'Somerset'), ('Dorchester', 'Dorchester')], max_length=10)),
                ('state', models.CharField(choices=[('MD', 'Maryland')], max_length=20)),
                ('ethnicity', models.CharField(choices=[('Hispanic or Latino', 'Hispanic or Latino'), ('Not Hispanic or Latino', 'Not Hispanic or Latino'), ('No Response', 'No Response')], max_length=25)),
                ('race', models.CharField(choices=[('American Indian or Alask Native', 'American Indian or Alaska Native'), ('Asian', 'Asian'), ('Black or African American', 'Black or African American'), ('Native Hawaiin or Other Pacific Islander', 'Native Hawaiin or Other Pacific Islander'), ('White', 'White'), ('Two or More Races', 'Two or More Races'), ('No Response', 'No Response')], max_length=50)),
                ('background', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.bg_info')),
            ],
            options={
                'unique_together': {('background', 'zipcode', 'street_address')},
            },
        ),
    ]
