import { motion } from "framer-motion";

import { SectionHeading } from "../common/SectionHeading";

export function ExperienceSection({ items, title, eyebrow, sectionId }) {
  return (
    <section id={sectionId} className="content-section">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description="Animated timeline cards keep the story structured and easy to absorb."
      />
      <div className="timeline">
        {items.map((item, index) => (
          <motion.article
            key={item.id}
            className="timeline-item glass-card"
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <span className="timeline-pill">{item.timeline}</span>
            <h3>{item.title}</h3>
            <strong>{item.organization}</strong>
            <p>{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
