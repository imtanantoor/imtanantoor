import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  backgroundColor?: "white" | "gray" | "dark";
}

const backgroundClasses = {
  white: "bg-white",
  gray: "bg-gray-50",
  dark: "bg-gray-800",
};

export default function Section({
  children,
  id,
  className = "",
  backgroundColor = "white",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${backgroundClasses[backgroundColor]} ${className}`}
    >
      {children}
    </section>
  );
}

