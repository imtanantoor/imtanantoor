"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaMobileAlt, FaCloud, FaGlobe } from "react-icons/fa";
import Section from "./Section";
import Container, { SubContainer } from "./Container";
import { ACCENT_COLOR } from "@/lib/theme";

const services = [
  {
    icon: FaMobileAlt,
    title: "Mobile Application Development",
    description:
      "Building cross-platform mobile applications using React Native. Delivering native-like performance and seamless user experiences.",
    category: "mobile",
  },
  {
    icon: FaCloud,
    title: "SaaS Development",
    description:
      "Creating scalable Software-as-a-Service solutions. From MVP to enterprise-grade platforms with robust architecture and security.",
    category: "saas",
  },
  {
    icon: FaGlobe,
    title: "Website Development",
    description:
      "Developing modern, responsive websites with Next.js and React. Optimized for performance, SEO, and exceptional user experience.",
    category: "website",
  },
];

export default function Services() {
  return (
    <Section id="services" backgroundColor="white">
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
            Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 flex items-center justify-start mb-6">
                  <service.icon className="text-3xl group-hover:scale-110 transition-transform duration-300" style={{ color: "var(--foreground)" }} />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 font-heading" style={{ color: "var(--foreground)" }}>
                {service.title}
              </h3>
              <p className="mb-6 leading-relaxed text-[15px]" style={{ color: "var(--text-secondary)" }}>
                {service.description}
              </p>
              <Link
                href={`#work?category=${service.category}`}
                className="font-medium inline-flex items-center gap-2 transition-colors text-sm tracking-wide group/link hover:opacity-70"
                style={{ color: ACCENT_COLOR }}
              >
                {service.category} projects
                <span className="group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          ))}
          </div>
        </SubContainer>
      </Container>
    </Section>
  );
}


