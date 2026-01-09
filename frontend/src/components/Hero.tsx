"use client";

import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import Section from "./Section";
import Container, { SubContainer } from "./Container";
import TypingText from "./TypingText";
import { ACCENT_COLOR } from "@/lib/theme";

const techStack = [
  "Next.js",
  "React",
  "React Native",
  "Node.js",
  "TypeScript",
  "AWS",
];

// Customer-focused hero texts - short and concise
const heroTexts = [
  "Production-ready MVPs",
  "Speed with structure",
  "No tech babysitting",
];

interface SiteSettings {
  heroTitle?: string;
  heroSubtitle?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    toptal?: string;
  };
}

// Toptal Icon SVG - Stylized T
const ToptalIcon = ({ size = 22 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L4 8v8l8 6 8-6V8L12 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M12 8v8M8 12h8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function Hero() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_STRAPI_API_URL ||
            "http://localhost:1337/api"
          }/site-setting?populate=*`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setSiteSettings({
              heroTitle: data.data.attributes?.heroTitle,
              heroSubtitle: data.data.attributes?.heroSubtitle,
              socialLinks: data.data.attributes?.socialLinks,
            });
          }
        }
      } catch {
        // Fallback to default values if Strapi is not available
        console.log("Using default hero content");
      }
    }
    loadSettings();
  }, []);

  const subtitle =
    siteSettings?.heroSubtitle ||
    "For non-technical founders with a clear idea and timeline pressure. I build production-ready web and mobile MVPs that reduce your risk, protect your reputation, and get you to market fast. No technical hand-holding needed—just a structured process that delivers real products in 8–12 weeks.";

  const linkedinUrl =
    siteSettings?.socialLinks?.linkedin || "https://linkedin.com";
  const githubUrl = siteSettings?.socialLinks?.github || "https://github.com";
  const toptalUrl =
    siteSettings?.socialLinks?.toptal ||
    "https://www.toptal.com/resume/imtanan-aziz-toor";

  return (
    <Section className="min-h-screen flex items-center justify-center pt-32 pb-20">
      <Container maxWidth="5xl">
        <SubContainer className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="mb-8"
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-heading leading-tight max-w-4xl mx-auto"
              style={{ color: "var(--foreground)" }}
            >
              From Idea to Production-Ready MVP in 8–12 Weeks
            </h1>
            <div className="mt-4 mb-6">
              <p
                className="text-lg sm:text-xl font-normal opacity-70"
                style={{ color: "var(--text-secondary)" }}
              >
                <TypingText texts={heroTexts} className="inline-block" />
              </p>
            </div>
          </motion.div>

          {/* Toptal Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mb-8 flex justify-center"
          >
            <a
              href={toptalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-full transition-colors group"
              style={{
                backgroundColor: "var(--badge-bg)",
                borderColor: "var(--badge-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--badge-hover-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--badge-bg)";
              }}
            >
              <ToptalIcon size={16} />
              <span
                className="text-sm font-medium tracking-wide"
                style={{ color: "var(--badge-text)" }}
              >
                Top 1% Developer
              </span>
              <span
                className="group-hover:translate-x-1 transition-transform"
                style={{ color: "var(--text-secondary)" }}
              >
                →
              </span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-base sm:text-lg mb-8 leading-relaxed max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="mb-10"
          >
            <a
              href="#contact"
              className="inline-block px-6 py-3 text-base font-semibold !text-white rounded-lg transition-all tracking-wide shadow-md hover:shadow-lg hover:opacity-90"
              style={{
                backgroundColor: ACCENT_COLOR,
              }}
            >
              Discuss Your Idea
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-2 mb-8"
          >
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full font-medium border"
                style={{
                  backgroundColor: "var(--badge-bg)",
                  color: "var(--badge-text)",
                  borderColor: "var(--badge-border)",
                }}
              >
                {tech}
              </span>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex items-center justify-center gap-3"
          >
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={toptalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--foreground)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
              aria-label="Toptal"
            >
              <ToptalIcon size={20} />
            </a>
          </motion.div>
        </SubContainer>
      </Container>
    </Section>
  );
}
