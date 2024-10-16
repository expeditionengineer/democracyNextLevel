# Generated by Django 5.0.6 on 2024-07-15 18:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField()),
                ('number', models.IntegerField()),
                ('postalCode', models.IntegerField()),
                ('cityDistrict', models.CharField()),
            ],
        ),
        migrations.CreateModel(
            name='IotDevice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('typeOfDevice', models.CharField(max_length=100)),
                ('deviceName', models.CharField(max_length=100)),
                ('deviceURI', models.CharField(max_length=100)),
                ('deviceDescription', models.TextField()),
                ('deviceStatus', models.BooleanField(default=False)),
                ('deviceImage', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('deviceOwner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MediaCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=155)),
                ('type', models.CharField(choices=[('Democracy Display', 'Democracy Display'), ('Democracy Poster', 'Democracy Poster')])),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('creationDateTime', models.DateTimeField()),
                ('suggested', models.BooleanField(default=False)),
                ('published', models.BooleanField(default=False)),
                ('adress', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='iotManager.address')),
                ('createdBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
