from django.contrib import admin
from django.utils.html import format_html
from .models import Tag, Project, Contact, Skill, Experience, About, Hero

admin.site.site_header = "Louis Portfolio Admin"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Manage Portfolio Content"


@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    list_display = ('avatar_thumb', 'name', 'title', 'tagline')
    list_display_links = ('avatar_thumb', 'name')
    readonly_fields = ('avatar_preview',)
    fieldsets = (
        ('Identity', {
            'fields': ('name', 'title', 'tagline'),
        }),
        ('Profile Picture', {
            'fields': ('avatar_preview', 'profile_image', 'profile_image_url'),
            'description': 'Upload an image file or paste a direct image URL.',
        }),
    )

    def _image_url(self, obj):
        if obj.profile_image_url:
            return obj.profile_image_url
        if obj.profile_image:
            return obj.profile_image.url
        return None

    @admin.display(description='Photo')
    def avatar_thumb(self, obj):
        url = self._image_url(obj)
        if not url:
            return "—"
        return format_html(
            '<img src="{}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;object-position:center 20%;border:1px solid #64ffda;" />',
            url,
        )

    @admin.display(description='Current Photo Preview')
    def avatar_preview(self, obj):
        url = self._image_url(obj)
        if not url:
            return "No profile picture uploaded yet."
        return format_html(
            '<img src="{}" style="width:96px;height:96px;border-radius:50%;object-fit:cover;object-position:center 20%;border:2px solid #64ffda;" />',
            url,
        )


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'order', 'tag_list', 'github_link')
    list_editable = ('year', 'order')
    list_filter = ('year', 'tags')
    search_fields = ('title', 'description')
    filter_horizontal = ('tags',)
    ordering = ('-year', 'order', 'id')

    @admin.display(description='Tech Stack')
    def tag_list(self, obj):
        return ", ".join(obj.tags.values_list('name', flat=True)) or "—"


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_editable = ('category',)
    list_filter = ('category',)
    search_fields = ('name',)


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'start_date', 'end_date')
    search_fields = ('title', 'company', 'description')


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('order', 'short_description')
    list_editable = ('order',)
    list_display_links = ('short_description',)
    ordering = ('order',)

    @admin.display(description='Paragraph')
    def short_description(self, obj):
        return (obj.description[:90] + '...') if len(obj.description) > 90 else obj.description


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('email', 'github', 'linkedin')


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ('name',)
