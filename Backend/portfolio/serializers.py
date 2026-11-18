from rest_framework import serializers
from .models import Tag, Project, Contact, Skill, Experience, About, Hero


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name'] 

class ProjectSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'year', 'tags', 'github_link']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'github', 'linkedin', 'email']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'title', 'company', 'start_date', 'end_date', 'description']

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = ['id', 'description', 'highlighted_words', 'order']

class HeroSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = Hero
        fields = ['id', 'name', 'title', 'tagline', 'profile_picture']

    def get_profile_picture(self, obj):
        if obj.profile_image_url:
            return obj.profile_image_url
        if obj.profile_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.profile_image.url)
            return obj.profile_image.url
        return None