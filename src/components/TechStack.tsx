"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import Container, { SubContainer } from "./Container";

const techStack = [
  "Next.js",
  "React",
  "React Native",
  "Node.js",
  "TypeScript",
  "MongoDB",
  "PostgreSQL",
  "Express",
  "Strapi",
  "AWS",
  "CI/CD",
];

export default function TechStack() {
  return (
    <Section backgroundColor="gray">
      <Container maxWidth="7xl">
        <SubContainer>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold mb-16 font-heading text-center"
            style={{ color: "var(--foreground)" }}
          >
            Tech Stack
          </motion.h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
          {techStack.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="px-5 py-2.5 border rounded-full font-medium text-sm transition-all tracking-wide"
              style={{
                backgroundColor: "var(--card-bg)",
                color: "var(--badge-text)",
                borderColor: "var(--badge-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--badge-hover-bg)";
                e.currentTarget.style.borderColor = "var(--badge-border-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--card-bg)";
                e.currentTarget.style.borderColor = "var(--badge-border)";
              }}
            >
              {tech}
            </motion.span>
          ))}
          </div>
        </SubContainer>
      </Container>
    </Section>
  );
}


