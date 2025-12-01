"use client";

import { useState } from "react";
import Image from "next/image";
import { StrapiImage } from "@/lib/strapi/types";
import { getImageUrl } from "@/lib/strapi/utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageCarouselProps {
  images: StrapiImage[];
  title: string;
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];
  const imageUrl = getImageUrl(currentImage, "large");
  
  // Calculate aspect ratio from image dimensions
  const aspectRatio = currentImage.width && currentImage.height 
    ? currentImage.width / currentImage.height 
    : 16 / 9; // Default to 16:9 if dimensions not available

  return (
    <div className="relative w-full">
      {/* Main Carousel */}
      <div className="relative w-full rounded-lg overflow-hidden" style={{ backgroundColor: "var(--badge-bg)" }}>
        {/* Image Container with Dynamic Aspect Ratio */}
        <div
          className="relative w-full"
          style={{
            aspectRatio: aspectRatio.toString(),
            maxHeight: "80vh",
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={currentImage.alternativeText || `${title} - Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              unoptimized={process.env.NODE_ENV === "development"}
              priority={currentIndex === 0}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>No image</span>
            </div>
          )}

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                }}
                aria-label="Previous image"
              >
                <FaChevronLeft size={16} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-110"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                }}
                aria-label="Next image"
              >
                <FaChevronRight size={16} />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div
              className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
              }}
            >
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => {
            const thumbUrl = getImageUrl(image, "small");
            return (
              <button
                key={image.id || index}
                onClick={() => goToSlide(index)}
                className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex ? "ring-2 ring-offset-2" : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  borderColor: index === currentIndex ? "var(--accent)" : "var(--border)",
                  ringColor: "var(--accent)",
                }}
                aria-label={`Go to image ${index + 1}`}
              >
                {thumbUrl ? (
                  <Image
                    src={thumbUrl}
                    alt={`${title} thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    unoptimized={process.env.NODE_ENV === "development"}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--badge-bg)" }}
                  >
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>No img</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

