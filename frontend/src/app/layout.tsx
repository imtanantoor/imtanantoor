import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fullstack Developer | Creating Apps That Increase Revenue",
  description: "Fullstack Developer specializing in scalable, revenue-driven applications. Expert in Next.js, React, React Native, Node.js, TypeScript, and AWS deployments.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://imtanantoor.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fullstack Developer | Creating Apps That Increase Revenue",
    description: "Fullstack Developer specializing in scalable, revenue-driven applications. Expert in Next.js, React, React Native, Node.js, TypeScript, and AWS deployments.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullstack Developer | Creating Apps That Increase Revenue",
    description: "Fullstack Developer specializing in scalable, revenue-driven applications. Expert in Next.js, React, React Native, Node.js, TypeScript, and AWS deployments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  // Only apply dark class if explicitly set in localStorage
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: 'var(--background)' }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
