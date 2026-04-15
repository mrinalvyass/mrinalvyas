import { LogOut, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminStatCard } from "../components/admin/AdminStatCard";
import { CrudPanel } from "../components/admin/CrudPanel";
import { UploadField } from "../components/admin/UploadField";
import { useAuth } from "../context/AuthContext";
import { adminApi } from "../services/api";

const skillFields = [
  { name: "name", label: "Skill" },
  { name: "category", label: "Category" },
  { name: "level", label: "Level", type: "number", defaultValue: 80 },
  { name: "icon", label: "Icon" },
  { name: "description", label: "Description", multiline: true },
  { name: "position", label: "Position", type: "number", defaultValue: 0 },
  { name: "isVisible", label: "Visible", type: "checkbox", defaultValue: true },
];

const projectFields = [
  { name: "title", label: "Title" },
  { name: "category", label: "Category" },
  { name: "description", label: "Short Description", multiline: true },
  { name: "longDescription", label: "Long Description", multiline: true },
  { name: "techStack", label: "Tech Stack (comma separated)" },
  { name: "githubUrl", label: "GitHub URL" },
  { name: "liveUrl", label: "Live URL" },
  { name: "imageUrl", label: "Image URL" },
  { name: "position", label: "Position", type: "number", defaultValue: 0 },
  { name: "isFeatured", label: "Featured", type: "checkbox", defaultValue: true },
  { name: "isVisible", label: "Visible", type: "checkbox", defaultValue: true },
];

const timelineFields = [
  { name: "title", label: "Title" },
  { name: "organization", label: "Organization" },
  { name: "timeline", label: "Timeline" },
  { name: "type", label: "Type (experience or education)" },
  { name: "description", label: "Description", multiline: true },
  { name: "position", label: "Position", type: "number", defaultValue: 0 },
  { name: "isVisible", label: "Visible", type: "checkbox", defaultValue: true },
];

const achievementFields = [
  { name: "title", label: "Title" },
  { name: "issuer", label: "Issuer" },
  { name: "timeline", label: "Timeline" },
  { name: "description", label: "Description", multiline: true },
  { name: "linkUrl", label: "Link URL" },
  { name: "position", label: "Position", type: "number", defaultValue: 0 },
  { name: "isVisible", label: "Visible", type: "checkbox", defaultValue: true },
];

const serviceFields = [
  { name: "title", label: "Title" },
  { name: "icon", label: "Icon" },
  { name: "description", label: "Description", multiline: true },
  { name: "position", label: "Position", type: "number", defaultValue: 0 },
  { name: "isVisible", label: "Visible", type: "checkbox", defaultValue: true },
];

const testimonialFields = [
  { name: "name", label: "Name" },
  { name: "role", label: "Role" },
  { name: "company", label: "Company" },
  { name: "quote", label: "Quote", multiline: true },
  { name: "avatarUrl", label: "Avatar URL" },
  { name: "position", label: "Position", type: "number", defaultValue: 0 },
  { name: "isVisible", label: "Visible", type: "checkbox", defaultValue: true },
];

const blogFields = [
  { name: "title", label: "Title" },
  { name: "category", label: "Category" },
  { name: "slug", label: "Slug" },
  { name: "publishedAt", label: "Published At" },
  { name: "readTime", label: "Read Time" },
  { name: "coverUrl", label: "Cover URL" },
  { name: "summary", label: "Summary", multiline: true },
  { name: "position", label: "Position", type: "number", defaultValue: 0 },
  { name: "isVisible", label: "Visible", type: "checkbox", defaultValue: true },
];

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [about, setAbout] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [sections, setSections] = useState([]);
  const [aboutStatus, setAboutStatus] = useState("");

  async function loadData() {
    const [
      dashboardData,
      aboutData,
      skillsData,
      projectsData,
      timelineData,
      achievementsData,
      servicesData,
      testimonialsData,
      blogPostsData,
      sectionsData,
    ] = await Promise.all([
      adminApi.getDashboard(),
      adminApi.getAbout(),
      adminApi.getSkills(),
      adminApi.getProjects(),
      adminApi.getTimeline(),
      adminApi.getAchievements(),
      adminApi.getServices(),
      adminApi.getTestimonials(),
      adminApi.getBlogPosts(),
      adminApi.getSections(),
    ]);

    setDashboard(dashboardData);
    setAbout(aboutData.about);
    setSkills(skillsData.items);
    setProjects(
      projectsData.items.map((item) => ({
        ...item,
        techStack: item.techStack.join(", "),
      }))
    );
    setTimeline(timelineData.items);
    setAchievements(achievementsData.items);
    setServices(servicesData.items);
    setTestimonials(testimonialsData.items);
    setBlogPosts(blogPostsData.items);
    setSections(sectionsData.items);
  }

  useEffect(() => {
    loadData().catch(() => navigate("/admin/login"));
  }, [navigate]);

  async function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  async function saveAbout(event) {
    event.preventDefault();
    await adminApi.updateAbout(about);
    setAboutStatus("Profile content updated successfully.");
    await loadData();
  }

  async function refreshAfter(task) {
    await task();
    await loadData();
  }

  if (!dashboard || !about) {
    return <main className="admin-dashboard-shell">Loading dashboard...</main>;
  }

  return (
    <main className="admin-dashboard-shell">
      <header className="admin-dashboard-header glass-card">
        <div>
          <span className="eyebrow">Admin Control Room</span>
          <h1>{user?.email}</h1>
          <p>Manage the full digital identity experience from one dashboard.</p>
        </div>
        <div className="admin-dashboard-actions">
          <button className="secondary-button interactive" onClick={() => loadData()}>
            <RefreshCcw size={16} />
            Refresh
          </button>
          <button className="secondary-button interactive" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <section className="admin-stats-grid">
        <AdminStatCard label="Projects" value={dashboard.stats.projects} />
        <AdminStatCard label="Skills" value={dashboard.stats.skills} />
        <AdminStatCard label="Timeline" value={dashboard.stats.timeline} />
        <AdminStatCard label="Services" value={dashboard.stats.services} />
        <AdminStatCard label="Testimonials" value={dashboard.stats.testimonials} />
        <AdminStatCard label="Blog" value={dashboard.stats.blogPosts} />
        <AdminStatCard label="Achievements" value={dashboard.stats.achievements} />
        <AdminStatCard label="Messages" value={dashboard.stats.messages} />
      </section>

      <section className="glass-card admin-panel-card">
        <div className="admin-panel-header">
          <div>
            <span className="eyebrow">Profile Manager</span>
            <h3>About, Resume, and Identity Settings</h3>
          </div>
        </div>
        <form className="admin-form" onSubmit={saveAbout}>
          <div className="admin-form-grid">
            <label>
              Full Name
              <input
                value={about.fullName || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, fullName: event.target.value }))
                }
              />
            </label>
            <label>
              Title
              <input
                value={about.title || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, title: event.target.value }))
                }
              />
            </label>
            <label className="full-width">
              Headline
              <input
                value={about.headline || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, headline: event.target.value }))
                }
              />
            </label>
            <label className="full-width">
              Intro
              <textarea
                rows="3"
                value={about.intro || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, intro: event.target.value }))
                }
              />
            </label>
            <label className="full-width">
              Professional Bio
              <textarea
                rows="4"
                value={about.bio || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, bio: event.target.value }))
                }
              />
            </label>
            <label className="full-width">
              Career Objective
              <textarea
                rows="4"
                value={about.objective || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, objective: event.target.value }))
                }
              />
            </label>
            <label>
              Location
              <input
                value={about.location || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, location: event.target.value }))
                }
              />
            </label>
            <label>
              Email
              <input
                value={about.email || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, email: event.target.value }))
                }
              />
            </label>
            <label>
              Phone
              <input
                value={about.phone || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, phone: event.target.value }))
                }
              />
            </label>
            <label>
              GitHub URL
              <input
                value={about.githubUrl || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, githubUrl: event.target.value }))
                }
              />
            </label>
            <label>
              LinkedIn URL
              <input
                value={about.linkedinUrl || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, linkedinUrl: event.target.value }))
                }
              />
            </label>
            <label>
              Website URL
              <input
                value={about.websiteUrl || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, websiteUrl: event.target.value }))
                }
              />
            </label>
            <label>
              Avatar URL
              <input
                value={about.avatarUrl || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, avatarUrl: event.target.value }))
                }
              />
            </label>
            <label>
              Resume URL
              <input
                value={about.resumeUrl || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, resumeUrl: event.target.value }))
                }
              />
            </label>
            <label>
              Years of Experience
              <input
                type="number"
                value={about.yearsExperience || 0}
                onChange={(event) =>
                  setAbout((current) => ({
                    ...current,
                    yearsExperience: Number(event.target.value),
                  }))
                }
              />
            </label>
            <label>
              Availability
              <input
                value={about.availability || ""}
                onChange={(event) =>
                  setAbout((current) => ({ ...current, availability: event.target.value }))
                }
              />
            </label>
            <UploadField
              label="Upload Avatar"
              onUploaded={(fileUrl) =>
                setAbout((current) => ({ ...current, avatarUrl: fileUrl }))
              }
            />
            <UploadField
              label="Upload Resume PDF"
              onUploaded={() =>
                setAbout((current) => ({
                  ...current,
                  resumeUrl: "/api/public/resume",
                }))
              }
            />
          </div>
          <button className="primary-button interactive" type="submit">
            Save Identity
          </button>
          {aboutStatus && <p className="status-message success">{aboutStatus}</p>}
        </form>
      </section>

      <CrudPanel
        title="Skills"
        fields={skillFields}
        items={skills}
        itemLabel="Skill"
        onCreate={(payload) => refreshAfter(() => adminApi.createSkill(payload))}
        onUpdate={(id, payload) => refreshAfter(() => adminApi.updateSkill(id, payload))}
        onDelete={(id) => refreshAfter(() => adminApi.deleteSkill(id))}
      />

      <CrudPanel
        title="Projects"
        fields={projectFields}
        items={projects}
        itemLabel="Project"
        onCreate={(payload) =>
          refreshAfter(() =>
            adminApi.createProject({
              ...payload,
              techStack: payload.techStack
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            })
          )
        }
        onUpdate={(id, payload) =>
          refreshAfter(() =>
            adminApi.updateProject(id, {
              ...payload,
              techStack: payload.techStack
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            })
          )
        }
        onDelete={(id) => refreshAfter(() => adminApi.deleteProject(id))}
        extraFormContent={(form, setForm) => (
          <UploadField
            label="Upload project image"
            onUploaded={(fileUrl) =>
              setForm((current) => ({ ...current, imageUrl: fileUrl }))
            }
          />
        )}
      />

      <CrudPanel
        title="Timeline"
        fields={timelineFields}
        items={timeline}
        itemLabel="Entry"
        onCreate={(payload) => refreshAfter(() => adminApi.createTimeline(payload))}
        onUpdate={(id, payload) => refreshAfter(() => adminApi.updateTimeline(id, payload))}
        onDelete={(id) => refreshAfter(() => adminApi.deleteTimeline(id))}
      />

      <CrudPanel
        title="Achievements"
        fields={achievementFields}
        items={achievements}
        itemLabel="Achievement"
        onCreate={(payload) => refreshAfter(() => adminApi.createAchievement(payload))}
        onUpdate={(id, payload) =>
          refreshAfter(() => adminApi.updateAchievement(id, payload))
        }
        onDelete={(id) => refreshAfter(() => adminApi.deleteAchievement(id))}
      />

      <CrudPanel
        title="Services"
        fields={serviceFields}
        items={services}
        itemLabel="Service"
        onCreate={(payload) => refreshAfter(() => adminApi.createService(payload))}
        onUpdate={(id, payload) => refreshAfter(() => adminApi.updateService(id, payload))}
        onDelete={(id) => refreshAfter(() => adminApi.deleteService(id))}
      />

      <CrudPanel
        title="Testimonials"
        fields={testimonialFields}
        items={testimonials}
        itemLabel="Testimonial"
        onCreate={(payload) => refreshAfter(() => adminApi.createTestimonial(payload))}
        onUpdate={(id, payload) =>
          refreshAfter(() => adminApi.updateTestimonial(id, payload))
        }
        onDelete={(id) => refreshAfter(() => adminApi.deleteTestimonial(id))}
        extraFormContent={(form, setForm) => (
          <UploadField
            label="Upload testimonial avatar"
            onUploaded={(fileUrl) =>
              setForm((current) => ({ ...current, avatarUrl: fileUrl }))
            }
          />
        )}
      />

      <CrudPanel
        title="Blog Structure"
        fields={blogFields}
        items={blogPosts}
        itemLabel="Post"
        onCreate={(payload) => refreshAfter(() => adminApi.createBlogPost(payload))}
        onUpdate={(id, payload) => refreshAfter(() => adminApi.updateBlogPost(id, payload))}
        onDelete={(id) => refreshAfter(() => adminApi.deleteBlogPost(id))}
        extraFormContent={(form, setForm) => (
          <UploadField
            label="Upload blog cover"
            onUploaded={(fileUrl) =>
              setForm((current) => ({ ...current, coverUrl: fileUrl }))
            }
          />
        )}
      />

      <section className="glass-card admin-panel-card">
        <div className="admin-panel-header">
          <div>
            <span className="eyebrow">Section Visibility</span>
            <h3>Toggle Public Sections</h3>
          </div>
        </div>
        <div className="toggle-grid">
          {sections.map((section) => (
            <label key={section.id} className="toggle-card">
              <div>
                <strong>{section.label}</strong>
                <p>{section.sectionKey}</p>
              </div>
              <input
                type="checkbox"
                checked={section.isVisible}
                onChange={async (event) => {
                  await refreshAfter(() =>
                    adminApi.updateSection(section.id, {
                      isVisible: event.target.checked,
                    })
                  );
                }}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="glass-card admin-panel-card">
        <div className="admin-panel-header">
          <div>
            <span className="eyebrow">Inbox</span>
            <h3>Contact Messages</h3>
          </div>
        </div>
        <div className="admin-list">
          {dashboard.messages.map((message) => (
            <article key={message.id} className="admin-list-item stacked">
              <div>
                <strong>{message.subject}</strong>
                <p>
                  {message.name} • {message.email}
                </p>
                <p>{message.message}</p>
              </div>
              <span className="timeline-pill">{message.status}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
