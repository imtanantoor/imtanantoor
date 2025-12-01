"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PortfolioProject } from "@/lib/strapi/types";
import { getPortfolioProjects } from "@/lib/strapi/queries";
import PortfolioCard from "./PortfolioCard";
import Section from "./Section";
import Container, { SubContainer } from "./Container";

export default function Portfolio() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getPortfolioProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load portfolio projects:", error);
      } finally {
        setLoading(false);
      }
    }

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
            <div className="text-left" style={{ color: "var(--text-muted)" }}>
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="text-left" style={{ color: "var(--text-muted)" }}>
              No projects available yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </SubContainer>
      </Container>
    </Section>
  );
}
