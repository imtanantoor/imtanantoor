import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPortfolioBySlug, getPortfolioProjects } from "@/lib/strapi/queries";
import { getImageUrl, renderRichText } from "@/lib/strapi/utils";
import { FaArrowLeft } from "react-icons/fa";
import ImageCarousel from "@/components/ImageCarousel";
import Text from "@/components/Text";

export async function generateStaticParams() {
  try {
    const projects = await getPortfolioProjects();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imtanantoor.com";
  const coverImage = project.coverImage || project.images?.[0];
  const coverImageUrl = coverImage ? getImageUrl(coverImage, "large") : "";

  const title = `${project.title} | Portfolio Project`;
  const description = project.shortDescription || `View details about ${project.title}, a project showcasing modern web development and scalable solutions.`;

  return {
    title: title.length > 60 ? title.substring(0, 57) + "..." : title,
    description: description.length > 160 ? description.substring(0, 157) + "..." : description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
    openGraph: {
      title: title.length > 60 ? title.substring(0, 57) + "..." : title,
      description: description.length > 160 ? description.substring(0, 157) + "..." : description,
      type: "website",
      url: `/portfolio/${slug}`,
      images: coverImageUrl ? [{ url: coverImageUrl, alt: project.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: title.length > 60 ? title.substring(0, 57) + "..." : title,
      description: description.length > 160 ? description.substring(0, 157) + "..." : description,
      images: coverImageUrl ? [coverImageUrl] : [],
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);

  if (!project) {
    notFound();
  }

  const coverImage = project.coverImage || project.images?.[0];
  const coverImageUrl = coverImage ? getImageUrl(coverImage, "large") : "";
  const richTextHtml = project.description ? renderRichText(project.description) : "";
  
  // Calculate aspect ratio from image dimensions
  const coverImageAspectRatio = coverImage?.width && coverImage?.height
    ? coverImage.width / coverImage.height
    : 16 / 9; // Default to 16:9 if dimensions not available

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-24 pt-32">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 mb-12 transition-all group"
          style={{ color: "var(--text-secondary)" }}
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            <FaArrowLeft />
          </span>
          <span className="text-sm font-medium tracking-wide">Back to Portfolio</span>
        </Link>

        <article className="rounded-lg border overflow-hidden" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--border)" }}>
          {coverImageUrl && (
            <div
              className="relative w-full"
              style={{
                aspectRatio: coverImageAspectRatio.toString(),
                backgroundColor: "var(--badge-bg)",
                maxHeight: "70vh",
              }}
            >
              <Image
                src={coverImageUrl}
                alt={coverImage?.alternativeText || project.title}
                fill
                className="object-contain"
                priority
                unoptimized={process.env.NODE_ENV === "development"}
              />
            </div>
          )}

          <div className="p-8 sm:p-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 font-heading" style={{ color: "var(--foreground)" }}>
              {project.title}
            </h1>

            <div className="mb-8">
              <Text as="p" size="xl" color="secondary" leading="relaxed" className="mb-8">
                {project.shortDescription}
              </Text>
              {richTextHtml && (
                <div
                  className="rich-text-content"
                  style={{ color: "var(--foreground)" }}
                  dangerouslySetInnerHTML={{ __html: richTextHtml }}
                />
              )}
            </div>

            {project.techStack && project.techStack.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 font-heading" style={{ color: "var(--foreground)" }}>
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-full font-medium border"
                      style={{
                        backgroundColor: "var(--badge-bg)",
                        color: "var(--badge-text)",
                        borderColor: "var(--badge-border)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.impact && project.impact.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 font-heading" style={{ color: "var(--foreground)" }}>
                  Impact
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {project.impact.map((impact) => (
                    <div
                      key={`${impact.metric}-${impact.value}`}
                      className="p-6 rounded-lg border"
                      style={{
                        backgroundColor: "var(--badge-bg)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <div className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                        {impact.value}
                      </div>
                      <div style={{ color: "var(--text-secondary)" }}>{impact.metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.images && project.images.length > 1 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 font-heading" style={{ color: "var(--foreground)" }}>
                  Gallery
                </h2>
                <ImageCarousel images={project.images.slice(1)} title={project.title} />
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}



