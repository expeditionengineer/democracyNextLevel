from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Event(models.Model):
    """ Django-Model-class for the Event-ORM

    """

    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200)

    repeated = models.BooleanField(default=False)

    colorScheme = models.CharField(max_length=7, default='#007bff')

    image = models.ImageField(upload_to='events/images/')
    qrCode = models.ImageField(upload_to='events/qrcodes/')
    createdAt = models.DateTimeField(auto_now_add=True)
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE)

    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


