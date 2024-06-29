from django.db import models
from django.conf import settings


class Address(models.Model):
    street = models.CharField()
    number = models.IntegerField()
    postalCode = models.IntegerField()
    cityDistrict = models.CharField()


class IotDevice(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    typeOfDevice = models.CharField(max_length=100)
    deviceName = models.CharField(max_length=100)
    deviceURI = models.CharField(max_length=100)
    deviceDescription = models.TextField()
    deviceStatus = models.BooleanField(default=False)
    deviceOwner = models.ForeignKey(settings.AUTH_USER_MODEL,
                                    on_delete=models.CASCADE)
    deviceImage = models.ImageField(upload_to="images/", blank=True, null=True)


class MediaCategory(models.Model):
    """ """

    name = models.CharField(max_length=100)
    description = models.CharField(max_length=155)
    type = models.CharField(choices={
        "Democracy Display": "Democracy Display",
        "Democracy Poster": "Democracy Poster",
    }, )
    image = models.ImageField(blank=True, null=True)

    adress = models.ForeignKey(Address, on_delete=models.CASCADE)

    createdBy = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  on_delete=models.CASCADE)
    creationDateTime = models.DateTimeField()

    suggested = models.BooleanField(default=False)
    published = models.BooleanField(default=False)
