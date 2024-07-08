from django.contrib import admin

from .models import (
    Agent,
    User,
    MediaCategory,
    ContentCategory,
    AreaOfInterest,
)

admin.site.register(Agent)
admin.site.register(AreaOfInterest)
admin.site.register(ContentCategory)
admin.site.register(MediaCategory)
admin.site.register(User)
