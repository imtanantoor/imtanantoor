"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Certificate } from "@/lib/strapi/types";
import { getCertificates } from "@/lib/strapi/queries";
import { formatDate, formatDateRange, getImageUrl } from "@/lib/strapi/utils";
import Section from "./Section";
import Container, { SubContainer } from "./Container";
import { ACCENT_COLOR } from "@/lib/theme";
import ImageModal from "./ImageModal";

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ image: Certificate["image"]; alt: string } | null>(null);

  useEffect(() => {
    async function loadCertificates() {
      try {
        const data = await getCertificates();
        // Use API data if available and not empty, otherwise use fallback
        if (data && data.length > 0) {
          setCertificates(data);
        } else {
          setCertificates([
            {
              id: 1,
              name: "Generative AI Mastermind",
              issuer: "Outskill",
              issueDate: new Date("2025-09-01").toISOString(),
              endDate: undefined, // undefined means "Present"
              publishedAt: new Date().toISOString(),
            },
            {
              id: 2,
              name: "AWS Cloud Practitioner",
              issuer: "Amazon Web Services",
              issueDate: new Date().toISOString(),
              publishedAt: new Date().toISOString(),
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to load certificates:", error);
        // Set fallback data
        setCertificates([
          {
            id: 1,
            name: "Generative AI Mastermind",
            issuer: "Outskill",
            issueDate: new Date("2025-09-01").toISOString(),
            endDate: undefined, // undefined means "Present"
            publishedAt: new Date().toISOString(),
          },
          {
            id: 2,
            name: "AWS Cloud Practitioner",
            issuer: "Amazon Web Services",
            issueDate: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadCertificates();
  }, []);

  return (
    <Section backgroundColor="white">
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
            Certificates
          </motion.h2>
          {loading ? (
          <div className="text-left" style={{ color: "var(--text-secondary)" }}>Loading certificates...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => {
                if (cert.image) {
                  setSelectedImage({ image: cert.image, alt: `${cert.name} - ${cert.issuer}` });
                }
              }}
            >
              {cert.logo && (
                <div className="w-20 h-20 mb-6 relative">
                  <Image
                    src={getImageUrl(cert.logo)}
                    alt={cert.issuer}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold mb-3 font-heading" style={{ color: "var(--foreground)" }}>
                {cert.name}
              </h3>
              <div className="mb-2 text-sm" style={{ color: "var(--text-secondary)" }}>{cert.issuer}</div>
              <div className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
                {cert.endDate ? formatDateRange(cert.issueDate, cert.endDate) : formatDate(cert.issueDate)}
              </div>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium inline-flex items-center gap-2 transition-colors text-sm tracking-wide group-hover:gap-3 hover:opacity-70"
                  style={{ color: ACCENT_COLOR }}
                  onClick={(e) => e.stopPropagation()}
                >
                  View Credential
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              )}
              {!cert.credentialUrl && cert.image && (
                <span className="font-medium inline-flex items-center gap-2 transition-colors text-sm tracking-wide group-hover:gap-3 hover:opacity-70" style={{ color: ACCENT_COLOR }}>
                  View Certificate
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              )}
            </motion.div>
          ))}
          </div>
          )}
          
          {/* Image Modal */}
          <ImageModal
            image={selectedImage?.image || null}
            alt={selectedImage?.alt || ""}
            isOpen={!!selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        </SubContainer>
      </Container>
    </Section>
  );
}


