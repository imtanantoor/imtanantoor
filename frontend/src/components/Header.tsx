"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ACCENT_COLOR } from "@/lib/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Header() {
  const { scrollYProgress } = useScroll();
  const { theme, toggleTheme } = useTheme();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 z-60 backdrop-blur-sm"
        style={{ backgroundColor: "var(--background)" }}
      >
        <motion.div
          className="h-full origin-left"
          style={{ scaleX, backgroundColor: ACCENT_COLOR }}
        />
      </div>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0.5 left-0 right-0 z-50 backdrop-blur-md w-full"
        style={{ 
          backgroundColor: "var(--background)",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between w-full">
          <Link 
            href="/" 
            className="text-xl font-bold uppercase tracking-tight hover:opacity-80 transition-colors"
          >
            <span style={{ color: "var(--foreground)" }}>I</span>
            <span style={{ color: ACCENT_COLOR }}>T.</span>
          </Link>
          <div className="flex items-center gap-8 sm:gap-12">
            <Link
              href="/#work"
              className="text-sm transition-colors hidden sm:block tracking-wide hover-nav-link"
              style={{ 
                color: "var(--text-secondary)",
              }}
            >
              Work
            </Link>
            <Link
              href="/#experience"
              className="text-sm transition-colors hidden sm:block tracking-wide hover-nav-link"
              style={{ 
                color: "var(--text-secondary)",
              }}
            >
              Experience
            </Link>
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors hover-theme-button"
              style={{ backgroundColor: "var(--badge-bg)" }}
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-400" size={16} />
              ) : (
                <FaMoon style={{ color: "var(--foreground)" }} size={16} />
              )}
            </button>
            <Link
              href="/#contact"
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


