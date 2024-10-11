from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.views import APIView

from .models import Tag
from .serializers import TagSerializer

# Create your views here.
# class ContentAPI(APIView):
#     serializer_class = ContentSerializer

#     def get(self, request):
#         allContentObjs = Content.objects.all()
#         serializer = self.serializer_class(allContentObjs, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors)

class ProposalView(APIView):
    """

    """
    def get(self, request):
        """get all proposals

        """
        pass


class TagView(APIView):
    """

    """
    def get(self, request):
        """Send all available tags to the frontend.

        """
        
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
    
        userIsCreator = False
            
        for role in request.user.roles.all():
            if role.role == "Creator":
                userIsCreator = True

        allTagObjects = Tag.objects.all()
        tagSerializer = TagSerializer(allTagObjects, many=True)

        return Response(tagSerializer.data)

    def post(self, request):
        """

        """
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
    
        userIsCreator = False
            
        for role in request.user.roles.all():
            if role.role == "Creator":
                userIsCreator = True

        tagObj, created = Tag.objects.get_or_create(
            name=request.data["name"]
        )

        serializer = TagSerializer(tagObj)

        return Response(serializer.data)




