export interface GalleryApiModel {
  _id?: string;
  id?: string | number;
  title: string;
  category?: string;
  image: string;
  wpImage?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryApiResponse {
  success: boolean;
  count: number;
  data: GalleryApiModel[];
  message?: string;
}

export interface SingleGalleryApiResponse {
  success: boolean;
  data?: GalleryApiModel;
  message?: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

/**
 * Fetch all gallery items dynamically from the backend MongoDB API (/api/gallery).
 */
export async function getGalleryItems(category?: string): Promise<GalleryApiModel[]> {
  const query = category && category.toLowerCase() !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
  const endpoint = `${API_BASE_URL}/api/gallery${query}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result: GalleryApiResponse = await res.json();
    if (result.success && Array.isArray(result.data)) {
      return result.data;
    }
    throw new Error(result.message || 'No gallery data returned');
  } catch (primaryError) {
    console.warn(`[galleryApi] Primary call to ${endpoint} failed:`, primaryError);

    // Fallback directly to localhost:5000 if relative URL failed
    if (!API_BASE_URL) {
      const fallbackUrl = `http://localhost:5000/api/gallery${query}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const fallbackResult: GalleryApiResponse = await fallbackRes.json();
        if (fallbackResult.success && Array.isArray(fallbackResult.data)) {
          return fallbackResult.data;
        }
      }
    }

    throw primaryError;
  }
}
