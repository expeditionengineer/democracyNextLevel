# Generated by Django 5.1.1 on 2024-10-10 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='proposal',
            name='tag',
            field=models.ManyToManyField(blank=True, null=True, to='content.tag'),
        ),
    ]
