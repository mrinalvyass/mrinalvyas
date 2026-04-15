import requests
from flask import current_app


def fetch_github_projects():
    """Fetch public repositories for the configured GitHub user."""
    username = current_app.config["GITHUB_USERNAME"]
    token = current_app.config.get("GITHUB_TOKEN")
    headers = {"Accept": "application/vnd.github+json"}

    if token:
        headers["Authorization"] = f"Bearer {token}"

    response = requests.get(
        f"https://api.github.com/users/{username}/repos",
        headers=headers,
        params={"sort": "updated", "per_page": 6},
        timeout=10,
    )
    response.raise_for_status()

    projects = []
    for repo in response.json():
        if repo.get("fork"):
            continue
        projects.append(
            {
                "id": f"github-{repo['id']}",
                "title": repo["name"].replace("-", " ").title(),
                "description": repo.get("description")
                or "GitHub repository synced from the public profile.",
                "techStack": [repo.get("language") or "Code", "GitHub API"],
                "githubUrl": repo.get("html_url"),
                "liveUrl": repo.get("homepage"),
                "imageUrl": None,
                "category": "GitHub",
                "source": "github",
                "position": 999,
                "isFeatured": True,
                "isVisible": True,
            }
        )

    return projects
