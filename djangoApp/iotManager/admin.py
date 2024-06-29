from django.contrib import admin

from .models import (
    IotDevice,
    MediaCategory,
)

admin.site.register(IotDevice)
admin.site.register(MediaCategory)
