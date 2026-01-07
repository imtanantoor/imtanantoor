"use client";

import Link from "next/link";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import Container from "./Container";
import { ACCENT_COLOR } from "@/lib/theme";

// Toptal Icon SVG - Stylized T
const ToptalIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L4 8v8l8 6 8-6V8L12 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M12 8v8M8 12h8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="text-gray-300 py-12" 
      style={{ backgroundColor: ACCENT_COLOR }}
    >
      <Container maxWidth="7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="text-white font-bold text-base mb-6 font-heading tracking-wide">
              Navigate
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#work" className="hover:text-white transition-colors text-sm text-gray-400 tracking-wide">
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/#experience"
                  className="hover:text-white transition-colors text-sm text-gray-400 tracking-wide"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors text-sm text-gray-400 tracking-wide">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-base mb-6 font-heading tracking-wide">
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.toptal.com/resume/imtanan-aziz-toor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Toptal"
              >
                <ToptalIcon size={20} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-base mb-6 font-heading tracking-wide">
              Location
            </h3>
            <p className="text-gray-400 text-sm">Available for remote work</p>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-gray-400 text-sm" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
          <p>© {currentYear} All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}


