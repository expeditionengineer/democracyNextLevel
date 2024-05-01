from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class CustomRegisterSerializer(RegisterSerializer):
    group = serializers.ChoiceField(
        [
            'creator', 
            'messenger', 
            'voter',
            "user",
        ]
    )

    def custom_signup(self, request, user):
        user.role = self.validated_data.get('role', '')
        user.save(update_fields=['role'])