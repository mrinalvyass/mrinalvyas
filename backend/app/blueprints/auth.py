from flask import Blueprint, request
from flask_jwt_extended import create_access_token

from ..models import User
from ..utils.validation import require_fields


auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/login")
def login():
    """Authenticate the admin user and return a JWT."""
    data = request.get_json() or {}
    missing = require_fields(data, ["email", "password"])
    if missing:
        return {"message": f"Missing required fields: {', '.join(missing)}"}, 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user or not user.check_password(data["password"]):
        return {"message": "Invalid email or password"}, 401

    token = create_access_token(identity=str(user.id), additional_claims={"is_admin": True})
    return {
        "message": "Login successful",
        "accessToken": token,
        "user": {"id": user.id, "email": user.email, "isAdmin": user.is_admin},
    }
