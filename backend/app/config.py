import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


def normalize_database_url(url):
    """Render may provide postgres://, while SQLAlchemy expects postgresql://."""
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql://", 1)
    return url


class Config:
    """Base configuration shared by all environments."""

    SECRET_KEY = os.getenv(
        "SECRET_KEY", "dev-secret-key-with-32-characters-min"
    )
    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY", "dev-jwt-secret-key-with-32-chars"
    )
    SQLALCHEMY_DATABASE_URI = normalize_database_url(
        os.getenv("DATABASE_URL", "sqlite:///portfolio.db")
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
    FRONTEND_URLS = [
        url.strip()
        for url in os.getenv(
            "FRONTEND_URLS",
            "http://localhost:5173,http://127.0.0.1:5173",
        ).split(",")
        if url.strip()
    ]
    GITHUB_USERNAME = os.getenv("GITHUB_USERNAME", "mrinalvyas")
    GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
    UPLOAD_FOLDER = str(BASE_DIR / "uploads")
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


def get_config():
    """Select config class based on the environment variable."""
    env = os.getenv("FLASK_ENV", "development").lower()
    if env == "production":
        return ProductionConfig
    return DevelopmentConfig
