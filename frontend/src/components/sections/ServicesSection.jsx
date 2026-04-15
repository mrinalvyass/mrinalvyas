import { motion } from "framer-motion";
import { Blocks, Bot, Database, Globe2, Server } from "lucide-react";

import { SectionHeading } from "../common/SectionHeading";

const iconMap = {
  Layers3: Blocks,
  Server: Server,
  Database: Database,
  Sparkles: Bot,
};

export function ServicesSection({ services }) {
  return (
    <section id="services" className="content-section">
      <SectionHeading
        eyebrow="Services"
        title="What Mrinal can build and improve"
        description="These service cards frame technical skills as recruiter-friendly outcomes."
      />
      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon] || Globe2;
          return (
            <motion.article
              key={service.id}
              className="glass-card service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="service-icon">
                <Icon size={20} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
