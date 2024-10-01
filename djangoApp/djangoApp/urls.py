"""djangoApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

from channels.views import NewsView
from events.views import UserEventList, get_published_events
from iotManager.views import IotDeviceAPI, execute_scraper
from common.views import *
# from content.views import ContentAPI

urlpatterns = [
    path("admin/", admin.site.urls),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("events/", UserEventList.as_view(), name="user-evnts"),
    path("events/published/", get_published_events, name="published_events"),
    path("user/", UserView.as_view(), name="UserView"),
    path('auth/', include('dj_rest_auth.urls')),  # Authentication URLs (Login, Logout, User Details)
    path("dj-rest-auth/registration/",
         include("dj_rest_auth.registration.urls")),
    path("iotdevices/", IotDeviceAPI.as_view(), name="iotdevices"),
    path("scraper", execute_scraper, name="execute_scraper"),
    path("messages/", include("postman.urls", namespace="postman")),
    path("area-of-interest/", ArearOfInterestView.as_view(), name="areaOfInterest"),
    path("content-categories/",ContentCategoryView.as_view(), name="contentCategory"),
    path("media-categories/", MediaCategoryView.as_view(), name="mediaCategory"),
    path("agents/", AgentsView.as_view(), name="agents"),
    path("roles/", RolesView.as_view(), name="roles"),
    path("news/", NewsView.as_view(), name="newsView"),
    # path("contents/", ContentAPI.as_view(), name="contents"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
