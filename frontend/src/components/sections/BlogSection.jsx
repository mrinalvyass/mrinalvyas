import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { resolveMediaUrl } from "../../services/media";
import { SectionHeading } from "../common/SectionHeading";

export function BlogSection({ blogPosts }) {
  return (
    <section id="blog" className="content-section">
      <SectionHeading
        eyebrow="Blog Structure"
        title="A ready-to-extend writing surface"
        description="The app includes a blog section structure so the portfolio can grow into a deeper thought-leadership product later."
      />
      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            className="glass-card blog-card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.05 }}
          >
            <div
              className="blog-cover"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(7, 10, 26, 0.08), rgba(7, 10, 26, 0.86)), url(${resolveMediaUrl(post.coverUrl)})`,
              }}
            />
            <div className="blog-body">
              <span className="timeline-pill">{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <div className="blog-meta">
                <span>{post.publishedAt}</span>
                <span>{post.readTime}</span>
              </div>
              <button type="button" className="secondary-button interactive">
                Read Structure
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
