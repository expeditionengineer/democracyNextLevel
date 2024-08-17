import json
import io

from django.test import TestCase, Client
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image

from .models import *

class TestRegistrationEndpoint(TestCase):
    """Test the registration-endpoint:
     - all relevant data from post request should be written into
     the corrsponding ORM-field

    """

    def testRegistration(self):
        """

        """
        creatorRole = Role.objects.create(role="Creator")
        self.client = Client()
        
        contentCategory1 = ContentCategory.objects.create(name="Neuigkeiten")
        contentCategory2 = ContentCategory.objects.create(name="Veranstaltungen")

        mediaCategory1 = MediaCategory.objects.create(name="Displays")
        mediaCategory2 = MediaCategory.objects.create(name="Aufsteller")
        
        interest1 = AreaOfInterest.objects.create(name="Displays")
        interest2 = AreaOfInterest.objects.create(name="Aufsteller")

        

        data = {
            "username": "NeuerUser",
            "password1": "meinSuperPassword",
            "password2": "meinSuperPassword",
            "password": "meinSuperPassword",
            "roles": [creatorRole.id],
            "first_name": "Tobias",
            "last_name": "Müller",
            "street": "Müller Str.",
            "street_number": "12a",
            "zip_code": "12345",
            "city": "Berlin",
            "phone_number": "12345667",
            "description": "Eine Beschreibung über mich",
            "profile_picture": self.generate_mock_image(),
            "country": "Germany",
            
            "content_categories": [contentCategory1.id, contentCategory2.id],
            "media_categories": [mediaCategory1.id, mediaCategory2.id],
            "area_of_interest": [interest1.id, interest2.id],
        }

        response = self.client.post(
            "/dj-rest-auth/registration/", 
            data=data, 
            format='multipart'  # Use multipart format for file uploads
        )
        self.assertEqual(response.status_code, 204)
        newUser = User.objects.filter(username="NeuerUser")
        self.assertEqual(len(newUser), 1)
        self.assertEqual(newUser[0].street, data["street"])
        self.assertEqual(newUser[0].first_name, data["first_name"])
        self.assertEqual(newUser[0].last_name, data["last_name"])

        self.assertEqual(len(newUser[0].roles.all()), 1)
        self.assertEqual(newUser[0].roles.all()[0].role, "Creator")
    
        self.assertEqual(newUser[0].phone_number, data["phone_number"])
        self.assertEqual(len(newUser[0].area_of_interest.all()), 2)
        self.assertEqual(len(newUser[0].content_categories.all()), 2)
        self.assertEqual(len(newUser[0].media_categories.all()), 2)




    def generate_mock_image(self, name='test_image.jpg', size=(100, 100), color=(255, 0, 0)):
        """
        Generates a simple image in memory for testing.
        :param name: Name of the image file
        :param size: Size of the image (width, height)
        :param color: RGB color of the image
        :return: SimpleUploadedFile object
        """
        # Create an image using PIL
        image = Image.new("RGB", size, color)

        # Save the image to a BytesIO object
        image_io = io.BytesIO()
        image.save(image_io, format='JPEG')
        image_io.seek(0)  # Seek to the beginning of the file

        # Create a SimpleUploadedFile
        return SimpleUploadedFile(name, image_io.read(), content_type='image/jpeg')
