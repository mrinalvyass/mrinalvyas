import { motion } from "framer-motion";
import { Database, Goal, MapPin, Zap } from "lucide-react";

import { SectionHeading } from "../common/SectionHeading";

export function AboutSection({ about }) {
  if (!about) {
    return null;
  }

  return (
    <section id="about" className="content-section">
      <SectionHeading
        eyebrow="About Me"
        title="A complete professional snapshot, not just a short bio"
        description="This section is built to help recruiters understand technical depth, working style, and long-term product value in a few seconds."
      />
      <div className="about-grid premium-grid">
        <motion.article
          className="glass-card about-copy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p>{about.bio}</p>
          <p>{about.objective}</p>
        </motion.article>

        <motion.article
          className="glass-card insight-panel"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1 }}
        >
          <div className="mini-stat">
            <Zap size={18} />
            <div>
              <strong>Strength</strong>
              <p>Full-stack delivery with strong backend judgment</p>
            </div>
          </div>
          <div className="mini-stat">
            <Database size={18} />
            <div>
              <strong>Core Focus</strong>
              <p>API design, relational database structure, and scalable systems</p>
            </div>
          </div>
          <div className="mini-stat">
            <Goal size={18} />
            <div>
              <strong>Career Objective</strong>
              <p>{about.objective}</p>
            </div>
          </div>
          <div className="mini-stat">
            <MapPin size={18} />
            <div>
              <strong>Location</strong>
              <p>{about.location}</p>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
