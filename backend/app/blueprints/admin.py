from pathlib import Path
from uuid import uuid4

from flask import Blueprint, current_app, request
from flask_jwt_extended import get_jwt, jwt_required
from werkzeug.utils import secure_filename

from ..extensions import db
from ..models import (
    About,
    Achievement,
    BlogPost,
    ContactMessage,
    Experience,
    Project,
    SectionSetting,
    Service,
    Skill,
    Testimonial,
    serialize_about,
    serialize_achievement,
    serialize_blog_post,
    serialize_contact,
    serialize_experience,
    serialize_project,
    serialize_section,
    serialize_service,
    serialize_skill,
    serialize_testimonial,
)
from ..utils.validation import require_fields


admin_bp = Blueprint("admin", __name__)
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "gif", "pdf"}


def admin_only():
    claims = get_jwt()
    return claims.get("is_admin") is True


def unauthorized_response():
    return {"message": "Admin privileges are required"}, 403


def serialize_collection(items, serializer):
    return {"items": [serializer(item) for item in items]}


@admin_bp.get("/dashboard")
@jwt_required()
def dashboard():
    if not admin_only():
        return unauthorized_response()

    return {
        "stats": {
            "projects": Project.query.count(),
            "skills": Skill.query.count(),
            "timeline": Experience.query.count(),
            "achievements": Achievement.query.count(),
            "services": Service.query.count(),
            "testimonials": Testimonial.query.count(),
            "blogPosts": BlogPost.query.count(),
            "messages": ContactMessage.query.count(),
        },
        "messages": [
            serialize_contact(message)
            for message in ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
        ],
    }


@admin_bp.get("/about")
@jwt_required()
def get_about():
    if not admin_only():
        return unauthorized_response()
    about = About.query.first()
    return {"about": serialize_about(about) if about else None}


@admin_bp.put("/about")
@jwt_required()
def update_about():
    if not admin_only():
        return unauthorized_response()

    data = request.get_json() or {}
    missing = require_fields(
        data,
        [
            "fullName",
            "title",
            "headline",
            "intro",
            "bio",
            "objective",
            "location",
            "email",
        ],
    )
    if missing:
        return {"message": f"Missing required fields: {', '.join(missing)}"}, 400

    about = About.query.first() or About()
    if not about.id:
        db.session.add(about)

    field_map = {
        "fullName": "full_name",
        "title": "title",
        "headline": "headline",
        "intro": "intro",
        "bio": "bio",
        "objective": "objective",
        "location": "location",
        "email": "email",
        "phone": "phone",
        "githubUrl": "github_url",
        "linkedinUrl": "linkedin_url",
        "websiteUrl": "website_url",
        "resumeUrl": "resume_url",
        "avatarUrl": "avatar_url",
        "yearsExperience": "years_experience",
        "availability": "availability",
    }
    for payload_key, model_key in field_map.items():
        if payload_key in data:
            setattr(about, model_key, data[payload_key])

    db.session.commit()
    return {"message": "About section updated", "about": serialize_about(about)}


def handle_create(model_class, serializer, data, required_fields, assignments):
    missing = require_fields(data, required_fields)
    if missing:
        return {"message": f"Missing required fields: {', '.join(missing)}"}, 400

    item = model_class()
    for payload_key, model_key in assignments.items():
        if payload_key in data:
            setattr(item, model_key, data[payload_key])
    db.session.add(item)
    db.session.commit()
    return {"message": "Item created", "item": serializer(item)}, 201


def handle_update(item, serializer, data, assignments):
    for payload_key, model_key in assignments.items():
        if payload_key in data:
            setattr(item, model_key, data[payload_key])
    db.session.commit()
    return {"message": "Item updated", "item": serializer(item)}


@admin_bp.get("/skills")
@jwt_required()
def list_skills():
    if not admin_only():
        return unauthorized_response()
    items = Skill.query.order_by(Skill.position.asc()).all()
    return serialize_collection(items, serialize_skill)


@admin_bp.post("/skills")
@jwt_required()
def create_skill():
    if not admin_only():
        return unauthorized_response()
    data = request.get_json() or {}
    return handle_create(
        Skill,
        serialize_skill,
        data,
        ["name", "category", "level"],
        {
            "name": "name",
            "category": "category",
            "level": "level",
            "icon": "icon",
            "description": "description",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.put("/skills/<int:item_id>")
@jwt_required()
def update_skill(item_id):
    if not admin_only():
        return unauthorized_response()
    item = Skill.query.get_or_404(item_id)
    data = request.get_json() or {}
    return handle_update(
        item,
        serialize_skill,
        data,
        {
            "name": "name",
            "category": "category",
            "level": "level",
            "icon": "icon",
            "description": "description",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.delete("/skills/<int:item_id>")
@jwt_required()
def delete_skill(item_id):
    if not admin_only():
        return unauthorized_response()
    item = Skill.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return {"message": "Skill deleted"}


@admin_bp.get("/projects")
@jwt_required()
def list_projects():
    if not admin_only():
        return unauthorized_response()
    items = Project.query.order_by(Project.position.asc()).all()
    return serialize_collection(items, serialize_project)


@admin_bp.post("/projects")
@jwt_required()
def create_project():
    if not admin_only():
        return unauthorized_response()

    data = request.get_json() or {}
    if isinstance(data.get("techStack"), list):
        data["techStack"] = ",".join(data["techStack"])

    return handle_create(
        Project,
        serialize_project,
        data,
        ["title", "description", "techStack"],
        {
            "title": "title",
            "description": "description",
            "longDescription": "long_description",
            "techStack": "tech_stack",
            "githubUrl": "github_url",
            "liveUrl": "live_url",
            "imageUrl": "image_url",
            "category": "category",
            "position": "position",
            "isFeatured": "is_featured",
            "isVisible": "is_visible",
        },
    )


@admin_bp.put("/projects/<int:item_id>")
@jwt_required()
def update_project(item_id):
    if not admin_only():
        return unauthorized_response()

    item = Project.query.get_or_404(item_id)
    data = request.get_json() or {}
    if isinstance(data.get("techStack"), list):
        data["techStack"] = ",".join(data["techStack"])

    return handle_update(
        item,
        serialize_project,
        data,
        {
            "title": "title",
            "description": "description",
            "longDescription": "long_description",
            "techStack": "tech_stack",
            "githubUrl": "github_url",
            "liveUrl": "live_url",
            "imageUrl": "image_url",
            "category": "category",
            "position": "position",
            "isFeatured": "is_featured",
            "isVisible": "is_visible",
        },
    )


@admin_bp.delete("/projects/<int:item_id>")
@jwt_required()
def delete_project(item_id):
    if not admin_only():
        return unauthorized_response()
    item = Project.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return {"message": "Project deleted"}


@admin_bp.get("/timeline")
@jwt_required()
def list_timeline():
    if not admin_only():
        return unauthorized_response()
    items = Experience.query.order_by(Experience.position.asc()).all()
    return serialize_collection(items, serialize_experience)


@admin_bp.post("/timeline")
@jwt_required()
def create_timeline():
    if not admin_only():
        return unauthorized_response()
    data = request.get_json() or {}
    return handle_create(
        Experience,
        serialize_experience,
        data,
        ["title", "organization", "timeline", "description", "type"],
        {
            "title": "title",
            "organization": "organization",
            "timeline": "timeline",
            "description": "description",
            "type": "type",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.put("/timeline/<int:item_id>")
@jwt_required()
def update_timeline(item_id):
    if not admin_only():
        return unauthorized_response()
    item = Experience.query.get_or_404(item_id)
    data = request.get_json() or {}
    return handle_update(
        item,
        serialize_experience,
        data,
        {
            "title": "title",
            "organization": "organization",
            "timeline": "timeline",
            "description": "description",
            "type": "type",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.delete("/timeline/<int:item_id>")
@jwt_required()
def delete_timeline(item_id):
    if not admin_only():
        return unauthorized_response()
    item = Experience.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return {"message": "Timeline item deleted"}


@admin_bp.get("/achievements")
@jwt_required()
def list_achievements():
    if not admin_only():
        return unauthorized_response()
    items = Achievement.query.order_by(Achievement.position.asc()).all()
    return serialize_collection(items, serialize_achievement)


@admin_bp.post("/achievements")
@jwt_required()
def create_achievement():
    if not admin_only():
        return unauthorized_response()
    data = request.get_json() or {}
    return handle_create(
        Achievement,
        serialize_achievement,
        data,
        ["title", "issuer", "timeline", "description"],
        {
            "title": "title",
            "issuer": "issuer",
            "timeline": "timeline",
            "description": "description",
            "linkUrl": "link_url",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.put("/achievements/<int:item_id>")
@jwt_required()
def update_achievement(item_id):
    if not admin_only():
        return unauthorized_response()
    item = Achievement.query.get_or_404(item_id)
    data = request.get_json() or {}
    return handle_update(
        item,
        serialize_achievement,
        data,
        {
            "title": "title",
            "issuer": "issuer",
            "timeline": "timeline",
            "description": "description",
            "linkUrl": "link_url",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.delete("/achievements/<int:item_id>")
@jwt_required()
def delete_achievement(item_id):
    if not admin_only():
        return unauthorized_response()
    item = Achievement.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return {"message": "Achievement deleted"}


@admin_bp.get("/services")
@jwt_required()
def list_services():
    if not admin_only():
        return unauthorized_response()
    items = Service.query.order_by(Service.position.asc()).all()
    return serialize_collection(items, serialize_service)


@admin_bp.post("/services")
@jwt_required()
def create_service():
    if not admin_only():
        return unauthorized_response()
    data = request.get_json() or {}
    return handle_create(
        Service,
        serialize_service,
        data,
        ["title", "description"],
        {
            "title": "title",
            "description": "description",
            "icon": "icon",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.put("/services/<int:item_id>")
@jwt_required()
def update_service(item_id):
    if not admin_only():
        return unauthorized_response()
    item = Service.query.get_or_404(item_id)
    data = request.get_json() or {}
    return handle_update(
        item,
        serialize_service,
        data,
        {
            "title": "title",
            "description": "description",
            "icon": "icon",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.delete("/services/<int:item_id>")
@jwt_required()
def delete_service(item_id):
    if not admin_only():
        return unauthorized_response()
    item = Service.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return {"message": "Service deleted"}


@admin_bp.get("/testimonials")
@jwt_required()
def list_testimonials():
    if not admin_only():
        return unauthorized_response()
    items = Testimonial.query.order_by(Testimonial.position.asc()).all()
    return serialize_collection(items, serialize_testimonial)


@admin_bp.post("/testimonials")
@jwt_required()
def create_testimonial():
    if not admin_only():
        return unauthorized_response()
    data = request.get_json() or {}
    return handle_create(
        Testimonial,
        serialize_testimonial,
        data,
        ["name", "role", "company", "quote"],
        {
            "name": "name",
            "role": "role",
            "company": "company",
            "quote": "quote",
            "avatarUrl": "avatar_url",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.put("/testimonials/<int:item_id>")
@jwt_required()
def update_testimonial(item_id):
    if not admin_only():
        return unauthorized_response()
    item = Testimonial.query.get_or_404(item_id)
    data = request.get_json() or {}
    return handle_update(
        item,
        serialize_testimonial,
        data,
        {
            "name": "name",
            "role": "role",
            "company": "company",
            "quote": "quote",
            "avatarUrl": "avatar_url",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.delete("/testimonials/<int:item_id>")
@jwt_required()
def delete_testimonial(item_id):
    if not admin_only():
        return unauthorized_response()
    item = Testimonial.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return {"message": "Testimonial deleted"}


@admin_bp.get("/blog-posts")
@jwt_required()
def list_blog_posts():
    if not admin_only():
        return unauthorized_response()
    items = BlogPost.query.order_by(BlogPost.position.asc()).all()
    return serialize_collection(items, serialize_blog_post)


@admin_bp.post("/blog-posts")
@jwt_required()
def create_blog_post():
    if not admin_only():
        return unauthorized_response()
    data = request.get_json() or {}
    return handle_create(
        BlogPost,
        serialize_blog_post,
        data,
        ["title", "summary", "slug", "publishedAt", "readTime", "category"],
        {
            "title": "title",
            "summary": "summary",
            "slug": "slug",
            "coverUrl": "cover_url",
            "publishedAt": "published_at",
            "readTime": "read_time",
            "category": "category",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.put("/blog-posts/<int:item_id>")
@jwt_required()
def update_blog_post(item_id):
    if not admin_only():
        return unauthorized_response()
    item = BlogPost.query.get_or_404(item_id)
    data = request.get_json() or {}
    return handle_update(
        item,
        serialize_blog_post,
        data,
        {
            "title": "title",
            "summary": "summary",
            "slug": "slug",
            "coverUrl": "cover_url",
            "publishedAt": "published_at",
            "readTime": "read_time",
            "category": "category",
            "position": "position",
            "isVisible": "is_visible",
        },
    )


@admin_bp.delete("/blog-posts/<int:item_id>")
@jwt_required()
def delete_blog_post(item_id):
    if not admin_only():
        return unauthorized_response()
    item = BlogPost.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return {"message": "Blog post deleted"}


@admin_bp.get("/sections")
@jwt_required()
def list_sections():
    if not admin_only():
        return unauthorized_response()
    items = SectionSetting.query.order_by(SectionSetting.id.asc()).all()
    return serialize_collection(items, serialize_section)


@admin_bp.put("/sections/<int:item_id>")
@jwt_required()
def update_section(item_id):
    if not admin_only():
        return unauthorized_response()
    item = SectionSetting.query.get_or_404(item_id)
    data = request.get_json() or {}
    return handle_update(
        item,
        serialize_section,
        data,
        {"label": "label", "isVisible": "is_visible"},
    )


@admin_bp.post("/upload")
@jwt_required()
def upload_file():
    if not admin_only():
        return unauthorized_response()

    if "file" not in request.files:
        return {"message": "No file part in request"}, 400

    file = request.files["file"]
    if not file.filename:
        return {"message": "No file selected"}, 400

    extension = file.filename.rsplit(".", 1)[-1].lower()
    if extension not in ALLOWED_EXTENSIONS:
        return {"message": "Unsupported file type"}, 400

    filename = secure_filename(file.filename)
    unique_filename = f"{uuid4().hex}-{filename}"
    upload_dir = Path(current_app.config["UPLOAD_FOLDER"])
    upload_dir.mkdir(parents=True, exist_ok=True)
    save_path = upload_dir / unique_filename
    file.save(save_path)

    if extension == "pdf":
        resume_path = upload_dir / "resume.pdf"
        file.stream.seek(0)
        file.save(resume_path)

    return {
        "message": "File uploaded successfully",
        "fileUrl": f"/uploads/{unique_filename}",
        "absolutePath": str(save_path),
    }


@admin_bp.get("/messages")
@jwt_required()
def list_messages():
    if not admin_only():
        return unauthorized_response()
    items = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return serialize_collection(items, serialize_contact)
