from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication

from .models import Event
from .serializers import EventSerializer


class UserEventList(generics.ListAPIView):
    serializer_class = EventSerializer

    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(published=True, createdBy=user)
