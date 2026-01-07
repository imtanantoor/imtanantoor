import qs from "qs";

const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "";

export async function fetchAPI(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
  options: RequestInit = {}
) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Add API token if available
    if (STRAPI_API_TOKEN) {
      headers["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const mergedOptions: RequestInit = {
      headers,
      ...options,
    };

    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    });
    const queryParam = queryString ? `?${queryString}` : "";
    const requestUrl = `${STRAPI_API_URL}${path}${queryParam}`;

    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Strapi API Error:", error);
    throw error;
  }
}

export function getStrapiMediaUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  
  // Ensure URL starts with / if it's a relative path
  const cleanUrl = url.startsWith("/") ? url : `/${url}`;
  const baseUrl = STRAPI_API_URL.replace("/api", "");
  
  return `${baseUrl}${cleanUrl}`;
}



