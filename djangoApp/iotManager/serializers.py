from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import IotDevice


class IotDeviceSerializer(serializers.ModelSerializer):

    class Meta:
        model = IotDevice
        fields = "__all__"
