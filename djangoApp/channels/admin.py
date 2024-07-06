from django.contrib import admin

from .models import (
    News,
    Project,
    Stakeholder,
    Like,
)

admin.site.register(News)
admin.site.register(Project)
admin.site.register(Stakeholder)
admin.site.register(Like)
