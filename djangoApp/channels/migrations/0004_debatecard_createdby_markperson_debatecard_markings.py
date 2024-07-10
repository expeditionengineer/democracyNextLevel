# Generated by Django 5.0.6 on 2024-07-06 14:10

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('channels', '0003_remove_news_likes_remove_stakeholder_likes_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='debatecard',
            name='createdBy',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='MarkPerson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('markedPerson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='marked_set', to=settings.AUTH_USER_MODEL)),
                ('markingPerson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='marking_set', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='debatecard',
            name='markings',
            field=models.ManyToManyField(blank=True, null=True, to='channels.markperson'),
        ),
    ]
