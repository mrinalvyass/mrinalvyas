import { motion } from "framer-motion";

import { SectionHeading } from "../common/SectionHeading";

export function TechStackVisualSection({ skills }) {
  return (
    <section id="techStack" className="content-section">
      <SectionHeading
        eyebrow="Tech Visualization"
        title="A graphical stack view for fast pattern recognition"
        description="The visual is intentionally dramatic, but the underlying message is simple: strong backend depth with modern frontend capability."
      />
      <div className="tech-visual glass-card">
        <div className="tech-core">
          <span>MV</span>
          <p>Full Stack Systems</p>
        </div>
        {skills.slice(0, 7).map((skill, index) => {
          const angle = (360 / Math.min(skills.length, 7)) * index;
          return (
            <motion.div
              key={skill.id}
              className="tech-node"
              style={{ transform: `rotate(${angle}deg) translateY(-170px) rotate(-${angle}deg)` }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06 }}
            >
              <strong>{skill.name}</strong>
              <span>{skill.level}%</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
