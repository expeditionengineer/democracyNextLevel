from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

from common.models import User

class Proposal(models.Model):
    """This model acts as a superordinated model for the subordinated models
    news, events, etc.

    """
        # This will store the type of content, e.g., News, Event, or Actor
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE)
