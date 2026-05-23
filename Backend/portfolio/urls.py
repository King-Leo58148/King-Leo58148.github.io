from django.urls import path

from . views import AboutList, ContactList, HeroList, ProjectList, SkillList, ExperienceList

urlpatterns = [
   path('projects/', ProjectList.as_view(), name='project-list'),
   path('contact/', ContactList.as_view(), name='contact-list'),
   path('skills/', SkillList.as_view(), name='skill-list'),
   path('experience/', ExperienceList.as_view(), name='experience-list'),   
    path('about/', AboutList.as_view(), name='about-list'),
    path('hero/', HeroList.as_view(), name='hero-list'),
    
]
