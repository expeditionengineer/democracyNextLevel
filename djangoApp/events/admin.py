from django.contrib import admin
from .models import Event

class EventAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(createdBy=request.user)

    def has_change_permission(self, request, obj=None):
        if not obj:
            return True  # So they can see the change list page
        if request.user.is_superuser:
            return True
        return obj.createdBy == request.user

    def has_delete_permission(self, request, obj=None):
        if not obj:
            return True  # So they can see the change list page
        if request.user.is_superuser:
            return True
        return obj.createdBy == request.user

admin.site.register(Event, EventAdmin)