"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PortfolioProject } from "@/lib/strapi/types";
import { getPortfolioProjects } from "@/lib/strapi/queries";
import PortfolioCard from "./PortfolioCard";
import Section from "./Section";
import Container, { SubContainer } from "./Container";

// Dummy data for preview
const dummyProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    description: "Built a scalable e-commerce platform with real-time inventory management and payment processing.",
    fullDescription: "<p>Developed a full-stack e-commerce solution using Next.js and Node.js. The platform handles thousands of daily transactions with 99.9% uptime.</p>",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    images: [],
    impact: [
      { metric: "Monthly Revenue", value: "$500K+" },
      { metric: "Uptime", value: "99.9%" },
      { metric: "Response Time", value: "<200ms" }
    ],
    category: "saas" as const,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Mobile Banking App",
    slug: "mobile-banking-app",
    description: "React Native mobile application for a regional bank with biometric authentication and real-time transactions.",
    fullDescription: "<p>Created a secure mobile banking application with React Native. Features include biometric login, real-time balance updates, and transaction history.</p>",
    techStack: ["React Native", "Node.js", "MongoDB", "AWS", "Firebase"],
    images: [],
    impact: [
      { metric: "Active Users", value: "50K+" },
      { metric: "App Rating", value: "4.8/5" },
      { metric: "Crash Rate", value: "<0.1%" }
    ],
    category: "mobile" as const,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Corporate Website Redesign",
    slug: "corporate-website-redesign",
    description: "Complete redesign of corporate website with improved SEO, performance optimization, and modern UI/UX.",
    fullDescription: "<p>Redesigned and rebuilt a corporate website from scratch using Next.js. Achieved 95+ Lighthouse score and improved conversion rates by 40%.</p>",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    images: [],
    impact: [
      { metric: "Page Speed", value: "95+" },
      { metric: "Conversion Rate", value: "+40%" },
      { metric: "SEO Score", value: "98/100" }
    ],
    category: "website" as const,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>(dummyProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show dummy data immediately
    setLoading(false);
    
    async function loadProjects() {
      try {
        const data = await getPortfolioProjects();
        // Use API data if available, otherwise keep dummy data
        if (data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to load portfolio projects:", error);
        // Keep dummy data on error
      }
    }
    
    // Try to load from API in background
    loadProjects();
  }, []);

  return (
    <Section id="work" backgroundColor="white">
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
            Portfolio
          </motion.h2>
          {loading ? (
          <div className="text-left" style={{ color: "var(--text-muted)" }}>Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-left" style={{ color: "var(--text-muted)" }}>
            No projects available yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </div>
          )}
        </SubContainer>
      </Container>
    </Section>
  );
}


