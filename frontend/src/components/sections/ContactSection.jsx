import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

import { publicApi } from "../../services/api";
import { SectionHeading } from "../common/SectionHeading";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactSection({ about }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setSubmitting(true);
      const response = await publicApi.sendMessage(form);
      setStatus({ type: "success", message: response.message });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to send your message right now.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="content-section">
      <SectionHeading
        eyebrow="Contact"
        title="Ready for engineering conversations that matter"
        description="The contact flow stores messages in the backend and keeps the handoff to the admin panel seamless."
      />
      <div className="contact-layout">
        <motion.article
          className="glass-card contact-info-panel"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className="eyebrow">Reach Out</span>
          <h3>{about.fullName}</h3>
          <p>{about.title}</p>
          <div className="contact-meta">
            <span>
              <Mail size={16} />
              {about.email}
            </span>
            <span>
              <MapPin size={16} />
              {about.location}
            </span>
          </div>
        </motion.article>

        <motion.form
          className="glass-card contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1 }}
        >
          <div className="form-grid">
            <label>
              Name
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
                required
              />
            </label>
          </div>
          <label>
            Subject
            <input
              value={form.subject}
              onChange={(event) =>
                setForm((current) => ({ ...current, subject: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Message
            <textarea
              rows="6"
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value }))
              }
              required
            />
          </label>
          <button className="primary-button interactive" type="submit" disabled={submitting}>
            <Send size={16} />
            {submitting ? "Sending..." : "Send Message"}
          </button>
          {status.message && (
            <p className={`status-message ${status.type}`}>{status.message}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
