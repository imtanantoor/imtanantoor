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

export function getImageUrl(image?: StrapiImage | null, preferFormat: "medium" | "large" | "small" | "thumbnail" = "medium"): string {
  if (!image) return "";
  
  // Try to use optimized format first (better performance)
  if (image.formats?.[preferFormat]?.url) {
    return getStrapiMediaUrl(image.formats[preferFormat].url);
  }
  
  // Fall back to other formats if preferred not available
  if (image.formats?.large?.url) {
    return getStrapiMediaUrl(image.formats.large.url);
  }
  if (image.formats?.medium?.url) {
    return getStrapiMediaUrl(image.formats.medium.url);
  }
  if (image.formats?.small?.url) {
    return getStrapiMediaUrl(image.formats.small.url);
  }
  
  // Fall back to original URL
  const url = image.url || (image as any).data?.url || "";
  if (!url) {
    console.warn("Image object missing URL:", image);
    return "";
  }
  
  return getStrapiMediaUrl(url);
}

export function transformStrapiResponse<T>(response: any): T {
  // Handle case where response is already an array (direct data)
  if (Array.isArray(response)) {
    return response.map((item: any) => {
      const attributes = item.attributes || item;
      return {
        id: item.id || item.documentId || attributes.id,
        ...attributes,
      };
    }) as T;
  }

  // Handle case where response has data wrapper
  if (!response || !response.data) {
    return [] as T;
  }

  if (Array.isArray(response.data)) {
    return response.data.map((item: any) => {
      const attributes = item.attributes || item;
      return {
        id: item.id || item.documentId || attributes.id,
        ...attributes,
      };
    }) as T;
  }

  const attributes = response.data.attributes || response.data;
  return {
    id: response.data.id || response.data.documentId || attributes.id,
    ...attributes,
  } as T;
}

/**
 * Converts Strapi rich text blocks to HTML
 * Handles paragraph, heading, list, and text nodes
 */
export function renderRichText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return "";

  return blocks
    .map((block) => {
      switch (block.type) {
        case "paragraph":
          const text = block.children
            ?.map((child: any) => {
              if (child.type === "text") {
                let content = child.text || "";
                // Handle text formatting
                if (child.bold) content = `<strong>${content}</strong>`;
                if (child.italic) content = `<em>${content}</em>`;
                if (child.underline) content = `<u>${content}</u>`;
                if (child.strikethrough) content = `<s>${content}</s>`;
                if (child.code) content = `<code>${content}</code>`;
                return content;
              }
              return "";
            })
            .join("") || "";
          return text ? `<p>${text}</p>` : "";

        case "heading":
          const level = block.level || 1;
          const headingText = block.children
            ?.map((child: any) => child.text || "")
            .join("") || "";
          return headingText ? `<h${level}>${headingText}</h${level}>` : "";

        case "list":
          const listItems = block.children
            ?.map((item: any) => {
              const itemText = item.children
                ?.map((child: any) => child.text || "")
                .join("") || "";
              return itemText ? `<li>${itemText}</li>` : "";
            })
            .join("") || "";
          const listTag = block.format === "ordered" ? "ol" : "ul";
          return listItems ? `<${listTag}>${listItems}</${listTag}>` : "";

        case "quote":
          const quoteText = block.children
            ?.map((child: any) => child.text || "")
            .join("") || "";
          return quoteText ? `<blockquote>${quoteText}</blockquote>` : "";

        case "code":
          const codeText = block.children
            ?.map((child: any) => child.text || "")
            .join("") || "";
          return codeText ? `<pre><code>${codeText}</code></pre>` : "";

        default:
          // For unknown types, try to extract text
          const defaultText = block.children
            ?.map((child: any) => child.text || "")
            .join("") || "";
          return defaultText ? `<p>${defaultText}</p>` : "";
      }
    })
    .join("");
}

