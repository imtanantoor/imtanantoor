"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Experience as ExperienceType } from "@/lib/strapi/types";
import { getExperience } from "@/lib/strapi/queries";
import { formatDateRange, getImageUrl } from "@/lib/strapi/utils";
import Section from "./Section";
import Container, { SubContainer } from "./Container";

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExperience() {
      try {
        const data = await getExperience();
        // Use API data if available and not empty, otherwise use fallback
        if (data && data.length > 0) {
          setExperiences(data);
        } else {
          setExperiences([
          {
            id: 1,
            company: "SmashCloud",
            role: "Senior Frontend Developer",
            startDate: "2022-06-01",
            endDate: undefined,
            location: "Delaware, United States · Remote",
            current: true,
            order: 1,
            skills: [],
            publishedAt: new Date().toISOString(),
          },
          {
            id: 2,
            company: "Proximate Solutions",
            role: "Senior React and React Native Developer",
            startDate: "2020-11-01",
            endDate: "2022-06-01",
            location: "Lahore, Punjab, Pakistan",
            current: false,
            order: 2,
            skills: [],
            publishedAt: new Date().toISOString(),
          },
          {
            id: 3,
            company: "RepairDesk",
            role: "Jr. Software Engineer React Native",
            startDate: "2020-08-01",
            endDate: "2020-11-01",
            location: "Lahore District, Punjab, Pakistan",
            current: false,
            order: 3,
            skills: [],
            publishedAt: new Date().toISOString(),
          },
          {
            id: 4,
            company: "Coding Pixel USA",
            role: "React Js and React Native Developer",
            startDate: "2020-01-01",
            endDate: "2020-08-01",
            location: "Lahore District, Punjab, Pakistan",
            current: false,
            order: 4,
            skills: [],
            publishedAt: new Date().toISOString(),
          },
          {
            id: 5,
            company: "TOP SPOT",
            role: "Web Developer & Digital Marketing Executive",
            startDate: "2018-06-01",
            endDate: "2019-07-01",
            location: "Lahore",
            current: false,
            order: 5,
            skills: [],
            publishedAt: new Date().toISOString(),
          },
        ]);
        }
      } catch (error) {
        console.error("Failed to load experience:", error);
        // Set fallback data
        setExperiences([
          {
            id: 1,
            company: "SmashCloud",
            role: "Senior Frontend Developer",
            startDate: "2022-06-01",
            endDate: undefined,
            location: "Delaware, United States · Remote",
            current: true,
            order: 1,
            skills: [],
            publishedAt: new Date().toISOString(),
          },
          {
            id: 2,
            company: "Proximate Solutions",
            role: "Senior React and React Native Developer",
            startDate: "2020-11-01",
            endDate: "2022-06-01",
            location: "Lahore, Punjab, Pakistan",
            current: false,
            order: 2,
            skills: [],
            publishedAt: new Date().toISOString(),
          },
          {
            id: 3,
            company: "RepairDesk",
            role: "Jr. Software Engineer React Native",
            startDate: "2020-08-01",
            endDate: "2020-11-01",
            location: "Lahore District, Punjab, Pakistan",
            current: false,
            order: 3,
            skills: [],
            publishedAt: new Date().toISOString(),
          },
          {
            id: 4,
            company: "Coding Pixel USA",
            role: "React Js and React Native Developer",
            startDate: "2020-01-01",
            endDate: "2020-08-01",
            location: "Lahore District, Punjab, Pakistan",
            current: false,
            order: 4,
            skills: [],
            publishedAt: new Date().toISOString(),
          },
          {
            id: 5,
            company: "TOP SPOT",
            role: "Web Developer & Digital Marketing Executive",
            startDate: "2018-06-01",
            endDate: "2019-07-01",
            location: "Lahore",
            current: false,
            order: 5,
            skills: [],
            publishedAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadExperience();
  }, []);

  return (
    <Section id="experience" backgroundColor="gray">
      <Container maxWidth="7xl">
        <SubContainer>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold text-gray-800 mb-20 font-heading text-left"
          >
            Experience
          </motion.h2>
          {loading ? (
          <div className="text-left text-gray-500">Loading experience...</div>
        ) : (
          <div className="space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex gap-6 pb-10 border-b border-gray-200 last:border-0"
            >
              {exp.logo && (
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-white border border-gray-200 overflow-hidden p-2">
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
                <h3 className="text-2xl font-bold text-gray-800 mb-2 font-heading">
                  {exp.role}
                </h3>
                <div className="text-lg text-gray-600 mb-2">{exp.company}</div>
                <div className="text-gray-500 mb-1 text-sm">
                  {formatDateRange(exp.startDate, exp.endDate)}
                </div>
                <div className="text-gray-400 text-sm mb-3">{exp.location}</div>
                {exp.description && (
                  <p className="text-gray-600 mt-4 leading-relaxed text-[15px]">
                    {exp.description}
                  </p>
                )}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.skills.slice(0, 5).map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-full font-medium"
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


