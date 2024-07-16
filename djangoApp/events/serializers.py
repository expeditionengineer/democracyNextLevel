from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth.models import Group

from .models import Event, Location

class UserSerializer(serializers.Serializer):
    # email = serializers.EmailField()
    username = serializers.CharField(max_length=100)


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    createdBy = UserSerializer()
    location = LocationSerializer()
    class Meta:
        model = Event
        fields = '__all__'


class CustomRegisterSerializer(RegisterSerializer):
    group = serializers.CharField()

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()

        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'group': self.validated_data.get('group', ''),
        }

    def save(self, request):
        user = super().save(request)
        group_name = self.validated_data.get('group')
        print(group_name)
        # breakpoint()
        group = Group.objects.get(name=group_name)
        user.groups.add(group)
        user.save()
        return user
