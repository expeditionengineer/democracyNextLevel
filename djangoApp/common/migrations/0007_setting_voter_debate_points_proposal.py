# Generated by Django 5.1.1 on 2024-10-07 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0006_rename_voter_debate_points_agree_setting_voter_debate_points_comp_proposal_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='setting',
            name='voter_debate_points_proposal',
            field=models.IntegerField(default=0),
        ),
    ]
