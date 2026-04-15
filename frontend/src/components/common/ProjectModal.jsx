import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

import { resolveMediaUrl } from "../../services/media";

export function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-card glass-card"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.97 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="modal-close" onClick={onClose}>
              <X size={18} />
            </button>
            <div
              className="modal-hero"
              style={{
                backgroundImage: project.imageUrl
                  ? `linear-gradient(180deg, rgba(4, 10, 28, 0.14), rgba(4, 10, 28, 0.88)), url(${resolveMediaUrl(project.imageUrl)})`
                  : undefined,
              }}
            />
            <div className="modal-body">
              <span className="eyebrow">{project.category || project.source}</span>
              <h3>{project.title}</h3>
              <p>{project.longDescription || project.description}</p>
              <div className="tag-list">
                {project.techStack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="project-links">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Github size={16} />
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <ExternalLink size={16} />
                    Live Preview
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
