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



class DebateCardsView(APIView):
    """

    """
    def get(self, request):
        """

        """
        if not request.user.is_authenticated:
            return HttpResponse(status=403)


        userIsVoter = False
            
        for role in request.user.roles.all():
            if role.role == "Voter":
                userIsVoter = True

        allDebateCars = DebateCard.objects.all()
        debateCardSerializer = DebateCardSerializer(allDebateCars, many=True)

        return Response(debateCardSerializer.data)

    def post(self, request):
        """

        """

        if not request.user.is_authenticated:
            return HttpResponse(status=403)


        userIsVoter = False
            
        for role in request.user.roles.all():
            if role.role == "Voter":
                userIsVoter = True

        if not userIsVoter:
            return HttpResponse(status=403)
        
        obj, create = DebateCard.objects.get_or_create(
            title=request.data["title"],
            description=request.data["description"],
            createdBy=request.user,
            category=int(request.data["category"]),
        )
        
        if not create:
            return HttpResponse(status=200)

        if request.data["linkedCard"] is not None: 
            linkedDebateCardObj = DebateCard.objects.get(id=int(request.data["linkedCard"]))
            obj.debateCardLinks.add(linkedDebateCardObj)
           
        linkedContentObj = News.objects.get(id=int(request.data["contentLinks"]))
        obj.contentLinks.add(linkedContentObj)
        obj.save()

        return HttpResponse(status=200)

class DebatePointsView(APIView):
    """

    """
    def post(self, request):
        """Is executed when a POST-request is sent to `/debate-points`-endpoint.

        """
        if not request.user.is_authenticated:
            return HttpResponse(status=403)


        userIsVoter = False
            
        for role in request.user.roles.all():
            if role.role == "Voter":
                userIsVoter = True

        if not userIsVoter:
            return HttpResponse(status=403)
        
        typeOfDebatePoint = int(request.data["type"])
        
        # get max number of points user can have for debate point type:
        

        # check if the user has not used all their Points for that category yet:
        

        debateCardObj = DebateCard.objects.get(id=int(request.data["cardId"]))

        DebatePoint.objects.get_or_create(
            card=debateCardObj,

        )

