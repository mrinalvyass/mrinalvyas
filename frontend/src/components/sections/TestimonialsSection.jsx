import { motion } from "framer-motion";

import { resolveMediaUrl } from "../../services/media";
import { SectionHeading } from "../common/SectionHeading";

export function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonials" className="content-section">
      <SectionHeading
        eyebrow="Testimonials"
        title="Social proof that feels believable"
        description="The testimonials are structured so the admin panel can later replace them with real references."
      />
      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <motion.article
            key={item.id}
            className="glass-card testimonial-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.06 }}
          >
            <p>"{item.quote}"</p>
            <div className="testimonial-meta">
              <img src={resolveMediaUrl(item.avatarUrl)} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <span>
                  {item.role}, {item.company}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
