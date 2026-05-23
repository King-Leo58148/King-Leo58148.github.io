from django.contrib import admin
from .models import Tag, Project, Contact, Skill, Experience, About, Hero

class ProjectAdmin(admin.ModelAdmin):
    filter_horizontal = ('tags',)

admin.site.register(Tag)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Contact)
admin.site.register(Skill)
admin.site.register(Experience)
admin.site.register(About)
admin.site.register(Hero)