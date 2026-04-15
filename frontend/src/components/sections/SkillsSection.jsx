import { motion } from "framer-motion";

import { SectionHeading } from "../common/SectionHeading";

export function SkillsSection({ skills }) {
  const groupedSkills = skills.reduce((accumulator, skill) => {
    accumulator[skill.category] = accumulator[skill.category] || [];
    accumulator[skill.category].push(skill);
    return accumulator;
  }, {});

  return (
    <section id="skills" className="content-section">
      <SectionHeading
        eyebrow="Skills"
        title="Categorized for fast recruiter scanning"
        description="Each group presents a clear picture of where Mrinal adds value across frontend, backend, and tooling."
      />
      <div className="skill-groups">
        {Object.entries(groupedSkills).map(([category, items], groupIndex) => (
          <motion.article
            key={category}
            className="glass-card category-panel"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: groupIndex * 0.08 }}
          >
            <div className="category-header">
              <span className="eyebrow">{category}</span>
              <h3>{category} Systems</h3>
            </div>
            <div className="skills-grid">
              {items.map((skill, index) => (
                <div key={skill.id} className="skill-card">
                  <div className="skill-topline">
                    <div>
                      <h4>{skill.name}</h4>
                      <p>{skill.description}</p>
                    </div>
                    <strong>{skill.level}%</strong>
                  </div>
                  <div className="skill-bar">
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.04 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
