from django.shortcuts import render
from rest_framework import generics
from django.http import HttpResponse

from .models import IotDevice
from common.models import User
from events.models import Event, Location
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
        locationObj = Location.objects.get_or_create(
            name=event["Ort"],
            address=event["Adresse"],
            postalCode=event["Postleitzahl"],
            city=event["Stadt"],
        )
        objWithSameLink = Event.objects.filter(link=event["Link"])
        if len(objWithSameLink) > 0:
            objWithSameLink[0].update(
                title=event["Name"],
                description=event["Beschreibung"],
                startDate=event["Beginn"], 
                endDate=event["Ende"],
                link=event["Link"],
                location=locationObj[0],
                createdBy=User.objects.get(username="Scraper"),  
            )
        else:
            obj, created = Event.objects.get_or_create(
                title=event["Name"],
               description=event["Beschreibung"],
                startDate=event["Beginn"], 
                endDate=event["Ende"],
                link=event["Link"],
                location=locationObj[0],
                createdBy=User.objects.get(username="Scraper"),
                published=1,
            )
    return HttpResponse(status=200)
