import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPortfolioBySlug, getPortfolioProjects } from "@/lib/strapi/queries";
import { getImageUrl, renderRichText } from "@/lib/strapi/utils";
import { FaArrowLeft } from "react-icons/fa";

export async function generateStaticParams() {
  try {
    const projects = await getPortfolioProjects();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    return [];
  }
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);

  if (!project) {
    notFound();
  }

  const coverImage = project.coverImage || project.images?.[0];
  const coverImageUrl = coverImage ? getImageUrl(coverImage, "large") : "";
  const richTextHtml = project.description ? renderRichText(project.description) : "";

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
            <div className="relative h-96" style={{ backgroundColor: "var(--badge-bg)" }}>
              <Image
                src={coverImageUrl}
                alt={coverImage?.alternativeText || project.title}
                fill
                className="object-cover"
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
              <p className="text-xl mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {project.shortDescription}
              </p>
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
                  {project.impact.map((impact, index) => (
                    <div
                      key={index}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.images.slice(1).map((image, index) => {
                    const imageUrl = getImageUrl(image, "medium");
                    return (
                      <div
                        key={image.id || index}
                        className="relative h-64 rounded-lg overflow-hidden"
                        style={{ backgroundColor: "var(--badge-bg)" }}
                      >
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={image.alternativeText || `${project.title} - Image ${index + 2}`}
                            fill
                            className="object-cover"
                            unoptimized={process.env.NODE_ENV === "development"}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-sm" style={{ color: "var(--text-muted)" }}>No image</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}



