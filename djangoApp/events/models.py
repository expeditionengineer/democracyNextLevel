from django.db import models

# Create your models here.

class Event(models.model):
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


