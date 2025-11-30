import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPortfolioBySlug, getPortfolioProjects } from "@/lib/strapi/queries";
import { getImageUrl } from "@/lib/strapi/utils";
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
  params: { slug: string };
}) {
  const project = await getPortfolioBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <FaArrowLeft />
          Back to Portfolio
        </Link>

        <article className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {project.images && project.images.length > 0 && (
            <div className="relative h-96 bg-gray-100">
              <Image
                src={getImageUrl(project.images[0])}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8 sm:p-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6 font-heading">
              {project.title}
            </h1>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-500 mb-8">{project.description}</p>
              <div
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.fullDescription }}
              />
            </div>

            {project.techStack && project.techStack.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 font-heading">
                  Tech Stack
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.impact && project.impact.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 font-heading">
                  Impact
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {project.impact.map((impact, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="text-3xl font-bold text-gray-800 mb-2">
                        {impact.value}
                      </div>
                      <div className="text-gray-500">{impact.metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.images && project.images.length > 1 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 font-heading">
                  Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="relative h-64 bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={getImageUrl(image)}
                        alt={`${project.title} - Image ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}



