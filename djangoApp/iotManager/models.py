from django.db import models


class IotDevice(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    typeOfDevice = models.CharField(max_length=100)
    deviceName = models.CharField(max_length=100)
    deviceURI = models.CharField(max_length=100)
    deviceDescription = models.TextField()
    deviceStatus = models.BooleanField(default=False)
    deviceOwner = models.ForeignKey("auth.User", on_delete=models.CASCADE)
    deviceImage = models.ImageField(upload_to="images/", blank=True, null=True)
