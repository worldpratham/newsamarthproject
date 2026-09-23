export interface ReportApiModel {
  _id?: string;
  label: string;
  type: 'yearly' | 'monthly';
  url: string;
  year?: string;
  isYearHeader?: boolean;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReportsApiResponse {
  success: boolean;
  count: number;
  data: ReportApiModel[];
  message?: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

/**
 * Fetch reports dynamically from backend API (/api/reports).
 * Can be filtered by type ('yearly' or 'monthly').
 */
export async function getReports(type?: 'yearly' | 'monthly'): Promise<ReportApiModel[]> {
  const query = type ? `?type=${type}` : '';
  const endpoint = `${API_BASE_URL}/api/reports${query}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result: ReportsApiResponse = await res.json();
    if (result.success && Array.isArray(result.data)) {
      return result.data;
    }
    throw new Error(result.message || 'No reports returned');
  } catch (primaryError) {
    console.warn(`[reportApi] Primary call to ${endpoint} failed:`, primaryError);

    // Fallback directly to localhost:5000 in dev
    if (!API_BASE_URL) {
      const fallbackUrl = `http://localhost:5000/api/reports${query}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const fallbackResult: ReportsApiResponse = await fallbackRes.json();
        if (fallbackResult.success && Array.isArray(fallbackResult.data)) {
          return fallbackResult.data;
        }
      }
    }

    throw primaryError;
  }
}
