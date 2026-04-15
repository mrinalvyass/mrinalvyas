import os

from flask import current_app

from ..extensions import db
from ..models import (
    About,
    Achievement,
    BlogPost,
    Experience,
    Project,
    SectionSetting,
    Service,
    Skill,
    Testimonial,
    User,
)


def seed_database(reset=False):
    """Create starter content, optionally resetting all existing records."""
    admin_email = os.getenv("ADMIN_EMAIL", "admin@portfolio.dev")
    admin_password = os.getenv("ADMIN_PASSWORD", "Admin@123")

    if reset:
        # Local reseeding should recreate the whole demo database.
        db.drop_all()

    db.create_all()

    if not reset and User.query.first():
        # Production deploys must never wipe existing portfolio content.
        return

    admin = User(email=admin_email)
    admin.set_password(admin_password)
    db.session.add(admin)

    bio = (
        "Mrinal Vyas is a full stack software developer focused on building scalable "
        "web applications, backend systems, and AI-assisted products. He works across "
        "Laravel, Flask, React, PHP, Python, JavaScript, and relational databases to "
        "deliver reliable user experiences backed by thoughtful architecture."
    )
    objective = (
        "To contribute as a product-minded engineer who can translate business needs "
        "into robust full-stack systems, combining clean backend design, maintainable "
        "frontend experiences, and practical problem solving."
    )

    db.session.add(
        About(
            full_name="Mrinal Vyas",
            title="Full Stack Software Developer",
            headline="Designing scalable web products with strong backend architecture and premium frontend execution.",
            intro="I build efficient, real-world digital systems using Flask, Laravel, React, and modern engineering practices.",
            bio=bio,
            objective=objective,
            location="India",
            email="hello@mrinalvyas.dev",
            phone="",
            github_url="https://github.com/mrinalvyas",
            linkedin_url="https://www.linkedin.com/in/mrinal-vyas",
            website_url="https://mrinalvyas.dev",
            resume_url="/api/public/resume",
            avatar_url="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
            years_experience=3,
            availability="Open to impactful full-stack opportunities",
        )
    )

    skills = [
        Skill(
            name="React.js",
            category="Frontend",
            level=90,
            icon="PanelsTopLeft",
            description="Building responsive interfaces with reusable component systems.",
            position=1,
        ),
        Skill(
            name="JavaScript",
            category="Frontend",
            level=88,
            icon="FileCode2",
            description="Crafting interactive client-side experiences and dynamic UIs.",
            position=2,
        ),
        Skill(
            name="Laravel",
            category="Backend",
            level=92,
            icon="ServerCog",
            description="Developing scalable applications and secure backend workflows.",
            position=3,
        ),
        Skill(
            name="Flask",
            category="Backend",
            level=93,
            icon="Webhook",
            description="Designing clean REST APIs, admin systems, and service layers.",
            position=4,
        ),
        Skill(
            name="Python",
            category="Backend",
            level=94,
            icon="BrainCircuit",
            description="Building automation, APIs, integrations, and AI-enabled tools.",
            position=5,
        ),
        Skill(
            name="PHP",
            category="Backend",
            level=89,
            icon="CodeXml",
            description="Implementing maintainable server-side business logic.",
            position=6,
        ),
        Skill(
            name="MySQL",
            category="Tools",
            level=91,
            icon="DatabaseZap",
            description="Designing schema structure, queries, and reliable persistence layers.",
            position=7,
        ),
    ]
    db.session.add_all(skills)

    projects = [
        Project(
            title="AI Workflow Studio",
            description="A workflow platform that combines Flask APIs, AI-assisted processing, and clean dashboard experiences.",
            long_description="Built as a full-stack system focused on automation-heavy use cases. The project blends backend orchestration, API design, and clear interface patterns to support real-world business workflows.",
            tech_stack="Flask,Python,React.js,MySQL,AI",
            github_url="https://github.com/mrinalvyas",
            live_url="https://example.com",
            image_url="https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80",
            category="AI Systems",
            position=1,
            is_featured=True,
            is_visible=True,
        ),
        Project(
            title="Laravel Operations Hub",
            description="A robust admin and operations platform created with Laravel, MySQL, and a polished frontend workflow.",
            long_description="Designed for teams that need secure role-based access, clean data management, and operational speed. Emphasis was placed on backend structure, maintainability, and business-focused UX.",
            tech_stack="Laravel,PHP,MySQL,JavaScript",
            github_url="https://github.com/mrinalvyas",
            live_url="https://example.com",
            image_url="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
            category="Business Platform",
            position=2,
            is_featured=True,
            is_visible=True,
        ),
        Project(
            title="Full-Stack Client Portal",
            description="A React and Flask application for secure communication, project visibility, and internal reporting.",
            long_description="Created as an end-to-end delivery portal with reusable frontend components, database-backed reporting, and a backend layer optimized for clean separation of concerns.",
            tech_stack="React.js,Flask,Python,JavaScript,MySQL",
            github_url="https://github.com/mrinalvyas",
            live_url="https://example.com",
            image_url="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
            category="Client Systems",
            position=3,
            is_featured=True,
            is_visible=True,
        ),
    ]
    db.session.add_all(projects)

    timeline = [
        Experience(
            title="Full Stack Software Developer",
            organization="Independent & Project-Based Work",
            timeline="2022 - Present",
            description="Built multiple production-focused projects using Flask, Laravel, and AI-based systems with a strong emphasis on backend quality, full-stack delivery, and database design.",
            type="experience",
            position=1,
        ),
        Experience(
            title="Backend and Database-Focused Engineer",
            organization="Full-Stack Web Development",
            timeline="2021 - Present",
            description="Worked extensively on API design, data modeling, admin workflows, and scalable application structure while delivering complete web products end to end.",
            type="experience",
            position=2,
        ),
        Experience(
            title="Computer Science Education",
            organization="Academic Foundation",
            timeline="Education",
            description="Built a strong foundation in programming, web development, databases, and software problem solving.",
            type="education",
            position=3,
        ),
    ]
    db.session.add_all(timeline)

    achievements = [
        Achievement(
            title="Built AI-Enabled Product Workflows",
            issuer="Project Delivery",
            timeline="2024",
            description="Designed and delivered systems that combine web workflows with AI-based capabilities to solve real operational problems.",
            position=1,
        ),
        Achievement(
            title="Delivered Multi-Stack Web Projects",
            issuer="Engineering Practice",
            timeline="2023 - 2025",
            description="Successfully implemented projects across Flask, Laravel, React, and relational databases with strong backend architecture.",
            position=2,
        ),
        Achievement(
            title="Backend Architecture and Data Design Strength",
            issuer="Technical Capability",
            timeline="Ongoing",
            description="Known for structuring APIs, services, and database models clearly for maintainability and growth.",
            position=3,
        ),
    ]
    db.session.add_all(achievements)

    services = [
        Service(
            title="Full-Stack Product Development",
            description="Building complete web applications from planning and APIs to polished frontend delivery.",
            icon="Layers3",
            position=1,
        ),
        Service(
            title="Backend & API Engineering",
            description="Designing maintainable service architecture, secure endpoints, and scalable server-side logic.",
            icon="Server",
            position=2,
        ),
        Service(
            title="Database Design",
            description="Creating relational schemas, query strategy, and data flows optimized for reliability and growth.",
            icon="Database",
            position=3,
        ),
        Service(
            title="AI-Based Systems Integration",
            description="Connecting automation and AI capabilities into practical business workflows.",
            icon="Sparkles",
            position=4,
        ),
    ]
    db.session.add_all(services)

    testimonials = [
        Testimonial(
            name="Aarav Shah",
            role="Product Manager",
            company="Nimbus Labs",
            quote="Mrinal brings backend clarity and product ownership together. He consistently turns rough concepts into reliable working systems.",
            avatar_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
            position=1,
        ),
        Testimonial(
            name="Riya Kapoor",
            role="Founder",
            company="OpsPilot",
            quote="He has a strong instinct for scalable architecture and communicates technical decisions in a way non-technical stakeholders can trust.",
            avatar_url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
            position=2,
        ),
    ]
    db.session.add_all(testimonials)

    blog_posts = [
        BlogPost(
            title="Designing Flask APIs That Stay Maintainable",
            summary="Thoughts on keeping service layers, validation, and data models clean as projects grow.",
            slug="designing-flask-apis",
            cover_url="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1000&q=80",
            published_at="2026-03-18",
            read_time="6 min read",
            category="Backend",
            position=1,
        ),
        BlogPost(
            title="Why Strong Database Design Improves Product Speed",
            summary="A practical look at how schema quality affects developer productivity and feature velocity.",
            slug="database-design-product-speed",
            cover_url="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1000&q=80",
            published_at="2026-02-02",
            read_time="5 min read",
            category="Architecture",
            position=2,
        ),
    ]
    db.session.add_all(blog_posts)

    sections = [
        SectionSetting(section_key="hero", label="Hero", is_visible=True),
        SectionSetting(section_key="about", label="About Me", is_visible=True),
        SectionSetting(section_key="skills", label="Skills", is_visible=True),
        SectionSetting(section_key="projects", label="Projects", is_visible=True),
        SectionSetting(section_key="experience", label="Experience", is_visible=True),
        SectionSetting(section_key="education", label="Education", is_visible=True),
        SectionSetting(section_key="achievements", label="Achievements", is_visible=True),
        SectionSetting(section_key="services", label="Services", is_visible=True),
        SectionSetting(section_key="techStack", label="Tech Stack Visual", is_visible=True),
        SectionSetting(section_key="testimonials", label="Testimonials", is_visible=True),
        SectionSetting(section_key="blog", label="Blog", is_visible=True),
        SectionSetting(section_key="contact", label="Contact", is_visible=True),
    ]
    db.session.add_all(sections)

    os.makedirs(current_app.config["UPLOAD_FOLDER"], exist_ok=True)
    db.session.commit()
