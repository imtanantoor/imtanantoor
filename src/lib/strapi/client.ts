import qs from "qs";

const STRAPI_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/api";

export async function fetchAPI(
  path: string,
  urlParamsObject: Record<string, any> = {},
  options: RequestInit = {}
) {
  try {
    const mergedOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    const queryString = qs.stringify(urlParamsObject, {
      encodeValuesOnly: true,
    });
    const requestUrl = `${STRAPI_API_URL}${path}${queryString ? `?${queryString}` : ""}`;

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
  return `${STRAPI_API_URL.replace("/api", "")}${url}`;
}



