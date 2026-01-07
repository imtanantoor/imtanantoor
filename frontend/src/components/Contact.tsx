"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Section from "./Section";
import Container, { SubContainer } from "./Container";
import { ACCENT_COLOR } from "@/lib/theme";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Implement form submission (Formspree, EmailJS, or API route)
    // For now, just simulate submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <Section id="contact" backgroundColor="white">
      <Container maxWidth="7xl">
        <SubContainer>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold mb-20 font-heading text-left"
            style={{ color: "var(--foreground)" }}
          >
            Get in Touch
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4 font-heading" style={{ color: "var(--foreground)" }}>
              Let's work together
            </h3>
            <p className="mb-8 leading-relaxed text-[15px]" style={{ color: "var(--text-secondary)" }}>
              Whether you're scaling to millions of users or solving complex
              infrastructure challenges, let's discuss how we can work together.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center transition-colors"
                style={{ color: "var(--foreground)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center transition-colors"
                style={{ color: "var(--foreground)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                aria-label="GitHub"
              >
                <FaGithub size={22} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="w-11 h-11 flex items-center justify-center transition-colors"
                style={{ color: "var(--foreground)" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--foreground)"}
                aria-label="Email"
              >
                <FaEnvelope size={22} />
              </a>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {submitted && (
              <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300 text-sm mb-4">
                Thank you! Your message has been sent.
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 tracking-wide"
                style={{ color: "var(--foreground)" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: "var(--border-color)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--foreground)",
                  "--tw-ring-color": ACCENT_COLOR,
                } as React.CSSProperties}
                onFocus={(e) => {
                  e.target.style.borderColor = ACCENT_COLOR;
                  e.target.style.boxShadow = `0 0 0 2px ${ACCENT_COLOR}40`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "";
                  e.target.style.boxShadow = "";
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 tracking-wide"
                style={{ color: "var(--foreground)" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: "var(--border-color)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--foreground)",
                  "--tw-ring-color": ACCENT_COLOR,
                } as React.CSSProperties}
                onFocus={(e) => {
                  e.target.style.borderColor = ACCENT_COLOR;
                  e.target.style.boxShadow = `0 0 0 2px ${ACCENT_COLOR}40`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "";
                  e.target.style.boxShadow = "";
                }}
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 tracking-wide"
                style={{ color: "var(--foreground)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all"
                style={{
                  borderColor: "var(--border-color)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--foreground)",
                  "--tw-ring-color": ACCENT_COLOR,
                } as React.CSSProperties}
                onFocus={(e) => {
                  e.target.style.borderColor = ACCENT_COLOR;
                  e.target.style.boxShadow = `0 0 0 2px ${ACCENT_COLOR}40`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "";
                  e.target.style.boxShadow = "";
                }}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-3 text-white rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed tracking-wide shadow-sm hover:shadow-md mt-4 hover:opacity-90"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
          </div>
        </SubContainer>
      </Container>
    </Section>
  );
}


