import { ReactNode, CSSProperties } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  backgroundColor?: "white" | "gray" | "dark";
  style?: CSSProperties;
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
  style,
}: SectionProps) {
  // If style is provided, don't use backgroundColor class
  const bgClass = style ? "" : backgroundClasses[backgroundColor];
  
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${bgClass} ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}

