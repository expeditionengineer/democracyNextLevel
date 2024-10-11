from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, authenticate

from .models import * 

class AreaOfInterstSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaOfInterest
        fields = "__all__"

class ContentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentCategory
        fields = "__all__"


class MediaCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaCategory 
        fields = "__all__"

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role 
        fields = "__all__"

class AgentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent 
        fields = "__all__"

class CustomLoginSerializer(LoginSerializer):
    def validate(self, attrs):
        # Call the parent's validate method to handle login logic
        data = super().validate(attrs)
        
        user = authenticate(self.context["request"], username=attrs["username"], password=attrs["password"])
        if user is not None:
            login(self.context["request"], user)
        token = Token.objects.get_or_create(user=user)
        # Include additional data in the response if needed
        data['token'] = token
        
        
        return data
