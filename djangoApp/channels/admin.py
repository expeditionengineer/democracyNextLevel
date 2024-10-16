from django.contrib import admin

from .models import (
    News,
    Project,
    Stakeholder,
    DebatePoint,
    DebateCard,
    MarkPerson,
)


admin.site.register(DebatePoint)
admin.site.register(DebateCard)
admin.site.register(News)
admin.site.register(Project)
admin.site.register(Stakeholder)
admin.site.register(MarkPerson)
