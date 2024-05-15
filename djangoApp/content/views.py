from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Content
from .serializers import ContentSerializer


# Create your views here.
class ContentAPI(APIView):
    serializer_class = ContentSerializer

    def get(self, request):
        allContentObjs = Content.objects.all()
        serializer = self.serializer_class(allContentObjs, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
