from rest_framework import serializers

from .models import Tag

# class ContentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Content
#         fields = "__all__"

class TagSerializer(serializers.ModelSerializer):
    """

    """
    class Meta:
        model = Tag
        fields = '__all__'


