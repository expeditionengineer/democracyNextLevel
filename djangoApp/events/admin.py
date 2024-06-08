from django.contrib import admin

# from django.models.auth import Group

from .models import Event, Location, Organizer, Tag


class EventAdmin(admin.ModelAdmin):

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(createdBy=request.user)

    def has_change_permission(self, request, obj=None):
        if obj is None or not obj:
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

    def has_view_permission(self, request, obj=None):
        if obj is None:
            return True
        return obj.createdBy == request.use

    def has_add_permission(self, request):
        return True


admin.site.register(Event, EventAdmin)
admin.site.register(Location)
admin.site.register(Organizer)
admin.site.register(Tag)

# admin.site.register(Group)
