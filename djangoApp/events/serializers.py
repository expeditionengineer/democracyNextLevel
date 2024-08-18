from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth.models import Group

from .models import Event, Location, Organizer
from common.models import *

class UserSerializer(serializers.Serializer):
    # email = serializers.EmailField()
    username = serializers.CharField(max_length=100)


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = '__all__'
        
class OrganizerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Organizer
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    createdBy = UserSerializer()
    location = LocationSerializer()
    organizer = OrganizerSerializer(read_only=True, many=True)
    class Meta:
        model = Event
        fields = '__all__'


class CustomRegisterSerializer(RegisterSerializer, serializers.ModelSerializer):
    street = serializers.CharField(max_length=300, required=False, allow_null=True, allow_blank=True)    
    street_number = serializers.CharField(max_length=20, required=False, allow_null=True, allow_blank=True)
    zip_code = serializers.IntegerField(required=False, allow_null=True)
    city = serializers.CharField(max_length=100, required=False, allow_null=True, allow_blank=True)
    phone_number = serializers.CharField(max_length=20, required=False, allow_null=True, allow_blank=True)
    profile_picture = serializers.ImageField(required=False, allow_null=True)
    description = serializers.CharField(max_length=155, required=True)
    country = serializers.CharField(max_length=200, required=False, allow_null=True, allow_blank=True)
    content_categories = serializers.PrimaryKeyRelatedField(
        queryset=ContentCategory.objects.all(), many=True, required=False, allow_null=True
    )
    media_categories = serializers.PrimaryKeyRelatedField(
        queryset=MediaCategory.objects.all(), many=True, required=False, allow_null=True
    )
    area_of_interest = serializers.PrimaryKeyRelatedField(
        queryset=AreaOfInterest.objects.all(), many=True, required=False, allow_null=True
    )
    ai_agent = serializers.PrimaryKeyRelatedField(
        queryset=Agent.objects.all(), many=True, required=False, allow_null=True
    )
    roles = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), many=True, required=False, allow_null=True
    )
    motivation = serializers.CharField(max_length=1000, required=False)
    class Meta:
        model = User
        fields = (
        'username', 'email', 'password1', "password2", "street", 'street_number', 'zip_code', 'city',
        'phone_number', 'profile_picture', 'description', 'country', 
        'content_categories', 'media_categories', 'area_of_interest', 
        'ai_agent', 'roles', "first_name", "last_name", "motivation",
        )

# Override get_cleaned_data of RegisterSerializer
    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            "first_name": self.validated_data.get('first_name', ''),
            "last_name": self.validated_data.get('last_name', ''),

            "street": self.validated_data.get("street", ""),
            'street_number': self.validated_data.get('street_number', ''),
            'zip_code': self.validated_data.get('zip_code', None),
            'city': self.validated_data.get('city', ''),
            'phone_number': self.validated_data.get('phone_number', ''),
            'profile_picture': self.validated_data.get('profile_picture', None),
        'description': self.validated_data.get('description', ''),
        'country': self.validated_data.get('country', ''),
        'content_categories': self.validated_data.get('content_categories', []),
        'media_categories': self.validated_data.get('media_categories', []),
        'area_of_interest': self.validated_data.get('area_of_interest', []),
        'ai_agent': self.validated_data.get('ai_agent', []),
        'roles': self.validated_data.get('roles', []),
        "motivation": self.validated_data.get("motivation", "")
        } 
    def save(self, request):
        user = super().save(request)
        user.street = self.validated_data.get('street', '')
        user.street_number = self.validated_data.get('street_number', '')
        user.zip_code = self.validated_data.get('zip_code', None)
        user.city = self.validated_data.get('city', '')
        user.phone_number = self.validated_data.get('phone_number', '')
        user.profile_picture = self.validated_data.get('profile_picture', None)
        user.description = self.validated_data['description']
        user.country = self.validated_data.get('country', '')
        user.motivation = self.validated_data.get("motivation", "")
        user.save()

        # Handle ManyToMany fields after the user is saved
        dictOfManyToManyEles = {
            "content_categories": ContentCategory,
            "media_categories": MediaCategory,
            "area_of_interest": AreaOfInterest,
            "ai_agent": Agent,
        }

        for mTmField in dictOfManyToManyEles.keys():
                getattr(user, mTmField).add(*self.validated_data.get(mTmField, [])) 
                
        user.roles.set(self.validated_data.get('roles', []))

        return user

   # # override save method of RegisterSerializer
    # def save(self, request):
    #     adapter = get_adapter()
    #     user = adapter.new_user(request)
    #     self.cleaned_data = self.get_cleaned_data()
    #     user.age = self.cleaned_data.get('age')
    #     user.occupation = self.cleaned_data.get('occupation')
    #     user.date_of_birth = self.cleaned_data.get('date_of_birth')
    #     user.save()
    #     adapter.save_user(request, user, self)
    #     return user
    #

# group = serializers.CharField()
    #     street = self.validated_data.get("street", "")
    #     print(street)
    #     user.street = street
    #     streetNumber = self.validated_data.get("street_number")
    #     user.street_number = streetNumber
    #     country = self.validated_data.get("country")
    #     user.country = country
    #
    #     postalCode = self.validated_data.get("zip_code")
    #     user.zip_code = postalCode
    #     description = self.validated_data.get("description")
    #     user.description = description
    #
    #     city = self.validated_data.get("city")
    #     user.city = city
    #
    #     phoneNumber = self.validated_data.get("phone_number")
    #     user.phone_number = phoneNumber
    #
    #     image = self.validated_data.get("profile_picture")
    #     user.image = image
    #
    #     listOfContentCategories = self.validated_data.get("content_categories")
    #     for contentCategory in listOfContentCategories:
    #         contentCategoryObj = ContentCategory.objects.get(id=contentCategory)
    #         user.content_categories.add(contentCategoryObj)
    #
    #     listOfMediaCategories = self.validated_data("media_categories")
    #     for mediaCategory in listOfMediaCategories:
    #         mediaCategoryObj = MediaCategory.objects.get(id=mediaCategory)
    #         user.media_categories.add(mediaCategoryObj)
    #
    #     listOfAreaOfInterests = self.validated_data("area_of_interest")
    #     for areaOfInterestCategory in listOfAreaOfInterests:
    #         areaOfInterestObj = AreaOfInterest.objects.get(id=areaOfInterestCategory)
    #         user.area_of_interest.add(areaOfInterestObj)
    #
    #     listOfAgents = self.validated_data.get("agents")
    #     for agent in listOfAgents:
    #         agentObj = Agent.objects.get(id=agent)
    #         user.agents.add(agentObj)
    #
    #     user.save()
    #     return user
