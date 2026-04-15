from pathlib import Path
import os
import sys


def bootstrap_local_venv():
    """Allow `python run.py` to work without manually activating `.venv`."""
    project_dir = Path(__file__).resolve().parent
    lib_dir = project_dir / ".venv" / "lib"

    if not lib_dir.exists():
        return

    candidates = sorted(lib_dir.glob("python*/site-packages"))
    if not candidates:
        return

    site_packages = str(candidates[-1])
    if site_packages not in sys.path:
        sys.path.insert(0, site_packages)


bootstrap_local_venv()

from app import create_app
from app.utils.seed import seed_database


app = create_app()


@app.cli.command("seed")
def seed_command():
    """Populate the database with starter portfolio content."""
    seed_database(reset=True)
    print("Database seeded successfully.")


if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", "5050")))
