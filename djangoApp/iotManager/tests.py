from django.test import TestCase
from django.urls import reverse


class IotDeviceView(TestCase):

    def test_get_iotdevices(self):
        response = self.client.get(reverse("iotdevices"))
        self.assertEqual(response.status_code, 200)
