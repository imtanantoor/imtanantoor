"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ACCENT_COLOR } from "@/lib/theme";

export default function Header() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-60 bg-white/50 backdrop-blur-sm">
        <motion.div
          className="h-full origin-left"
          style={{ scaleX, backgroundColor: ACCENT_COLOR }}
        />
      </div>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0.5 left-0 right-0 z-50 bg-white/95 backdrop-blur-md w-full"
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between w-full">
          <Link 
            href="/" 
            className="text-xl font-bold uppercase tracking-tight hover:opacity-80 transition-colors"
          >
            <span className="text-gray-800">I</span>
            <span style={{ color: ACCENT_COLOR }}>T.</span>
          </Link>
          <div className="flex items-center gap-8 sm:gap-12">
            <Link
              href="#work"
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block tracking-wide"
            >
              Work
            </Link>
            <Link
              href="#experience"
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors hidden sm:block tracking-wide"
            >
              Experience
            </Link>
            <Link
              href="#contact"
              className="px-6 py-2.5 text-sm font-medium rounded-full transition-all tracking-wide shadow-md hover:shadow-lg whitespace-nowrap hover:opacity-90 accent-button"
              style={{ backgroundColor: ACCENT_COLOR, color: 'white' }}
            >
              Let&apos;s Build
            </Link>
          </div>
        </nav>
      </motion.header>
    </>
  );
}


