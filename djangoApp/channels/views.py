from datetime import datetime

from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import AnonymousUser
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser

from channels.serializers import NewsSerializer, DebateCardSerializer
from .models import News, DebateCard

class NewsView(APIView):
    """

    """
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        """
        
        """
        
        if not request.user.is_authenticated:
            return HttpResponse(status=403)


        userIsCreator = False
            
        for role in request.user.roles.all():
            if role.role == "Creator":
                userIsCreator = True
        
        dataFromRequest = request.data.dict()
        dataFromRequest["creationDateTime"] = datetime.now()
        dataFromRequest["createdBy"] = request.user.id

        newsSerializerObj = NewsSerializer(data=dataFromRequest)
        if userIsCreator == True:
            if newsSerializerObj.is_valid():
                newsSerializerObj.save()
                return HttpResponse(status=200)
        return HttpResponse(status=500)
       
    def get(self, request):
        """

        """
        newsObjs = News.objects.filter(approvedByModerator=True)

        serializer = NewsSerializer(newsObjs, many=True)

        return Response(serializer.data)

class DebateCardNewsView(APIView):
    """

    """
    def get(self, request, id):
        """

        """

        # get the newsObj for the specified newsId 
        newsObj = News.objects.get(id=id)
        debateCardsForNewsObj = DebateCard.objects.filter(contentLinks=newsObj)
        
        debateCardSerializer = DebateCardSerializer(debateCardsForNewsObj, many=True)

        return Response(debateCardSerializer.data)
