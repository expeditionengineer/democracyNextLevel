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

from django.contrib import admin
from django.urls import path

from events.views import UserEventList
from iotManager.views import IotDeviceAPI
from content.views import ContentAPI

urlpatterns = [
    path("admin/", admin.site.urls),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("events/", UserEventList.as_view(), name="user-events"),
    path("dj-rest-auth/registration/",
         include("dj_rest_auth.registration.urls")),
    path("iotdevices/", IotDeviceAPI.as_view(), name="iotdevices"),
    path("contents/", ContentAPI.as_view(), name="contents"),
]
