"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { PortfolioProject } from "@/lib/strapi/types";
import { getImageUrl } from "@/lib/strapi/utils";
import { ACCENT_COLOR } from "@/lib/theme";

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
}

export default function PortfolioCard({ project, index }: PortfolioCardProps) {
  const mainImage = project.images?.[0];
  const imageUrl = mainImage ? getImageUrl(mainImage) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/portfolio/${project.slug}`}>
        <div className="relative h-64 bg-gray-100 overflow-hidden mb-6 rounded-sm">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-sm">No image</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading group-hover:text-gray-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-500 mb-4 line-clamp-2 text-[15px] leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack?.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
            {project.techStack && project.techStack.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
          <span className="font-medium inline-flex items-center gap-2 transition-colors text-sm tracking-wide group-hover:gap-3 hover:opacity-70" style={{ color: ACCENT_COLOR }}>
            View Details
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}


