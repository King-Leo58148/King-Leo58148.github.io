from functools import wraps
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404, redirect, render
from .models import About, Contact, Experience, Hero, Project, Skill, Tag


def staff_required(view_func):
    """Require an authenticated staff user for custom dashboard views."""
    @wraps(view_func)
    def _wrapped(request, *args, **kwargs):
        if not request.user.is_authenticated or not request.user.is_staff:
            return redirect('dashboard_login')
        return view_func(request, *args, **kwargs)
    return _wrapped


def dashboard_login(request):
    if request.user.is_authenticated and request.user.is_staff:
        return redirect('dashboard_home')

    error = None
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            return redirect('dashboard_home')
        error = 'Invalid username or password, or account lacks staff access.'

    return render(request, 'dashboard/login.html', {'error': error})


def dashboard_logout(request):
    logout(request)
    return redirect('dashboard_login')


@staff_required
def dashboard_home(request):
    hero = Hero.objects.first()
    contact = Contact.objects.first()
    projects = Project.objects.prefetch_related('tags').all().order_by('-year', 'order', 'id')
    skills = Skill.objects.all().order_by('category', 'name')
    experiences = Experience.objects.all().order_by('-start_date', 'id')
    about_items = About.objects.all().order_by('order', 'id')
    tags = Tag.objects.all().order_by('name')

    active_tab = request.GET.get('tab', 'overview')

    return render(request, 'dashboard/index.html', {
        'hero': hero,
        'contact': contact,
        'projects': projects,
        'skills': skills,
        'experiences': experiences,
        'about_items': about_items,
        'tags': tags,
        'skill_categories': Skill.CATEGORIES,
        'active_tab': active_tab,
    })


@staff_required
def save_hero(request):
    if request.method != 'POST':
        return redirect('dashboard_home')

    hero = Hero.objects.first() or Hero()
    hero.name = request.POST.get('name', '').strip()
    hero.title = request.POST.get('title', '').strip()
    hero.tagline = request.POST.get('tagline', '').strip()
    hero.profile_image_url = request.POST.get('profile_image_url', '').strip()

    if request.POST.get('clear_image') == '1':
        hero.profile_image = None
    elif 'profile_image' in request.FILES:
        hero.profile_image = request.FILES['profile_image']

    hero.save()
    messages.success(request, 'Profile & Hero updated.')
    return redirect('/dashboard/?tab=profile')


@staff_required
def save_contact(request):
    if request.method != 'POST':
        return redirect('dashboard_home')

    contact = Contact.objects.first() or Contact()
    contact.email = request.POST.get('email', '').strip()
    contact.github = request.POST.get('github', '').strip()
    contact.linkedin = request.POST.get('linkedin', '').strip()
    contact.save()
    messages.success(request, 'Contact information updated.')
    return redirect('/dashboard/?tab=contact')


@staff_required
def save_project(request):
    if request.method != 'POST':
        return redirect('dashboard_home')

    project_id = request.POST.get('project_id')
    project = get_object_or_404(Project, pk=project_id) if project_id else Project()
    project.title = request.POST.get('title', '').strip()
    project.description = request.POST.get('description', '').strip()
    project.year = request.POST.get('year', '').strip()[:4]
    project.github_link = request.POST.get('github_link', '').strip()
    try:
        project.order = int(request.POST.get('order') or 0)
    except ValueError:
        project.order = 0
    project.save()

    selected_tag_ids = request.POST.getlist('tags')
    tag_objs = list(Tag.objects.filter(id__in=selected_tag_ids))

    new_tags_raw = request.POST.get('new_tags', '').strip()
    if new_tags_raw:
        for name in [t.strip() for t in new_tags_raw.split(',') if t.strip()]:
            tag_obj, _ = Tag.objects.get_or_create(name=name)
            if tag_obj not in tag_objs:
                tag_objs.append(tag_obj)

    project.tags.set(tag_objs)
    messages.success(request, f'Project "{project.title}" saved.')
    return redirect('/dashboard/?tab=projects')


@staff_required
def delete_project(request, pk):
    if request.method == 'POST':
        project = get_object_or_404(Project, pk=pk)
        title = project.title
        project.delete()
        messages.success(request, f'Project "{title}" deleted.')
    return redirect('/dashboard/?tab=projects')


@staff_required
def save_skill(request):
    if request.method != 'POST':
        return redirect('dashboard_home')

    skill_id = request.POST.get('skill_id')
    skill = get_object_or_404(Skill, pk=skill_id) if skill_id else Skill()
    skill.name = request.POST.get('name', '').strip()
    skill.category = request.POST.get('category', 'core')
    skill.save()
    messages.success(request, f'Skill "{skill.name}" saved.')
    return redirect('/dashboard/?tab=skills')


@staff_required
def delete_skill(request, pk):
    if request.method == 'POST':
        skill = get_object_or_404(Skill, pk=pk)
        name = skill.name
        skill.delete()
        messages.success(request, f'Skill "{name}" deleted.')
    return redirect('/dashboard/?tab=skills')


@staff_required
def save_experience(request):
    if request.method != 'POST':
        return redirect('dashboard_home')

    exp_id = request.POST.get('exp_id')
    exp = get_object_or_404(Experience, pk=exp_id) if exp_id else Experience()
    exp.title = request.POST.get('title', '').strip()
    exp.company = request.POST.get('company', '').strip()
    exp.start_date = request.POST.get('start_date', '').strip()[:20]
    exp.end_date = request.POST.get('end_date', '').strip()[:20]
    exp.description = request.POST.get('description', '').strip()
    exp.save()
    messages.success(request, f'Experience "{exp.title}" saved.')
    return redirect('/dashboard/?tab=experience')


@staff_required
def delete_experience(request, pk):
    if request.method == 'POST':
        exp = get_object_or_404(Experience, pk=pk)
        title = exp.title
        exp.delete()
        messages.success(request, f'Experience "{title}" deleted.')
    return redirect('/dashboard/?tab=experience')


@staff_required
def save_about(request):
    if request.method != 'POST':
        return redirect('dashboard_home')

    about_id = request.POST.get('about_id')
    about = get_object_or_404(About, pk=about_id) if about_id else About()
    about.description = request.POST.get('description', '').strip()
    try:
        about.order = int(request.POST.get('order') or 0)
    except ValueError:
        about.order = 0
    raw_words = request.POST.get('highlighted_words', '').strip()
    about.highlighted_words = [w.strip() for w in raw_words.split(',') if w.strip()] if raw_words else []
    about.save()
    messages.success(request, 'About paragraph saved.')
    return redirect('/dashboard/?tab=about')


@staff_required
def delete_about(request, pk):
    if request.method == 'POST':
        about = get_object_or_404(About, pk=pk)
        about.delete()
        messages.success(request, 'About paragraph deleted.')
    return redirect('/dashboard/?tab=about')
