"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Section from "./Section";
import Container, { SubContainer } from "./Container";
import { ACCENT_COLOR } from "@/lib/theme";

type ProjectType = "web" | "mobile" | "saas" | "other";
type ProjectStage = "idea" | "planning" | "in_progress" | "redesign";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project_type: "" as ProjectType | "",
    project_stage: "" as ProjectStage | "",
    project_goal: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.project_type) {
      newErrors.project_type = "Please select a project type";
    }

    if (!formData.project_stage) {
      newErrors.project_stage = "Please select a project stage";
    }

    if (!formData.project_goal.trim()) {
      newErrors.project_goal = "Project goal is required";
    } else if (formData.project_goal.trim().length < 10) {
      newErrors.project_goal = "Please provide at least 10 characters describing your project goal";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (response.status === 400 && data.details) {
          const validationErrors: Record<string, string> = {};
          data.details.forEach((error: string) => {
            if (error.includes("Name")) validationErrors.name = error;
            else if (error.includes("Email")) validationErrors.email = error;
            else if (error.includes("Project type")) validationErrors.project_type = error;
            else if (error.includes("Project stage")) validationErrors.project_stage = error;
            else if (error.includes("Project goal")) validationErrors.project_goal = error;
          });
          setErrors(validationErrors);
          setSubmitError("Please correct the errors above.");
        } else {
          setSubmitError(data.error || "Failed to submit. Please try again later.");
        }
        setSubmitting(false);
        return;
      }

      // Success
      setSubmitted(true);
      setFormData({ 
        name: "", 
        email: "", 
        project_type: "" as ProjectType | "",
        project_stage: "" as ProjectStage | "",
        project_goal: "" 
      });
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
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
            Request a Project Estimate
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4 font-heading" style={{ color: "var(--foreground)" }}>
              Discuss Your Project
            </h3>
            <p className="mb-8 leading-relaxed text-[15px]" style={{ color: "var(--text-secondary)" }}>
              Share your project details to receive a tailored estimate. I&apos;ll review your requirements and provide a clear timeline and scope for your project.
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
              <div className="p-3 text-sm mb-4 font-medium rounded-lg border message-success">
                Thank you! Your project details have been received. I&apos;ll review and respond within 24 hours.
              </div>
            )}
            {submitError && (
              <div className="p-3 text-sm mb-4 font-medium rounded-lg border message-error">
                {submitError}
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 tracking-wide"
                style={{ color: "var(--foreground)" }}
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: errors.name ? "#ef4444" : "var(--border-color)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--foreground)",
                  "--tw-ring-color": ACCENT_COLOR,
                } as React.CSSProperties}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.name ? "#ef4444" : ACCENT_COLOR;
                  e.target.style.boxShadow = `0 0 0 2px ${errors.name ? "#ef444440" : `${ACCENT_COLOR}40`}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.name ? "#ef4444" : "";
                  e.target.style.boxShadow = "";
                }}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 tracking-wide"
                style={{ color: "var(--foreground)" }}
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                style={{
                  borderColor: errors.email ? "#ef4444" : "var(--border-color)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--foreground)",
                  "--tw-ring-color": ACCENT_COLOR,
                } as React.CSSProperties}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.email ? "#ef4444" : ACCENT_COLOR;
                  e.target.style.boxShadow = `0 0 0 2px ${errors.email ? "#ef444440" : `${ACCENT_COLOR}40`}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email ? "#ef4444" : "";
                  e.target.style.boxShadow = "";
                }}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="project_type"
                className="block text-sm font-medium mb-2 tracking-wide"
                style={{ color: "var(--foreground)" }}
              >
                Project Type <span className="text-red-500">*</span>
              </label>
              <select
                id="project_type"
                required
                value={formData.project_type}
                onChange={(e) => {
                  setFormData({ ...formData, project_type: e.target.value as ProjectType });
                  if (errors.project_type) setErrors({ ...errors, project_type: "" });
                }}
                className="w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none bg-no-repeat bg-right"
                style={{
                  borderColor: errors.project_type ? "#ef4444" : "var(--border-color)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--foreground)",
                  "--tw-ring-color": ACCENT_COLOR,
                  backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundSize: "1.5em 1.5em",
                } as React.CSSProperties}
                onFocus={(e) => {
                  if (!errors.project_type) {
                    e.target.style.borderColor = ACCENT_COLOR;
                    e.target.style.boxShadow = `0 0 0 2px ${ACCENT_COLOR}40`;
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.project_type ? "#ef4444" : "var(--border-color)";
                  e.target.style.boxShadow = "";
                }}
              >
                <option value="">Select project type</option>
                <option value="web">Website / Web Application</option>
                <option value="mobile">Mobile Application</option>
                <option value="saas">SaaS Platform</option>
                <option value="other">Other</option>
              </select>
              {errors.project_type && (
                <p className="mt-1 text-sm text-red-500">{errors.project_type}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="project_stage"
                className="block text-sm font-medium mb-2 tracking-wide"
                style={{ color: "var(--foreground)" }}
              >
                Project Stage <span className="text-red-500">*</span>
              </label>
              <select
                id="project_stage"
                required
                value={formData.project_stage}
                onChange={(e) => {
                  setFormData({ ...formData, project_stage: e.target.value as ProjectStage });
                  if (errors.project_stage) setErrors({ ...errors, project_stage: "" });
                }}
                className="w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all appearance-none bg-no-repeat bg-right"
                style={{
                  borderColor: errors.project_stage ? "#ef4444" : "var(--border-color)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--foreground)",
                  "--tw-ring-color": ACCENT_COLOR,
                  backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                  backgroundSize: "1.5em 1.5em",
                } as React.CSSProperties}
                onFocus={(e) => {
                  if (!errors.project_stage) {
                    e.target.style.borderColor = ACCENT_COLOR;
                    e.target.style.boxShadow = `0 0 0 2px ${ACCENT_COLOR}40`;
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.project_stage ? "#ef4444" : "var(--border-color)";
                  e.target.style.boxShadow = "";
                }}
              >
                <option value="">Select project stage</option>
                <option value="idea">Idea / Concept</option>
                <option value="planning">Planning / Requirements</option>
                <option value="in_progress">In Progress / Needs Help</option>
                <option value="redesign">Redesign / Improvement</option>
              </select>
              {errors.project_stage && (
                <p className="mt-1 text-sm text-red-500">{errors.project_stage}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="project_goal"
                className="block text-sm font-medium mb-2 tracking-wide"
                style={{ color: "var(--foreground)" }}
              >
                Project Goal <span className="text-red-500">*</span>
              </label>
              <textarea
                id="project_goal"
                required
                rows={4}
                value={formData.project_goal}
                onChange={(e) => {
                  setFormData({ ...formData, project_goal: e.target.value });
                  if (errors.project_goal) setErrors({ ...errors, project_goal: "" });
                }}
                placeholder="Describe what you want to achieve with this project (minimum 10 characters)"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none transition-all"
                style={{
                  borderColor: errors.project_goal ? "#ef4444" : "var(--border-color)",
                  backgroundColor: "var(--card-bg)",
                  color: "var(--foreground)",
                  "--tw-ring-color": ACCENT_COLOR,
                } as React.CSSProperties}
                onFocus={(e) => {
                  e.target.style.borderColor = errors.project_goal ? "#ef4444" : ACCENT_COLOR;
                  e.target.style.boxShadow = `0 0 0 2px ${errors.project_goal ? "#ef444440" : `${ACCENT_COLOR}40`}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.project_goal ? "#ef4444" : "";
                  e.target.style.boxShadow = "";
                }}
              />
              {errors.project_goal && (
                <p className="mt-1 text-sm text-red-500">{errors.project_goal}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-3 text-white rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed tracking-wide shadow-sm hover:shadow-md mt-4 hover:opacity-90"
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              {submitting ? "Submitting..." : "Request Project Estimate"}
            </button>
          </motion.form>
          </div>
        </SubContainer>
      </Container>
    </Section>
  );
}


