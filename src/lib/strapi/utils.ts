import { StrapiImage } from "./types";
import { getStrapiMediaUrl } from "./client";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export function formatDateRange(startDate: string, endDate?: string | null): string {
  const start = formatDate(startDate);
  if (!endDate) return `${start} - Present`;
  const end = formatDate(endDate);
  return `${start} - ${end}`;
}

export function getImageUrl(image?: StrapiImage | null): string {
  if (!image) return "";
  return getStrapiMediaUrl(image.url);
}

export function transformStrapiResponse<T>(response: any): T {
  if (!response || !response.data) {
    return [] as T;
  }

  if (Array.isArray(response.data)) {
    return response.data.map((item: any) => {
      const attributes = item.attributes || item;
      return {
        id: item.id,
        ...attributes,
      };
    }) as T;
  }

  const attributes = response.data.attributes || response.data;
  return {
    id: response.data.id,
    ...attributes,
  } as T;
}

