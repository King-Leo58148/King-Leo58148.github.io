
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
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-year', 'order', 'id']

    def __str__(self):
        return self.title
    
class Contact(models.Model):
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    email = models.EmailField(blank=True)

    class Meta:
        verbose_name = "Contact Info"
        verbose_name_plural = "Contact Info"

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

    class Meta:
        verbose_name = "About Paragraph"
        verbose_name_plural = "About Section"
        ordering = ['order']

    def __str__(self):
        return f"About paragraph {self.order}"
    
class Hero(models.Model):
    name = models.CharField(max_length=100)
    title= models.CharField(max_length=100)
    tagline = models.CharField(max_length=200)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    profile_image_url = models.URLField(
        blank=True,
        help_text='Optional direct image URL (recommended for Render so it persists across redeploys).',
    )

    class Meta:
        verbose_name = "Profile & Hero"
        verbose_name_plural = "Profile & Hero"

    def __str__(self):
        return self.name