from django.db import models
from django.conf import settings

from events.models import Tag

# class Channel:
# when channel is created a QR-code should be generated,
# which links to the medium-product on the website.

# all channel instances can have at most one link


class Like(models.Model):
    """ """

    likingDate = models.DateTimeField()
    voter = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)

    def __str__(self):
        return self.voter.username


class News(models.Model):
    """ """

    heading = models.CharField(max_length=70)
    text = models.CharField(max_length=155)
    approvedByModerator = models.BooleanField(default=False)
    likes = models.ManyToManyField(Like, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)

    # these attributes can maybe be moved in a parent class
    createdBy = models.ForeignKey(settings.AUTH_USER_MODEL,
                                  on_delete=models.CASCADE)
    creationDateTime = models.DateTimeField()
    suggested = models.BooleanField(default=False)
    published = models.BooleanField(default=False)
    tag = models.ManyToManyField(Tag, blank=True, null=True)

    link = models.CharField(max_length=200)


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

    likes = models.ManyToManyField(Like, blank=True, null=True)
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

    likes = models.ManyToManyField(Like, blank=True, null=True)
    tag = models.ManyToManyField(Tag, blank=True, null=True)

    link = models.CharField(max_length=200)
