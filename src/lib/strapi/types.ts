export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export interface PortfolioProject {
  id: number;
  title: string;
  slug: string;
  description: string;
  fullDescription: string;
  techStack: string[];
  images: StrapiImage[];
  impact?: Array<{
    metric: string;
    value: string;
  }>;
  category: "mobile" | "saas" | "website";
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: number;
  company: string;
  logo?: StrapiImage;
  role: string;
  startDate: string;
  endDate?: string;
  location: string;
  description?: string;
  skills: string[];
  current: boolean;
  order: number;
  publishedAt: string;
}

export interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  endDate?: string;
  credentialUrl?: string;
  logo?: StrapiImage;
  publishedAt: string;
}

export interface SiteSettings {
  id: number;
  heroTitle: string;
  heroSubtitle: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    email?: string;
  };
  contactEmail: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}



