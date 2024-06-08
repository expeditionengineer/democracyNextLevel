from rest_framework import generics, permissions
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend

from .models import Event
from .serializers import EventSerializer


class UserEventList(generics.ListCreateAPIView):
    serializer_class = EventSerializer

    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["published", "createdBy"]

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(Q(published=0) | Q(createdBy=user))

    def perform_create(self, serializer):
        serializer.save(createdBy=self.request.user)
