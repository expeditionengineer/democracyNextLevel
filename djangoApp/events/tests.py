from django.test import TestCase, Client
# from django.contrib.auth.models import User

from .models import Event

class TestEventApp(TestCase):
    # def setUp(self):
    #     self.client1 = Client()
    #     self.user1 = User.objects.create_user(username='user1', password='password1')
    #     self.client1.login(username='user1', password='password1')
    #     self.event1 = Event.objects.create(title='Event 1', createdBy=self.user1)
    #
    #     self.client2 = Client()
    #     self.user2 = User.objects.create_user(username='user2', password='password2')
    #     self.client2.login(username='user2', password='password2')
    #     self.event2 = Event.objects.create(title='Event 2', createdBy=self.user2)
    #
    # def test_if_permission_for_events_work(self):
    #     # Try to edit event1 with user2 and assert it fails
    #     response = self.client2.post(f'/admin/events/event/{self.event1.id}/change/', {
    #         'title': 'New Title',
    #     })
    #     self.assertEqual(response.status_code, 403)
    #
    #     # Try to delete event1 with user2 and assert it fails
    #     response = self.client2.post(f'/admin/events/event/{self.event1.id}/delete/', {})
    #     self.assertEqual(response.status_code, 403)
    #
    #     # Try to edit event2 with user1 and assert it fails
    #     response = self.client1.post(f'/admin/events/event/{self.event2.id}/change/', {
    #         'title': 'New Title',
    #     })
    #     self.assertEqual(response.status_code, 403)
    #
    #     # Try to delete event2 with user1 and assert it fails
    #     response = self.client1.post(f'/admin/events/event/{self.event2.id}/delete/', {})
    #     self.assertEqual(response.status_code, 403)
    #
    def test_is_show_image_boolean_present(self):
        """Check if the `showImage`-switch is present

        """
        self.assertTrue(hasattr(Event, "showOnlyImage"))
