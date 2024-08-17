from django.test import TestCase
from django.urls import reverse
from django.db.models import ManyToManyField
from rest_framework.test import APITestCase

from .models import * 
class AreaOfInterestAPITestCase(APITestCase):

    def setUp(self):
        self.url = reverse('areaOfInterest')
        AreaOfInterest.objects.get_or_create(name="Programmierung")
        AreaOfInterest.objects.get_or_create(name="Freizeit")


    def test_get_request(self):
        """test if the get request works as expected.

        """

        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 2)

class ContentCategoryAPITestCase(APITestCase):

    def setUp(self):
        self.url = reverse('contentCategory')
        ContentCategory.objects.get_or_create(name="Programmierung")
        ContentCategory.objects.get_or_create(name="Freizeit")


    def test_get_request(self):
        """test if the get request works as expected.

        """

        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 2)

class MediaCategoryAPITestCase(APITestCase):

    def setUp(self):
        self.url = reverse('mediaCategory')
        MediaCategory.objects.get_or_create(name="Programmierung")
        MediaCategory.objects.get_or_create(name="Freizeit")


    def test_get_request(self):
        """test if the get request works as expected.

        """

        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 2)

class RolesAPITestCase(APITestCase):
    def setUp(self):
        self.url = reverse('roles')
        Role.objects.get_or_create(role="Creator")
        Role.objects.get_or_create(role="Workshop-Teilnehmer")


    def test_get_request(self):
        """test if the get request works as expected.

        """

        response = self.client.get(self.url)
        self.assertEqual(len(response.data), 2)


class TestUserModel(TestCase):
    """

    """
    def testUserModelHasRolesAttr(self):
        """

        """
        self.assertTrue(hasattr(User, "roles"))
        self.assertTrue(
            isinstance(
                User._meta.get_field("roles"),
                ManyToManyField,
            )
        )
