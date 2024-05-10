from django.db import models
from django.contrib.gis.db import models


class IotDevice(models.Model):
    geoCoordinates = models.PointField()
