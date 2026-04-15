from flask import Flask, current_app, send_from_directory

from .blueprints.admin import admin_bp
from .blueprints.auth import auth_bp
from .blueprints.public import public_bp
from .config import get_config
from .extensions import cors, db, jwt


def create_app():
    """Application factory used by Flask and tests."""
    app = Flask(__name__)
    app.config.from_object(get_config())

    # Initialize shared Flask extensions in one place.
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(
        app,
        resources={r"/api/*": {"origins": app.config["FRONTEND_URLS"]}},
        supports_credentials=True,
    )

    # Register API blueprints with clear prefixes.
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(public_bp, url_prefix="/api/public")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")

    @app.get("/api/health")
    def health_check():
        return {"status": "ok", "message": "Portfolio API is running"}

    @app.get("/uploads/<path:filename>")
    def uploaded_file(filename):
        """Expose uploaded files for local development and simple deployments."""
        return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)

    with app.app_context():
        # Ensure the local database exists before the first request.
        db.create_all()

    return app
