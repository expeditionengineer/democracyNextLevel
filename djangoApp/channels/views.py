from datetime import datetime

from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import AnonymousUser
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.parsers import MultiPartParser, FormParser

from channels.serializers import NewsSerializer, DebateCardSerializer, DebatePointSerializer
from .models import News, DebateCard, DebatePoint
from common.models import Setting

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
        
        mapping_numbers_to_orm_obj = {
            1: "voter_debate_points_proposal",
            2: "voter_debate_points_fact",
            3: "voter_debate_points_pro_arg",
            4: "voter_debate_points_con_arg",
            5: "voter_debate_points_question",
            6: "voter_debate_points_improvment",
            7: "voter_debate_points_comp_proposal",
    }

        # get max number of points user can have for debate point type:
        maxNbrOfPointsPerCard = getattr(Setting.objects.all()[0], mapping_numbers_to_orm_obj[typeOfDebatePoint])


        debateCardObj = DebateCard.objects.get(id=int(request.data["cardId"]))

        # check if the user has not used all their Points for that category yet:
        nbrDebatePointsForCardAndUser = DebatePoint.objects.filter(card=debateCardObj, voter=request.user, type=typeOfDebatePoint).count()        
        nbrPointsOfOneTypeUser = DebatePoint.objects.filter(voter=request.user, type=typeOfDebatePoint).count()
        if nbrDebatePointsForCardAndUser >= maxNbrOfPointsPerCard or nbrPointsOfOneTypeUser >= maxNbrOfPointsPerCard:
            return HttpResponse(status=405)


        debatePointNewObj, created = DebatePoint.objects.get_or_create(
            card=debateCardObj,
            type=typeOfDebatePoint,
            voter=request.user,
            date=datetime.now(),
        )

        serializer = DebatePointSerializer(debatePointNewObj)
        return Response(serializer.data)

    def delete(self, request):
        """Delete the debate point, whose id comes in the body.

        """
        if not request.user.is_authenticated:
            return HttpResponse(status=403)


        userIsVoter = False

        for role in request.user.roles.all():
            if role.role == "Voter":
                userIsVoter = True

        if not userIsVoter:
            return HttpResponse(status=403)

        debatePointObj = DebatePoint.objects.get(id=int(request.data["id"]))

        if debatePointObj.voter == request.user:
            debatePointObj.delete()
            return Response(status=200)
        
        return Reponse(status=403)

class DebatePointForCard(APIView):
    """

    """
    def get(self, request, cardId):
        """if the user is a voter, the 

        """
        if not request.user.is_authenticated:
            return HttpResponse(status=403)


        userIsVoter = False

        for role in request.user.roles.all():
            if role.role == "Voter":
                userIsVoter = True

        if not userIsVoter:
            return HttpResponse(status=403)

        pointsForUserAndCard = DebatePoint.objects.filter(card=int(cardId))
        serializer = DebatePointSerializer(pointsForUserAndCard, many=True)
        
        # categorize DebatePoints in authorized 'User' and rest:
        responseDict = {}
        responseDict["User"] = []
        responseDict[""] = []
        for serializedObj in serializer.data:
            if serializedObj["voter"] == request.user.id:
                responseDict["User"].append(serializedObj)
            else:
                responseDict[""].append(serializedObj)

        return Response(responseDict)
