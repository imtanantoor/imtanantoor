import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "5xl" | "7xl";
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-2xl",
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
};

export default function Container({
  children,
  className = "",
  maxWidth = "7xl",
}: ContainerProps) {
  return (
    <div
      className={`${maxWidthClasses[maxWidth]} mx-auto px-6 sm:px-8 lg:px-12 w-full ${className}`}
    >
      {children}
    </div>
  );
}

interface SubContainerProps {
  children: ReactNode;
  className?: string;
}

export function SubContainer({ children, className = "" }: SubContainerProps) {
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  );
}

