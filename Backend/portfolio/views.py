from django.shortcuts import render
from .models import Project, Contact, Skill, Experience, About, Hero
from .serializers import ProjectSerializer, ContactSerializer, SkillSerializer, ExperienceSerializer, AboutSerializer, HeroSerializer
from rest_framework.generics import ListAPIView

class ProjectList(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer    
class ContactList(ListAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer    

class SkillList(ListAPIView):    
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class ExperienceList(ListAPIView):        
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class AboutList(ListAPIView):
    queryset = About.objects.all().order_by('order')
    serializer_class = AboutSerializer  

class HeroList(ListAPIView):            
    queryset = Hero.objects.all()
    serializer_class = HeroSerializer   

  