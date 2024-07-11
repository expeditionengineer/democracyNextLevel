from django.shortcuts import render
from rest_framework import generics

from .models import IotDevice
from events.models import Event
from .serializers import IotDeviceSerializer
from .scraper_json import WebScraper

class IotDeviceAPI(generics.ListAPIView):
    serializer_class = IotDeviceSerializer

    def get_queryset(self):
        """Return all iotDevice-objects"""

        return IotDevice.objects.all()

def execute_scraper(request):
    """

    """
    mierendorfinsel_scraper = WebScraper("https://mierendorffinsel.org/wp-json/tribe/events/v1/events/")
    mierendorfinsel_scraper.run()

    scraped_events = mierendorfinsel_scraper.events

    for event in scraped_events:
       Event.objects.get_or_create(
            title=event["Name"],
            description=event["Beschreibung"],
            startDate=event[""] 
                
        ) 
