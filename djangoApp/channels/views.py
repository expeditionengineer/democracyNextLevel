from datetime import datetime

from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import AnonymousUser
from rest_framework.response import Response
from django.http import HttpResponse

from channels.serializers import NewsSerializer
from .models import News

class NewsView(APIView):
    """

    """
    def post(self, request):
        """
        
        """
        if not request.user.is_authenticated:
            return HttpResponse(status=403)


        userIsCreator = False
            
        for role in request.user.roles.all():
            if role.role == "Creator":
                userIsCreator = True
        
        request.data["creationDateTime"] = datetime.now()
        request.data["createdBy"] = request.user.id

        newsSerializerObj = NewsSerializer(data=request.data)
        if userIsCreator == True:
            if newsSerializerObj.is_valid():
                newsSerializerObj.save()
                return HttpResponse(status=200)
        return HttpResponse(status=500)
       
    def get(self, request):
        """

        """
        newsObjs = News.objects.all()

        serializer = NewsSerializer(newsObjs, many=True)

        return Response(serializer.data)
