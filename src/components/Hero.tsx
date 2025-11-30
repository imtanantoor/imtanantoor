"use client";

import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import Section from "./Section";
import Container, { SubContainer } from "./Container";
import TypingText from "./TypingText";

const techStack = ["Next.js", "React", "React Native", "Node.js", "TypeScript", "AWS"];

// Customer-focused hero texts - short and concise
const heroTexts = [
  "I help achieve tech goals",
  "I build apps that grow",
  "I turn ideas into revenue",
  "I create scalable solutions",
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
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api"}/site-setting?populate=*`
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
    "I transform your business challenges into powerful digital solutions. From concept to launch, I deliver apps that drive growth and exceed expectations.";

  const linkedinUrl = siteSettings?.socialLinks?.linkedin || "https://linkedin.com";
  const githubUrl = siteSettings?.socialLinks?.github || "https://github.com";
  const toptalUrl = siteSettings?.socialLinks?.toptal || "https://www.toptal.com/resume/imtanan-aziz-toor";

  return (
    <Section className="min-h-screen flex items-center justify-center pt-40">
      <Container maxWidth="5xl">
        <SubContainer className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-800 font-heading leading-tight">
            I am Imtanan
            <br />
            <TypingText texts={heroTexts} className="inline-block" />
          </h1>
        </motion.div>
        
        {/* Toptal Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-16 flex justify-center"
        >
          <a
            href={toptalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 transition-colors group"
          >
            <ToptalIcon size={16} />
            <span className="text-sm font-medium text-gray-700 tracking-wide">
              Top 1% Developer
            </span>
            <span className="text-gray-500 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-lg sm:text-xl text-gray-500 mb-16 leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
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
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={toptalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
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

