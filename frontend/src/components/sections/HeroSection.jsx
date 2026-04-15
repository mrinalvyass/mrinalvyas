import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  Orbit,
} from "lucide-react";

import { useTypewriter } from "../../hooks/useTypewriter";
import { resolveMediaUrl } from "../../services/media";

export function HeroSection({ about }) {
  const typedRole = useTypewriter(
    ["Full Stack Software Developer", "Flask + Laravel Builder", "Backend Architecture Specialist"],
    85,
    1600
  );

  if (!about) {
    return null;
  }

  return (
    <section className="hero-panel" id="hero">
      <div className="hero-copy">
        <span className="eyebrow">Premium Developer Portfolio</span>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {about.fullName}
          <span className="typed-line">
            {typedRole}
            <i />
          </span>
        </motion.h1>
        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          {about.headline}
        </motion.p>
        <motion.p
          className="hero-support"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          {about.intro}
        </motion.p>
        <div className="hero-badges">
          <span>{about.yearsExperience}+ years building products</span>
          <span>{about.availability}</span>
          <span>Flask • Laravel • React • MySQL</span>
        </div>
        <div className="hero-actions">
          <a href="#projects" className="primary-button interactive">
            Explore Work
            <ArrowRight size={16} />
          </a>
          <a
            href={resolveMediaUrl(about.resumeUrl)}
            className="secondary-button interactive"
            target="_blank"
            rel="noreferrer"
          >
            <Download size={16} />
            Resume
          </a>
        </div>
        <div className="social-actions">
          <a href={about.githubUrl} target="_blank" rel="noreferrer" className="interactive">
            <Github size={16} />
            GitHub
          </a>
          <a href={about.linkedinUrl} target="_blank" rel="noreferrer" className="interactive">
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a href={`mailto:${about.email}`} className="interactive">
            <Mail size={16} />
            Email
          </a>
        </div>
      </div>

      <motion.div
        className="hero-visual glass-card"
        animate={{ rotateX: [0, 4, -2, 0], rotateY: [0, -5, 3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="visual-hud">
          <div className="avatar-frame">
            <img src={resolveMediaUrl(about.avatarUrl)} alt={about.fullName} />
          </div>
          <div className="signal-card">
            <span className="eyebrow">Interface Signal</span>
            <strong>{about.title}</strong>
            <p>{about.location}</p>
          </div>
        </div>
        <div className="orbit-panel">
          <Orbit size={18} />
          <p>Systems built with backend depth, product focus, and high-clarity execution.</p>
        </div>
      </motion.div>
    </section>
  );
}
