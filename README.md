# Mrinal Vyas Portfolio

A premium futuristic personal portfolio web application built as a complete digital identity for **Mrinal Vyas**, a **Full Stack Software Developer**.

This project combines a Flask backend, a React frontend, a JWT-secured admin dashboard, GitHub project sync, a cinematic dark-mode UI, and editable content sections designed to impress recruiters and hiring teams quickly.

## Highlights

- Premium sci-fi inspired interface with neon glass styling
- Three.js animated background with floating particles
- Framer Motion section reveals and page transitions
- Custom futuristic cursor and hover interactions
- Typing animation in the hero section
- Categorized skills with animated progress bars
- Project filters and project details modal
- Experience and education timeline
- Achievements, services, testimonials, and blog structure
- Contact form with backend storage
- Resume download support
- Full admin dashboard with JWT auth and CRUD controls
- SQLite by default, PostgreSQL-ready through `DATABASE_URL`

## Tech Stack

### Backend

- Flask
- Flask Blueprints
- Flask SQLAlchemy
- Flask JWT Extended
- Flask CORS
- SQLite by default
- PostgreSQL via environment configuration

### Frontend

- React
- Vite
- React Router
- Axios
- Framer Motion
- Three.js
- Context API

## Folder Structure

```text
Portfolio/
├── backend/
│   ├── app/
│   │   ├── blueprints/
│   │   │   ├── admin.py
│   │   │   ├── auth.py
│   │   │   └── public.py
│   │   ├── services/
│   │   │   └── github_service.py
│   │   ├── utils/
│   │   │   ├── seed.py
│   │   │   └── validation.py
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── extensions.py
│   │   └── models.py
│   ├── uploads/
│   │   └── resume.pdf
│   ├── .env.example
│   ├── Procfile
│   ├── render_start.sh
│   ├── requirements.txt
│   ├── runtime.txt
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── sections/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── .gitignore
├── render.yaml
└── README.md
```

## Public Website Sections

The public site includes all requested sections:

1. Hero section with animated typing and strong call-to-action buttons
2. About section with professional summary and career objective
3. Categorized skills section with animated bars
4. Projects section with GitHub sync, filters, and details modal
5. Experience timeline
6. Education timeline
7. Achievements / certifications style section
8. Services section
9. Tech stack visualization
10. Contact section with backend storage
11. Resume download
12. Social links
13. Testimonials
14. Blog section structure

## Admin Dashboard Features

- Secure JWT login
- Edit core identity and about content
- Upload avatar images and resume PDF
- CRUD for skills
- CRUD for projects
- CRUD for timeline entries including experience and education
- CRUD for achievements
- CRUD for services
- CRUD for testimonials
- CRUD for blog section items
- Toggle sections on and off
- View contact messages submitted through the public site

## Backend Setup

### 1. Create and activate a virtual environment

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Important variables:

```env
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=change-me-with-at-least-32-characters
JWT_SECRET_KEY=change-me-too-with-at-least-32-characters
DATABASE_URL=sqlite:///portfolio.db
FRONTEND_URL=http://localhost:5173
FRONTEND_URLS=http://localhost:5173,http://127.0.0.1:5173
PORT=5050
GITHUB_USERNAME=mrinalvyas
GITHUB_TOKEN=
ADMIN_EMAIL=admin@portfolio.dev
ADMIN_PASSWORD=Admin@123
```

For PostgreSQL, set:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db
```

### 4. Seed the database

```bash
flask --app run.py seed
```

Note: the seed command recreates the local database with premium starter content for Mrinal Vyas.

### 5. Start the backend

```bash
python run.py
```

Backend URL:

```text
http://127.0.0.1:5050
```

## Frontend Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Default frontend environment:

```env
VITE_API_BASE_URL=http://127.0.0.1:5050/api
```

### 3. Start the frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Default Admin Login

After seeding the database:

- Email: `admin@portfolio.dev`
- Password: `Admin@123`

Change these before production deployment.

## Render Deployment

This repository is now Render-ready. It includes:

- `render.yaml` for Blueprint deployment
- `backend/render_start.sh` for safe production startup
- `backend/Procfile` for Render-style web process compatibility
- `gunicorn` for production Flask serving
- `psycopg2-binary` for Render PostgreSQL
- Safe production seeding that only creates starter content when the database is empty

### Recommended Render Architecture

```text
Render Static Site: React frontend
        |
        v
Render Web Service: Flask API
        |
        v
Render PostgreSQL
```

### Option A: Deploy With Render Blueprint

1. Push this project to GitHub.
2. Open Render Dashboard.
3. Click `New +`.
4. Select `Blueprint`.
5. Connect the GitHub repository.
6. Render will read `render.yaml`.
7. Set `ADMIN_PASSWORD` when Render asks for the secret value.
8. Deploy the services.
9. If Render changes the generated service URL because a name is unavailable, update `FRONTEND_URLS` on the backend and `VITE_API_BASE_URL` on the frontend.

The Blueprint creates:

- `mrinal-portfolio-db`
- `mrinal-portfolio-api`
- `mrinal-portfolio-web`

### Option B: Deploy Manually

Create a PostgreSQL database on Render first.

Backend service:

```text
Type: Web Service
Root Directory: backend
Build Command: pip install -r requirements.txt && chmod +x render_start.sh
Start Command: ./render_start.sh
```

Backend environment variables:

```env
FLASK_ENV=production
SECRET_KEY=use-a-long-random-secret
JWT_SECRET_KEY=use-another-long-random-secret
DATABASE_URL=your-render-postgres-connection-string
FRONTEND_URL=https://your-frontend-url.onrender.com
FRONTEND_URLS=https://your-frontend-url.onrender.com,http://localhost:5173,http://127.0.0.1:5173
GITHUB_USERNAME=mrinalvyas
GITHUB_TOKEN=
ADMIN_EMAIL=admin@portfolio.dev
ADMIN_PASSWORD=use-a-secure-password
```

Frontend static site:

```text
Type: Static Site
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: dist
```

Note: Render static sites do not need a `plan` field in `render.yaml`; the frontend service intentionally omits it.

Frontend environment variable:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

### Important Render Notes

- Use PostgreSQL for production, not SQLite.
- Render free services may sleep after inactivity.
- Uploaded files on free Render services are not guaranteed permanent unless persistent disk or external storage is configured.
- The bundled resume file works because it is committed in `backend/uploads/resume.pdf`.
- Admin uploads are best moved later to Cloudinary, S3, or another file storage provider.

## API Documentation

### Health

- `GET /api/health`

### Auth

- `POST /api/auth/login`

### Public Endpoints

- `GET /api/public/portfolio`
- `POST /api/public/contact`
- `GET /api/public/resume`
- `GET /api/public/github-status`

### Admin Endpoints

#### About

- `GET /api/admin/about`
- `PUT /api/admin/about`

#### Skills

- `GET /api/admin/skills`
- `POST /api/admin/skills`
- `PUT /api/admin/skills/:id`
- `DELETE /api/admin/skills/:id`

#### Projects

- `GET /api/admin/projects`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/:id`
- `DELETE /api/admin/projects/:id`

#### Timeline

- `GET /api/admin/timeline`
- `POST /api/admin/timeline`
- `PUT /api/admin/timeline/:id`
- `DELETE /api/admin/timeline/:id`

#### Achievements

- `GET /api/admin/achievements`
- `POST /api/admin/achievements`
- `PUT /api/admin/achievements/:id`
- `DELETE /api/admin/achievements/:id`

#### Services

- `GET /api/admin/services`
- `POST /api/admin/services`
- `PUT /api/admin/services/:id`
- `DELETE /api/admin/services/:id`

#### Testimonials

- `GET /api/admin/testimonials`
- `POST /api/admin/testimonials`
- `PUT /api/admin/testimonials/:id`
- `DELETE /api/admin/testimonials/:id`

#### Blog Structure

- `GET /api/admin/blog-posts`
- `POST /api/admin/blog-posts`
- `PUT /api/admin/blog-posts/:id`
- `DELETE /api/admin/blog-posts/:id`

#### Sections and Messages

- `GET /api/admin/sections`
- `PUT /api/admin/sections/:id`
- `GET /api/admin/messages`
- `GET /api/admin/dashboard`

#### Uploads

- `POST /api/admin/upload`

All admin endpoints require a Bearer JWT token.

## How the Admin Works

1. Sign in at `/admin/login`.
2. The JWT token is stored in local storage.
3. Axios automatically includes the token for protected API calls.
4. Use the dashboard panels to update portfolio content.
5. Use upload fields for avatar images, project visuals, testimonials, blog covers, and resume PDF.
6. Toggle any public section on or off without changing frontend code.
7. Review contact messages from the built-in inbox panel.

## Personal Data Applied in the Portfolio

The seeded portfolio uses the required identity details:

- Name: `Mrinal Vyas`
- Role: `Full Stack Software Developer`
- Skills: PHP, Python, Laravel, Flask, MySQL, JavaScript, React.js
- Experience focus: Flask, Laravel, AI-based systems, full-stack delivery, backend and database strength
- Professionalized bio and objective throughout the site

## Production Notes

- Replace the placeholder resume PDF in `backend/uploads/resume.pdf`
- Replace social URLs with final production links if needed
- Add a real mail provider for contact delivery
- Add proper file storage for production
- Serve Flask with Gunicorn or another WSGI server
- Add HTTPS, rate limiting, and stricter security middleware
- Add tests and CI/CD before deployment

## Verification Done

The current project has already been verified locally with:

- `flask --app run.py seed`
- `npm run build`
- Flask API smoke tests

## Future Improvements

- Real blog detail pages
- GitHub caching for lower API usage
- Rich text editing in admin
- Analytics and recruiter event tracking
- Docker-based deployment
- Automated tests for API and UI flows
