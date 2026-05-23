
from django.db import models

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=50)
    def __str__(self):
        return self.name
class Project(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    year = models.CharField(max_length=4)
    tags = models.ManyToManyField(Tag, blank=True)
    github_link = models.URLField(blank=True)
    def __str__(self):
        return self.title
    
class Contact(models.Model):
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    def __str__(self):
        return "Contact Information"
    
class Skill(models.Model):
    CATEGORIES = [
        ('core', 'Core'),
        ('databases', 'Databases'),
        ('tools', 'Tools'),
        ('exploring', 'Exploring'),
    ]
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=20, choices=CATEGORIES)
    def __str__(self):
        return self.name
class Experience(models.Model):
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    start_date = models.CharField(max_length=4)
    end_date = models.CharField(max_length=20)
    description = models.TextField()
    def __str__(self):
        return self.title

class About(models.Model):
    description = models.TextField()
    highlighted_words = models.JSONField(default=list, blank=True, null=True)
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"About paragraph {self.order}"
    
class Hero(models.Model):
    name = models.CharField(max_length=100)
    title= models.CharField(max_length=100)
    tagline = models.CharField(max_length=200)
    def __str__(self):
        return self.name