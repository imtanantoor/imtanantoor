import { fetchAPI } from "./client";
import {
  PortfolioProject,
  Experience,
  Certificate,
  SiteSettings,
} from "./types";
import { transformStrapiResponse } from "./utils";

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  try {
    const response = await fetchAPI(
      "/portfolios",
      {
        populate: ["images", "coverImage"],
        sort: ["publishedAt:desc"],
        publicationState: "live",
      }
    );

    return transformStrapiResponse<PortfolioProject[]>(response);
  } catch (error) {
    console.error("Error fetching portfolio projects:", error);
    return [];
  }
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioProject | null> {
  try {
    const response = await fetchAPI(
      "/portfolios",
      {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: ["images", "coverImage"],
        publicationState: "live",
      }
    );

    const projects = transformStrapiResponse<PortfolioProject[]>(response);
    return projects.length > 0 ? projects[0] : null;
  } catch (error) {
    console.error("Error fetching portfolio by slug:", error);
    return null;
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const response = await fetchAPI(
      "/experiences",
      {
        // populate: ["logo"],
        sort: ["order:asc", "startDate:desc"],
        publicationState: "live",
      }
    );

    return transformStrapiResponse<Experience[]>(response);
  } catch (error) {
    console.error("Error fetching experience:", error);
    return [];
  }
}

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const response = await fetchAPI(
      "/certificates",
      {
        populate: ["logo", "image"],
        sort: ["issueDate:desc"],
        publicationState: "live",
      }
    );

    return transformStrapiResponse<Certificate[]>(response);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const response = await fetchAPI(
      "/site-setting",
      {
        populate: "*",
      }
    );

    return transformStrapiResponse<SiteSettings>(response);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    // Return default settings
    return {
      id: 1,
      heroTitle: "Fullstack Developer",
      heroSubtitle: "Creating apps that increase revenue",
      socialLinks: {
        linkedin: "",
        github: "",
      },
      contactEmail: "",
    };
  }
}

export async function getBlogPosts() {
  // Future implementation for blog
  const response = await fetchAPI("/blog-posts", {
    populate: ["coverImage", "author"],
    sort: ["publishedAt:desc"],
    publicationState: "live",
  });

  return transformStrapiResponse(response);
}

