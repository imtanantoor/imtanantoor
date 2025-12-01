"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Experience as ExperienceType } from "@/lib/strapi/types";
import { getExperience } from "@/lib/strapi/queries";
import { formatDateRange, getImageUrl } from "@/lib/strapi/utils";
import Section from "./Section";
import Container, { SubContainer } from "./Container";
import { ACCENT_COLOR } from "@/lib/theme";

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExperience() {
      try {
        const data = await getExperience();
        setExperiences(data);
      } catch (error) {
        console.error("Failed to load experience:", error);
      } finally {
        setLoading(false);
      }
    }
    loadExperience();
  }, []);

  return (
    <Section id="experience" className="text-white" style={{ backgroundColor: ACCENT_COLOR }}>
      <Container maxWidth="7xl">
        <SubContainer>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-20 font-heading text-left"
          >
            Experience
          </motion.h2>
          {loading && (
            <div className="text-left text-white opacity-80">Loading experience...</div>
          )}
          {!loading && experiences.length === 0 && (
            <div className="text-left text-white opacity-80">No experience available yet.</div>
          )}
          {!loading && experiences.length > 0 && (
            <div className="space-y-10">
              {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-6 pb-10 border-b border-white/20 last:border-0"
            >
              {exp.logo && (
                <div className="shrink-0 w-16 h-16 rounded-lg bg-white/10 border border-white/20 overflow-hidden p-2">
                  <Image
                    src={getImageUrl(exp.logo)}
                    alt={exp.company}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                  {exp.role}
                </h3>
                <div className="text-lg text-white mb-2 opacity-90">{exp.company}</div>
                <div className="text-white mb-1 text-sm opacity-80">
                  {formatDateRange(exp.startDate, exp.endDate)}
                </div>
                <div className="text-white text-sm mb-3 opacity-70">{exp.location}</div>
                {exp.description && (
                  <p className="text-white mt-4 leading-relaxed text-[15px] opacity-90">
                    {exp.description}
                  </p>
                )}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.skills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-white/20 border border-white/30 text-white text-xs rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
              ))}
            </div>
          )}
        </SubContainer>
      </Container>
    </Section>
  );
}


