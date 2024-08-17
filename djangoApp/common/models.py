from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField


class Agent(models.Model):
    """Track AI Agents"""

    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class ContentCategory(models.Model):
    """ """

    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class MediaCategory(models.Model):
    """ """

    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class AreaOfInterest(models.Model):
    """Contain all areas of interest from which can be selected."""

    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class Role(models.Model):
    """

    """
    role = models.CharField(max_length=200, blank=True, null=True)


class User(AbstractUser):
    """Modification of the Django default user model."""

    # General info about the user: address and contact info
    street = models.CharField(max_length=300, blank=True, null=True)
    street_number = models.CharField(max_length=20, blank=True, null=True)
    zip_code = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(blank=True, null=True)
    description = models.CharField(max_length=155)
    country = models.CharField(max_length=200, blank=True, null=True)
    # only relevant for creator, voter, moderator
    content_categories = models.ManyToManyField(ContentCategory,
                                                blank=True,
                                                null=True)
    # only relevant for messanger, voter, moderator
    media_categories = models.ManyToManyField(MediaCategory,
                                              blank=True,
                                              null=True)

    area_of_interest = models.ManyToManyField(AreaOfInterest,
                                              blank=True,
                                              null=True)
    ai_agent = models.ManyToManyField(Agent, blank=True, null=True)
    roles = models.ManyToManyField(Role, blank=True, null=True)
