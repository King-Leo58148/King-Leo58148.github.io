import json
import sqlite3
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from portfolio.models import About, Contact, Experience, Hero, Project, Skill, Tag


class Command(BaseCommand):
    help = 'Seed the active database from db.sqlite3 once when empty (for initial Postgres setup).'

    def handle(self, *args, **options):
        if Hero.objects.exists():
            self.stdout.write('Database already seeded; skipping.')
            return

        sqlite_path = settings.BASE_DIR / 'db.sqlite3'
        if not sqlite_path.exists():
            self.stdout.write('No db.sqlite3 found to seed from.')
            return

        conn = sqlite3.connect(sqlite_path)
        conn.row_factory = sqlite3.Row

        User = get_user_model()
        for row in conn.execute('SELECT username, password, email, is_staff, is_superuser, is_active FROM auth_user'):
            if not User.objects.filter(username=row['username']).exists():
                User.objects.create(
                    username=row['username'],
                    password=row['password'],
                    email=row['email'],
                    is_staff=bool(row['is_staff']),
                    is_superuser=bool(row['is_superuser']),
                    is_active=bool(row['is_active']),
                )

        for row in conn.execute('SELECT name, title, tagline, profile_image, profile_image_url FROM portfolio_hero'):
            Hero.objects.create(
                name=row['name'],
                title=row['title'],
                tagline=row['tagline'],
                profile_image=row['profile_image'] or '',
                profile_image_url=row['profile_image_url'] or '',
            )

        for row in conn.execute('SELECT github, linkedin, email FROM portfolio_contact'):
            Contact.objects.create(
                github=row['github'] or '',
                linkedin=row['linkedin'] or '',
                email=row['email'] or '',
            )

        for row in conn.execute('SELECT name, category FROM portfolio_skill'):
            Skill.objects.create(name=row['name'], category=row['category'])

        for row in conn.execute('SELECT description, highlighted_words, "order" FROM portfolio_about'):
            words = row['highlighted_words']
            if isinstance(words, str):
                words = json.loads(words) if words else []
            About.objects.create(
                description=row['description'],
                highlighted_words=words,
                order=row['order'],
            )

        for row in conn.execute('SELECT title, company, start_date, end_date, description FROM portfolio_experience'):
            Experience.objects.create(
                title=row['title'],
                company=row['company'],
                start_date=row['start_date'],
                end_date=row['end_date'],
                description=row['description'],
            )

        tag_map = {}
        for row in conn.execute('SELECT id, name FROM portfolio_tag'):
            tag_obj, _ = Tag.objects.get_or_create(name=row['name'])
            tag_map[row['id']] = tag_obj

        proj_map = {}
        for row in conn.execute('SELECT id, title, description, year, github_link, "order" FROM portfolio_project'):
            proj_map[row['id']] = Project.objects.create(
                title=row['title'],
                description=row['description'],
                year=row['year'],
                github_link=row['github_link'] or '',
                order=row['order'],
            )

        for row in conn.execute('SELECT project_id, tag_id FROM portfolio_project_tags'):
            proj = proj_map.get(row['project_id'])
            tag = tag_map.get(row['tag_id'])
            if proj and tag:
                proj.tags.add(tag)

        conn.close()
        self.stdout.write(self.style.SUCCESS('Seeded database from db.sqlite3 successfully.'))
