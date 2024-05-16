from django.shortcuts import render
from rest_framework import generics

from .models import IotDevice
from .serializers import IotDeviceSerializer


class IotDeviceAPI(generics.ListAPIView):
    serializer_class = IotDeviceSerializer

    def get_queryset(self):
        """Return all iotDevice-objects"""

        return IotDevice.objects.all()
