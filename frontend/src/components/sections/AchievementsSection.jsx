import { motion } from "framer-motion";
import { Award, Link2 } from "lucide-react";

import { SectionHeading } from "../common/SectionHeading";

export function AchievementsSection({ achievements }) {
  return (
    <section id="achievements" className="content-section">
      <SectionHeading
        eyebrow="Achievements"
        title="Signals of capability and trust"
        description="This section highlights the kind of work quality and technical strengths recruiters want to see quickly."
      />
      <div className="achievement-grid">
        {achievements.map((item, index) => (
          <motion.article
            key={item.id}
            className="glass-card achievement-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="service-icon">
              <Award size={20} />
            </div>
            <span className="timeline-pill">{item.timeline}</span>
            <h3>{item.title}</h3>
            <strong>{item.issuer}</strong>
            <p>{item.description}</p>
            {item.linkUrl && (
              <a href={item.linkUrl} target="_blank" rel="noreferrer" className="inline-link">
                <Link2 size={14} />
                View credential
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
