# Generated by Django 5.0.6 on 2024-06-29 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('likingDate', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('heading', models.CharField(max_length=70)),
                ('text', models.CharField(max_length=155)),
                ('approvedByModerator', models.BooleanField(default=False)),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('creationDateTime', models.DateTimeField()),
                ('suggested', models.BooleanField(default=False)),
                ('published', models.BooleanField(default=False)),
                ('link', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('startDate', models.DateTimeField()),
                ('endDate', models.DateTimeField()),
                ('description', models.TextField()),
                ('creationDateTime', models.DateTimeField()),
                ('suggested', models.BooleanField(default=False)),
                ('published', models.BooleanField(default=False)),
                ('link', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Stakeholder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('telefon', models.CharField(blank=True, max_length=200, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('creationDateTime', models.DateTimeField()),
                ('suggested', models.BooleanField(default=False)),
                ('published', models.BooleanField(default=False)),
                ('link', models.CharField(max_length=200)),
            ],
        ),
    ]
