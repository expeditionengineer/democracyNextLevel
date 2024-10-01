from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status

from .serializers import *
from .models import (
    AreaOfInterest,
    Agent,
    MediaCategory,
    ContentCategory,
)
from events.serializers import CustomRegisterSerializer 

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

class RolesView(APIView):
    def get(self,request):
        """View function when get request is sent

        """
        allAgentObjs = Role.objects.all()
        serializer = RolesSerializer(allAgentObjs, many=True)

        return Response(serializer.data)

class UserView(APIView):
    """Return the user data of the currently logged in user.

    """
    def get(self, request):
        """

        """
        if request.user.is_authenticated:
            serializer = CustomRegisterSerializer(request.user)
            return Response(serializer.data) 
        else:
            return Response({"detail": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)
