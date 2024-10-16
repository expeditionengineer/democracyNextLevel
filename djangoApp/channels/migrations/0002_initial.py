# Generated by Django 5.0.6 on 2024-07-15 18:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('channels', '0001_initial'),
        ('events', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='debatecard',
            name='createdBy',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='debatecard',
            name='debateCardLinks',
            field=models.ManyToManyField(blank=True, null=True, to='channels.debatecard'),
        ),
        migrations.AddField(
            model_name='debatepoint',
            name='voter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='markperson',
            name='markedPerson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='marked_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='markperson',
            name='markingPerson',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='marking_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='debatecard',
            name='markings',
            field=models.ManyToManyField(blank=True, null=True, to='channels.markperson'),
        ),
        migrations.AddField(
            model_name='news',
            name='createdBy',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='news',
            name='tag',
            field=models.ManyToManyField(blank=True, null=True, to='events.tag'),
        ),
        migrations.AddField(
            model_name='debatecard',
            name='contentLinks',
            field=models.ManyToManyField(blank=True, null=True, to='channels.news'),
        ),
        migrations.AddField(
            model_name='project',
            name='createdBy',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='project',
            name='tag',
            field=models.ManyToManyField(blank=True, null=True, to='events.tag'),
        ),
        migrations.AddField(
            model_name='stakeholder',
            name='createdBy',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='stakeholder',
            name='tag',
            field=models.ManyToManyField(blank=True, null=True, to='events.tag'),
        ),
    ]
