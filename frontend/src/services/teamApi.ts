export interface TeamMemberApiModel {
  _id?: string;
  name: string;
  role: string;
  image: string;
  wpImage?: string;
  bio: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamApiResponse {
  success: boolean;
  count: number;
  data: TeamMemberApiModel[];
  message?: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

/**
 * Fetch all active team members dynamically from MongoDB API (/api/team).
 */
export async function getTeamMembers(): Promise<TeamMemberApiModel[]> {
  const endpoint = `${API_BASE_URL}/api/team`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result: TeamApiResponse = await res.json();
    if (result.success && Array.isArray(result.data)) {
      return result.data;
    }
    throw new Error(result.message || 'No team members returned');
  } catch (primaryError) {
    console.warn(`[teamApi] Primary call to ${endpoint} failed:`, primaryError);

    // Fallback directly to localhost:5000 if relative URL proxy failed in development
    if (!API_BASE_URL) {
      const fallbackUrl = 'http://localhost:5000/api/team';
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const fallbackResult: TeamApiResponse = await fallbackRes.json();
        if (fallbackResult.success && Array.isArray(fallbackResult.data)) {
          return fallbackResult.data;
        }
      }
    }

    throw primaryError;
  }
}
