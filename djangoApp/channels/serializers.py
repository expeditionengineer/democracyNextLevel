from rest_framework import serializers

from channels.models import News, DebateCard
from common.models import User

class NewsSerializer(serializers.ModelSerializer):
    userForname = serializers.SerializerMethodField()
    userSurname = serializers.SerializerMethodField()
    class Meta:
        model = News
        fields = "__all__"

    def get_userForname(self, obj):
        """Return forname of the user specified in the News-instance `createdBy`
        field.

        """
        return obj.createdBy.first_name

    def get_userSurname(self, obj):
        """Return forname of the user specified in the News-instance `createdBy`
        field.

        """
        return obj.createdBy.last_name


class DebateCardSerializer(serializers.ModelSerializer):
    """

    """
    class Meta:
        model = DebateCard
        fields = "__all__"

    def get_userForname(self, obj):
        """Return forname of the user specified in the News-instance `createdBy`
        field.

        """
        return obj.createdBy.first_name

    def get_userSurname(self, obj):
        """Return forname of the user specified in the News-instance `createdBy`
        field.

        """
        return obj.createdBy.last_name
