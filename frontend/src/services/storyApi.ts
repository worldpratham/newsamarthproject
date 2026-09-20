export interface StoryItem {
  _id?: string;
  id?: string;
  name: string;
  role: string;
  companyOrCenter?: string;
  category?: string;
  storyText?: string;
  story?: string;
  imageUrl?: string;
  image?: string;
  impact?: string;
  isFeatured?: boolean;
}

export interface StoriesApiResponse {
  success: boolean;
  count: number;
  data: StoryItem[];
  message?: string;
}

export interface SingleStoryApiResponse {
  success: boolean;
  data?: StoryItem;
  message?: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

/**
 * Fetch all success stories from the backend API.
 * Uses `/api/stories` via Vite proxy, with automatic fallback to `http://localhost:5000/api/stories`.
 */
export async function getStories(category?: string): Promise<StoryItem[]> {
  const query = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
  const endpoint = `${API_BASE_URL}/api/stories${query}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result: StoriesApiResponse = await res.json();
    if (result.success && Array.isArray(result.data)) {
      return result.data;
    }
    throw new Error(result.message || 'Failed to parse stories data');
  } catch (primaryError) {
    console.warn(`Primary API call to ${endpoint} failed:`, primaryError);

    // Fallback directly to localhost:5000 if relative URL failed
    if (!API_BASE_URL) {
      try {
        const fallbackUrl = `http://localhost:5000/api/stories${query}`;
        const fallbackRes = await fetch(fallbackUrl);
        if (fallbackRes.ok) {
          const fallbackResult: StoriesApiResponse = await fallbackRes.json();
          if (fallbackResult.success && Array.isArray(fallbackResult.data)) {
            return fallbackResult.data;
          }
        }
      } catch (fallbackError) {
        console.error('Fallback API call also failed:', fallbackError);
      }
    }

    throw primaryError;
  }
}

/**
 * Fetch a single success story by ID.
 */
export async function getStoryById(id: string): Promise<StoryItem | null> {
  const endpoint = `${API_BASE_URL}/api/stories/${encodeURIComponent(id)}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result: SingleStoryApiResponse = await res.json();
    if (result.success && result.data) {
      return result.data;
    }
    return null;
  } catch (primaryError) {
    console.warn(`Primary single story call to ${endpoint} failed:`, primaryError);

    if (!API_BASE_URL) {
      try {
        const fallbackUrl = `http://localhost:5000/api/stories/${encodeURIComponent(id)}`;
        const fallbackRes = await fetch(fallbackUrl);
        if (fallbackRes.ok) {
          const fallbackResult: SingleStoryApiResponse = await fallbackRes.json();
          if (fallbackResult.success && fallbackResult.data) {
            return fallbackResult.data;
          }
        }
      } catch (fallbackError) {
        console.error('Fallback single story call failed:', fallbackError);
      }
    }

    throw primaryError;
  }
}
