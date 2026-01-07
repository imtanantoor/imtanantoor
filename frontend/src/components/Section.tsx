import { ReactNode, CSSProperties } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  backgroundColor?: "white" | "gray" | "dark";
  style?: CSSProperties;
}

const backgroundStyles: Record<"white" | "gray" | "dark", CSSProperties> = {
  white: { backgroundColor: "var(--background)" },
  gray: { backgroundColor: "var(--section-gray-bg)" },
  dark: { backgroundColor: "var(--gray-800)" },
};

export default function Section({
  children,
  id,
  className = "",
  backgroundColor = "white",
  style,
}: SectionProps) {
  // Merge custom style with background style if no custom style is provided
  const sectionStyle = style || backgroundStyles[backgroundColor];
  
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${className}`}
      style={sectionStyle}
    >
      {children}
    </section>
  );
}

