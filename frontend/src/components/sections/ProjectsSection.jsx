import { motion } from "framer-motion";
import { ArrowUpRight, Filter, Github } from "lucide-react";
import { useMemo, useState } from "react";

import { resolveMediaUrl } from "../../services/media";
import { ProjectModal } from "../common/ProjectModal";
import { SectionHeading } from "../common/SectionHeading";

export function ProjectsSection({ projectData, filters }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = projectData.all || [];
  const filterOptions = ["All", ...(filters || [])];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }
    return projects.filter((project) => project.techStack.includes(activeFilter));
  }, [activeFilter, projects]);

  return (
    <section id="projects" className="content-section">
      <SectionHeading
        eyebrow="Projects"
        title="Featured work plus live GitHub presence"
        description="Filters make the portfolio easier to navigate, while the details modal helps recruiters go deeper without leaving the page."
      />
      <div className="filters-row glass-card">
        <Filter size={16} />
        <div className="filter-chips">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-chip interactive ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            className="project-card glass-card interactive"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.04 }}
          >
            <div
              className="project-image"
              style={{
                backgroundImage: project.imageUrl
                  ? `linear-gradient(180deg, rgba(8, 12, 30, 0.08), rgba(8, 12, 30, 0.86)), url(${resolveMediaUrl(project.imageUrl)})`
                  : undefined,
              }}
            >
              <span>{project.category || project.source}</span>
            </div>
            <div className="project-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-list">
                {project.techStack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Github size={16} />
                    Code
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <ArrowUpRight size={16} />
                    Live
                  </a>
                )}
                <button
                  type="button"
                  className="secondary-button interactive"
                  onClick={() => setSelectedProject(project)}
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
