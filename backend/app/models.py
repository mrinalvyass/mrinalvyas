from datetime import datetime

from werkzeug.security import check_password_hash, generate_password_hash

from .extensions import db


class TimestampMixin:
    """Shared timestamps keep admin content easy to audit."""

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )


class User(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=True, nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class About(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    headline = db.Column(db.String(180), nullable=False)
    intro = db.Column(db.Text, nullable=False)
    bio = db.Column(db.Text, nullable=False)
    objective = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(30), nullable=True)
    github_url = db.Column(db.String(255), nullable=True)
    linkedin_url = db.Column(db.String(255), nullable=True)
    website_url = db.Column(db.String(255), nullable=True)
    resume_url = db.Column(db.String(255), nullable=False, default="/api/public/resume")
    avatar_url = db.Column(db.String(255), nullable=True)
    years_experience = db.Column(db.Integer, nullable=False, default=3)
    availability = db.Column(db.String(120), nullable=False, default="Open to opportunities")


class Skill(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(120), nullable=False)
    level = db.Column(db.Integer, nullable=False, default=80)
    icon = db.Column(db.String(80), nullable=True)
    description = db.Column(db.Text, nullable=True)
    position = db.Column(db.Integer, nullable=False, default=0)
    is_visible = db.Column(db.Boolean, default=True, nullable=False)


class Project(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(160), nullable=False)
    description = db.Column(db.Text, nullable=False)
    long_description = db.Column(db.Text, nullable=True)
    tech_stack = db.Column(db.String(255), nullable=False)
    github_url = db.Column(db.String(255), nullable=True)
    live_url = db.Column(db.String(255), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(120), nullable=True)
    source = db.Column(db.String(30), nullable=False, default="manual")
    position = db.Column(db.Integer, nullable=False, default=0)
    is_featured = db.Column(db.Boolean, default=True, nullable=False)
    is_visible = db.Column(db.Boolean, default=True, nullable=False)


class Experience(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(160), nullable=False)
    organization = db.Column(db.String(160), nullable=False)
    timeline = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(50), nullable=False, default="experience")
    position = db.Column(db.Integer, nullable=False, default=0)
    is_visible = db.Column(db.Boolean, default=True, nullable=False)


class Achievement(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(160), nullable=False)
    issuer = db.Column(db.String(160), nullable=False)
    timeline = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    link_url = db.Column(db.String(255), nullable=True)
    position = db.Column(db.Integer, nullable=False, default=0)
    is_visible = db.Column(db.Boolean, default=True, nullable=False)


class Service(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(160), nullable=False)
    description = db.Column(db.Text, nullable=False)
    icon = db.Column(db.String(80), nullable=True)
    position = db.Column(db.Integer, nullable=False, default=0)
    is_visible = db.Column(db.Boolean, default=True, nullable=False)


class Testimonial(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(160), nullable=False)
    company = db.Column(db.String(160), nullable=False)
    quote = db.Column(db.Text, nullable=False)
    avatar_url = db.Column(db.String(255), nullable=True)
    position = db.Column(db.Integer, nullable=False, default=0)
    is_visible = db.Column(db.Boolean, default=True, nullable=False)


class BlogPost(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(180), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    slug = db.Column(db.String(160), unique=True, nullable=False)
    cover_url = db.Column(db.String(255), nullable=True)
    published_at = db.Column(db.String(80), nullable=False)
    read_time = db.Column(db.String(40), nullable=False, default="5 min read")
    category = db.Column(db.String(80), nullable=False, default="Engineering")
    position = db.Column(db.Integer, nullable=False, default=0)
    is_visible = db.Column(db.Boolean, default=True, nullable=False)


class SectionSetting(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    section_key = db.Column(db.String(80), unique=True, nullable=False)
    label = db.Column(db.String(80), nullable=False)
    is_visible = db.Column(db.Boolean, default=True, nullable=False)


class ContactMessage(TimestampMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(160), nullable=False)
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(40), nullable=False, default="simulated_sent")


def serialize_about(about):
    return {
        "id": about.id,
        "fullName": about.full_name,
        "title": about.title,
        "headline": about.headline,
        "intro": about.intro,
        "bio": about.bio,
        "objective": about.objective,
        "location": about.location,
        "email": about.email,
        "phone": about.phone,
        "githubUrl": about.github_url,
        "linkedinUrl": about.linkedin_url,
        "websiteUrl": about.website_url,
        "resumeUrl": about.resume_url,
        "avatarUrl": about.avatar_url,
        "yearsExperience": about.years_experience,
        "availability": about.availability,
    }


def serialize_skill(skill):
    return {
        "id": skill.id,
        "name": skill.name,
        "category": skill.category,
        "level": skill.level,
        "icon": skill.icon,
        "description": skill.description,
        "position": skill.position,
        "isVisible": skill.is_visible,
    }


def serialize_project(project):
    return {
        "id": project.id,
        "title": project.title,
        "description": project.description,
        "longDescription": project.long_description,
        "techStack": [item.strip() for item in project.tech_stack.split(",") if item.strip()],
        "githubUrl": project.github_url,
        "liveUrl": project.live_url,
        "imageUrl": project.image_url,
        "category": project.category,
        "source": project.source,
        "position": project.position,
        "isFeatured": project.is_featured,
        "isVisible": project.is_visible,
    }


def serialize_experience(item):
    return {
        "id": item.id,
        "title": item.title,
        "organization": item.organization,
        "timeline": item.timeline,
        "description": item.description,
        "type": item.type,
        "position": item.position,
        "isVisible": item.is_visible,
    }


def serialize_achievement(item):
    return {
        "id": item.id,
        "title": item.title,
        "issuer": item.issuer,
        "timeline": item.timeline,
        "description": item.description,
        "linkUrl": item.link_url,
        "position": item.position,
        "isVisible": item.is_visible,
    }


def serialize_service(item):
    return {
        "id": item.id,
        "title": item.title,
        "description": item.description,
        "icon": item.icon,
        "position": item.position,
        "isVisible": item.is_visible,
    }


def serialize_testimonial(item):
    return {
        "id": item.id,
        "name": item.name,
        "role": item.role,
        "company": item.company,
        "quote": item.quote,
        "avatarUrl": item.avatar_url,
        "position": item.position,
        "isVisible": item.is_visible,
    }


def serialize_blog_post(item):
    return {
        "id": item.id,
        "title": item.title,
        "summary": item.summary,
        "slug": item.slug,
        "coverUrl": item.cover_url,
        "publishedAt": item.published_at,
        "readTime": item.read_time,
        "category": item.category,
        "position": item.position,
        "isVisible": item.is_visible,
    }


def serialize_section(setting):
    return {
        "id": setting.id,
        "sectionKey": setting.section_key,
        "label": setting.label,
        "isVisible": setting.is_visible,
    }


def serialize_contact(message):
    return {
        "id": message.id,
        "name": message.name,
        "email": message.email,
        "subject": message.subject,
        "message": message.message,
        "status": message.status,
        "createdAt": message.created_at.isoformat(),
    }
