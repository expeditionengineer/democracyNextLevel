from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import *
from .models import (
    AreaOfInterest,
    Agent,
    MediaCategory,
    ContentCategory,
)

class ArearOfInterestView(APIView):
    """Class-based view for 

    """

    def get(self, request):
        """View function when get request is sent

        """
        allAreaOfInterestObjs = AreaOfInterest.objects.all()
        serializer = AreaOfInterstSerializer(allAreaOfInterestObjs, many=True)
        return Response(serializer.data) 
        

class ContentCategoryView(APIView):
    def get(self,request):
        """View function when get request is sent

        """
        allContentCategoryObjs = ContentCategory.objects.all()
        serializer = ContentCategorySerializer(allContentCategoryObjs, many=True)
        return Response(serializer.data) 

class MediaCategoryView(APIView):
    def get(self, request):
        """View function when get request is sent

        """
        allMediaCategoryObjs = MediaCategory.objects.all()
        serializer = MediaCategorySerializer(allMediaCategoryObjs, many=True)

        return Response(serializer.data) 

class AgentsView(APIView):
    def get(self,request):
        """View function when get request is sent

        """
        allAgentObjs = Agent.objects.all()
        serializer = AgentsSerializer(allAgentObjs, many=True)

        return Response(serializer.data) 

