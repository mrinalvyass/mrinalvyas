#!/usr/bin/env bash
set -e

# Create tables and starter data only when the production database is empty.
python - <<'PY'
from app import create_app
from app.utils.seed import seed_database

app = create_app()
with app.app_context():
    seed_database(reset=False)
PY

gunicorn run:app --bind 0.0.0.0:${PORT:-10000}
