# Generated by Django 5.1 on 2024-08-18 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0003_role_user_country_user_roles'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='motivation',
            field=models.TextField(blank=True, null=True),
        ),
    ]
