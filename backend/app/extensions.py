from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy


# Shared extension instances prevent circular imports across modules.
db = SQLAlchemy()
jwt = JWTManager()
cors = CORS()
