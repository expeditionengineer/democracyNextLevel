# Generated by Django 5.1 on 2024-08-17 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='street_number',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
