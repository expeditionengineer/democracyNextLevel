from rest_framework import serializers

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
