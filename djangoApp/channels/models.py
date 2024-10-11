from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

from events.models import Tag
from .manager import DebateManager


class DebatePoint(models.Model):
    """ """
    objects = DebateManager()

    date = models.DateTimeField()
    voter = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    card = models.ForeignKey("DebateCard", on_delete=models.CASCADE, blank=True, null=True)
    type = models.IntegerField(
        validators=[MaxValueValidator(5), MinValueValidator(1)],
        default=1,
    )
    point = models.IntegerField(
        validators=[MaxValueValidator(1), MinValueValidator(-1)],
        default=0,
    ) 

    def __str__(self):
        return self.voter.username

class MarkPerson(models.Model):
    """

    """
    markingPerson = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='marking_set',
        on_delete=models.CASCADE
    )
    markedPerson = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='marked_set',
        on_delete=models.CASCADE
    )

class DebateCard(models.Model):
    """
    
    """
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=1500)
    image = models.ImageField(blank=True, null=True)
    debateCardLinks = models.ManyToManyField('self', blank=True, null=True)
    contentLinks = models.ManyToManyField('News', blank=True, null=True)
    createdBy = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE, null=True, blank=True)
    markings = models.ManyToManyField('MarkPerson', blank=True, null=True)    
    category = models.IntegerField(
        validators=[MaxValueValidator(5), MinValueValidator(1)],
        default=1,
    )

class News(models.Model):
    """ """

    heading = models.CharField(max_length=70)
    text = models.CharField(max_length=155)
    approvedByModerator = models.BooleanField(default=False)
    image = models.ImageField(blank=True, null=True, upload_to='images/')

    # these attributes can maybe be moved in a parent class
    createdBy = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  on_delete=models.CASCADE)
    creationDateTime = models.DateTimeField()
    suggested = models.BooleanField(default=False)
    published = models.BooleanField(default=False)
    tag = models.ManyToManyField(Tag, blank=True, null=True)

    link = models.CharField(max_length=200, blank=True, null=True)


class Project(models.Model):
    """This class acts as the ORM-abstraction class to the Project-postgres table."""

    name = models.CharField(max_length=200)
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    description = models.TextField()

    # these attributes can maybe be moved in a parent class
    createdBy = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  on_delete=models.CASCADE)
    creationDateTime = models.DateTimeField()
    suggested = models.BooleanField(default=False)
    published = models.BooleanField(default=False)

    tag = models.ManyToManyField(Tag, blank=True, null=True)

    link = models.CharField(max_length=200)


class Stakeholder(models.Model):
    """ """

    name = models.CharField(max_length=200)
    telefon = models.CharField(max_length=200, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    # these attributes can maybe be moved in a parent class
    createdBy = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  on_delete=models.CASCADE)
    creationDateTime = models.DateTimeField()
    suggested = models.BooleanField(default=False)
    published = models.BooleanField(default=False)

    tag = models.ManyToManyField(Tag, blank=True, null=True)

    link = models.CharField(max_length=200)
