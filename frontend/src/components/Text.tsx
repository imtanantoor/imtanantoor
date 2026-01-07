import { ReactNode, CSSProperties } from "react";

interface TextProps {
  children: ReactNode;
  as?: "p" | "span" | "div" | "li" | "label";
  className?: string;
  style?: CSSProperties;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  color?: "primary" | "secondary" | "muted" | "foreground";
  weight?: "normal" | "medium" | "semibold" | "bold";
  leading?: "tight" | "normal" | "relaxed" | "loose";
  font?: "default" | "inter" | "poppins";
}

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const colorStyles = {
  primary: { color: "var(--foreground)" },
  secondary: { color: "var(--text-secondary)" },
  muted: { color: "var(--text-muted)" },
  foreground: { color: "var(--foreground)" },
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const leadingClasses = {
  tight: "leading-tight",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
};

const fontFamilies = {
  default: "var(--font-poppins), sans-serif",
  poppins: "var(--font-poppins), sans-serif",
  inter: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export default function Text({
  children,
  as: Component = "p",
  className = "",
  style,
  size = "base",
  color = "primary",
  weight = "normal",
  leading = "normal",
  font = "default",
}: TextProps) {
  const combinedClassName = [
    sizeClasses[size],
    weightClasses[weight],
    leadingClasses[leading],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const combinedStyle: CSSProperties = {
    fontFamily: fontFamilies[font],
    ...colorStyles[color],
    ...style,
  };

  return (
    <Component className={combinedClassName} style={combinedStyle}>
      {children}
    </Component>
  );
}

