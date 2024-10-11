from datetime import datetime

from django.db import models
from django.conf import settings

from content.models import Tag

class Location(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    city = models.CharField(max_length=200, blank=True, null=True)
    country = models.CharField(max_length=200, blank=True, null=True)
    postalCode = models.CharField(max_length=200, blank=True, null=True)


class Organizer(models.Model):
    name = models.CharField(max_length=200)
    telefon = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)


class Event(models.Model):
    """Django-Model-class for the Event-ORM"""

    title = models.CharField(max_length=200)
    description = models.TextField()
    startDate = models.DateTimeField(default=datetime.now,
                                     blank=True,
                                     null=True)
    endDate = models.DateTimeField(default=datetime.now, blank=True, null=True)
    
    location = models.ForeignKey(Location,
                                 on_delete=models.CASCADE,
                                 blank=True,
                                 null=True)
    link = models.TextField(blank=True, null=True)
    organizer = models.ManyToManyField(Organizer, blank=True, null=True)

    repeated = models.BooleanField(default=False)

    colorScheme = models.CharField(max_length=7, default="#007bff")

    image = models.ImageField(upload_to="events/images/",
                              blank=True,
                              null=True)
    qrCode = models.ImageField(upload_to="events/qrcodes/",
                               blank=True,
                               null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    createdBy = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  on_delete=models.CASCADE)

    updatedAt = models.DateTimeField(auto_now=True)

    tag = models.ManyToManyField(Tag, blank=True, null=True)

    published = models.IntegerField(default=False)

    showOnlyImage = models.BooleanField(default=False)


    def __str__(self):
        return self.title
