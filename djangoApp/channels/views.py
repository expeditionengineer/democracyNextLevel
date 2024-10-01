from django.shortcuts import render
from rest_framework.views import APIView

from channels.serializers import NewsSerializer

class NewsView(APIView):
    """

    """
    def post(self, request):
        """
        
        """
        
        userIsCreator = False
            
        for role in request.user.roles.all():
            if role == "Creator":
                userIsCreator = True

        newsSerializerObj = NewsSerializer(data=request.data)
        if request.user.is_authenticated and userIsCreator == True:
            if newsSerializerObj.is_valid():
                newsSerializerObj.save()
                return HttpResponse(status=200)
        return HttpResponse(status=500)
        
