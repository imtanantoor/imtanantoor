"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { StrapiImage } from "@/lib/strapi/types";
import { getImageUrl } from "@/lib/strapi/utils";
import { FaTimes } from "react-icons/fa";

interface ImageModalProps {
  image: StrapiImage | null;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({ image, alt, isOpen, onClose }: ImageModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!image) return null;

  const imageUrl = getImageUrl(image, "large");
  const aspectRatio = image.width && image.height 
    ? image.width / image.height 
    : 16 / 9;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full max-h-[90vh] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full transition-opacity hover:opacity-70 z-10"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
                aria-label="Close"
              >
                <FaTimes size={18} />
              </button>

              {/* Image Container */}
              <div
                className="relative w-full rounded-lg overflow-hidden"
                style={{
                  aspectRatio: aspectRatio.toString(),
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                }}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={image.alternativeText || alt}
                    fill
                    className="object-contain"
                    unoptimized={process.env.NODE_ENV === "development"}
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white opacity-50">No image</span>
                  </div>
                )}
              </div>

              {/* Caption */}
              {image.caption && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 text-center text-white opacity-80 text-sm"
                >
                  {image.caption}
                </motion.p>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

