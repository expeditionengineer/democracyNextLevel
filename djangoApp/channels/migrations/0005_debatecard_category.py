# Generated by Django 5.0.6 on 2024-07-06 14:21

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('channels', '0004_debatecard_createdby_markperson_debatecard_markings'),
    ]

    operations = [
        migrations.AddField(
            model_name='debatecard',
            name='category',
            field=models.IntegerField(default=1, validators=[django.core.validators.MaxValueValidator(5), django.core.validators.MinValueValidator(1)]),
        ),
    ]
