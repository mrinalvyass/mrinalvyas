from pathlib import Path

from flask import Blueprint, current_app, request, send_file

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
    serialize_experience,
    serialize_project,
    serialize_section,
    serialize_service,
    serialize_skill,
    serialize_testimonial,
)
from ..services.github_service import fetch_github_projects
from ..utils.validation import require_fields


public_bp = Blueprint("public", __name__)


@public_bp.get("/portfolio")
def get_portfolio():
    """Return a single payload for the public app to render the whole portfolio."""
    about = About.query.first()
    skills = Skill.query.filter_by(is_visible=True).order_by(Skill.position.asc()).all()
    manual_projects = (
        Project.query.filter_by(is_visible=True).order_by(Project.position.asc()).all()
    )
    timeline_items = (
        Experience.query.filter_by(is_visible=True)
        .order_by(Experience.position.asc())
        .all()
    )
    achievements = (
        Achievement.query.filter_by(is_visible=True)
        .order_by(Achievement.position.asc())
        .all()
    )
    services = (
        Service.query.filter_by(is_visible=True).order_by(Service.position.asc()).all()
    )
    testimonials = (
        Testimonial.query.filter_by(is_visible=True)
        .order_by(Testimonial.position.asc())
        .all()
    )
    blog_posts = (
        BlogPost.query.filter_by(is_visible=True).order_by(BlogPost.position.asc()).all()
    )
    sections = SectionSetting.query.order_by(SectionSetting.id.asc()).all()

    github_projects = []
    try:
        github_projects = fetch_github_projects()
    except Exception:
        # GitHub sync is a progressive enhancement, not a hard failure.
        github_projects = []

    experience_items = [
        serialize_experience(item) for item in timeline_items if item.type != "education"
    ]
    education_items = [
        serialize_experience(item) for item in timeline_items if item.type == "education"
    ]

    return {
        "about": serialize_about(about) if about else None,
        "skills": [serialize_skill(skill) for skill in skills],
        "projects": {
            "featured": [serialize_project(project) for project in manual_projects],
            "github": github_projects,
            "all": [serialize_project(project) for project in manual_projects]
            + github_projects,
        },
        "experience": experience_items,
        "education": education_items,
        "achievements": [serialize_achievement(item) for item in achievements],
        "services": [serialize_service(item) for item in services],
        "testimonials": [serialize_testimonial(item) for item in testimonials],
        "blogPosts": [serialize_blog_post(item) for item in blog_posts],
        "sections": [serialize_section(section) for section in sections],
        "meta": {
            "githubUsername": current_app.config["GITHUB_USERNAME"],
            "projectFilters": sorted(
                {
                    tech
                    for project in ([serialize_project(item) for item in manual_projects] + github_projects)
                    for tech in project["techStack"]
                }
            ),
        },
    }


@public_bp.post("/contact")
def create_contact_message():
    """Persist the contact form message and simulate email delivery."""
    data = request.get_json() or {}
    missing = require_fields(data, ["name", "email", "subject", "message"])
    if missing:
        return {"message": f"Missing required fields: {', '.join(missing)}"}, 400

    contact = ContactMessage(
        name=data["name"],
        email=data["email"],
        subject=data["subject"],
        message=data["message"],
        status="simulated_sent",
    )
    db.session.add(contact)
    db.session.commit()

    return {
        "message": "Message received successfully. Email delivery has been simulated.",
        "contactId": contact.id,
    }, 201


@public_bp.get("/resume")
def download_resume():
    """Serve the resume stored in the uploads folder."""
    resume_path = Path(current_app.config["UPLOAD_FOLDER"]) / "resume.pdf"
    if not resume_path.exists():
        return {"message": "Resume file not found"}, 404
    return send_file(resume_path, as_attachment=True, download_name="Mrinal-Vyas-Resume.pdf")


@public_bp.get("/github-status")
def github_status():
    return {"username": current_app.config["GITHUB_USERNAME"]}
