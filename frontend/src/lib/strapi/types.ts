export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface StrapiImage {
  id: number;
  documentId?: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface PortfolioProject {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description?: any; // Rich text array from Strapi
  techStack?: string[];
  images: StrapiImage[];
  coverImage?: StrapiImage | null;
  impact?: Array<{
    metric: string;
    value: string;
  }>;
  category?: "mobile" | "saas" | "website";
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
  documentId?: string;
  name: string;
  issuer: string;
  issueDate: string;
  endDate?: string;
  credentialUrl?: string;
  logo?: StrapiImage;
  image?: StrapiImage;
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



