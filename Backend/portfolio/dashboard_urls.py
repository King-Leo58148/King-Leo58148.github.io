from django.urls import path
from . import dashboard_views

urlpatterns = [
    path('', dashboard_views.dashboard_home, name='dashboard_home'),
    path('login/', dashboard_views.dashboard_login, name='dashboard_login'),
    path('logout/', dashboard_views.dashboard_logout, name='dashboard_logout'),
    path('hero/save/', dashboard_views.save_hero, name='dashboard_save_hero'),
    path('contact/save/', dashboard_views.save_contact, name='dashboard_save_contact'),
    path('projects/save/', dashboard_views.save_project, name='dashboard_save_project'),
    path('projects/<int:pk>/delete/', dashboard_views.delete_project, name='dashboard_delete_project'),
    path('skills/save/', dashboard_views.save_skill, name='dashboard_save_skill'),
    path('skills/<int:pk>/delete/', dashboard_views.delete_skill, name='dashboard_delete_skill'),
    path('experience/save/', dashboard_views.save_experience, name='dashboard_save_experience'),
    path('experience/<int:pk>/delete/', dashboard_views.delete_experience, name='dashboard_delete_experience'),
    path('about/save/', dashboard_views.save_about, name='dashboard_save_about'),
    path('about/<int:pk>/delete/', dashboard_views.delete_about, name='dashboard_delete_about'),
]
