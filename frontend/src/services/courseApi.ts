export interface CourseModule {
  moduleNumber?: number;
  title: string;
  description: string;
  _id?: string;
}

export interface CourseApiModel {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  category: string;
  duration: string;
  language: string;
  certification: string;
  overview: string;
  eligibility: string;
  modules: CourseModule[];
  imageUrl?: string;
  isCDC?: boolean;
  order?: number;
  isActive?: boolean;
}

export interface CenterApiModel {
  _id?: string;
  state: string;
  trainingName: string;
  address: string;
  googleLocationUrl: string;
  contactPhone?: string;
  isActive?: boolean;
}

export interface CoursesApiResponse {
  success: boolean;
  count: number;
  data: CourseApiModel[];
  message?: string;
}

export interface SingleCourseApiResponse {
  success: boolean;
  data?: CourseApiModel;
  message?: string;
}

export interface CentersApiResponse {
  success: boolean;
  count: number;
  data: CenterApiModel[];
  states?: string[];
  trainings?: string[];
  message?: string;
}

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export interface GetCoursesOptions {
  category?: string;
  isCDC?: boolean;
}

/**
 * Fetch courses from the backend API.
 * Uses `/api/courses` with automatic fallback to direct localhost:5000 if needed.
 */
export async function getCourses(options?: string | GetCoursesOptions): Promise<CourseApiModel[]> {
  const params = new URLSearchParams();
  if (typeof options === 'string') {
    if (options.toLowerCase() === 'cdc') {
      params.append('isCDC', 'true');
    } else if (options && options !== 'All') {
      params.append('category', options);
    }
  } else if (options) {
    if (options.isCDC !== undefined) {
      params.append('isCDC', String(options.isCDC));
    }
    if (options.category && options.category !== 'All') {
      params.append('category', options.category);
    }
  }

  const qs = params.toString() ? `?${params.toString()}` : '';
  const endpoint = `${API_BASE_URL}/api/courses${qs}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result: CoursesApiResponse = await res.json();
    if (result.success && Array.isArray(result.data)) {
      return result.data;
    }
    throw new Error(result.message || 'Failed to parse courses data');
  } catch (primaryError) {
    console.warn(`Primary API call to ${endpoint} failed, trying fallback:`, primaryError);

    try {
      const fallbackUrl = `http://localhost:5000/api/courses${qs}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const fallbackResult: CoursesApiResponse = await fallbackRes.json();
        if (fallbackResult.success && Array.isArray(fallbackResult.data)) {
          return fallbackResult.data;
        }
      }
    } catch (fallbackError) {
      console.error('Fallback API call also failed:', fallbackError);
    }

    throw primaryError;
  }
}

/**
 * Fetch a single course by slug from the backend API.
 */
export async function getCourseBySlug(slug: string): Promise<CourseApiModel | null> {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
  const endpoint = `${API_BASE_URL}/api/courses/${encodeURIComponent(cleanSlug)}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result: SingleCourseApiResponse = await res.json();
    if (result.success && result.data) {
      return result.data;
    }
    return null;
  } catch (primaryError) {
    console.warn(`Primary single course call to ${endpoint} failed, trying fallback:`, primaryError);

    try {
      const fallbackUrl = `http://localhost:5000/api/courses/${encodeURIComponent(cleanSlug)}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const fallbackResult: SingleCourseApiResponse = await fallbackRes.json();
        if (fallbackResult.success && fallbackResult.data) {
          return fallbackResult.data;
        }
      }
    } catch (fallbackError) {
      console.error('Fallback single course call failed:', fallbackError);
    }

    throw primaryError;
  }
}

/**
 * Fetch training centers for a specific course/training name.
 */
export async function getCentersForTraining(trainingName?: string): Promise<CenterApiModel[]> {
  const query = trainingName ? `?training=${encodeURIComponent(trainingName)}` : '';
  const endpoint = `${API_BASE_URL}/api/centers${query}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result: CentersApiResponse = await res.json();
    if (result.success && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  } catch (primaryError) {
    console.warn(`Primary centers call to ${endpoint} failed, trying fallback:`, primaryError);

    try {
      const fallbackUrl = `http://localhost:5000/api/centers${query}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const fallbackResult: CentersApiResponse = await fallbackRes.json();
        if (fallbackResult.success && Array.isArray(fallbackResult.data)) {
          return fallbackResult.data;
        }
      }
    } catch (fallbackError) {
      console.error('Fallback centers call failed:', fallbackError);
    }

    return [];
  }
}

export interface AllCentersResponse {
  centers: CenterApiModel[];
  states: string[];
  trainings: string[];
}

/**
 * Fetch all centers with optional filtering for state, training, search.
 */
export async function getAllCenters(filters?: {
  state?: string;
  training?: string;
  search?: string;
}): Promise<AllCentersResponse> {
  const params = new URLSearchParams();
  if (filters?.state && filters.state !== 'All') params.append('state', filters.state);
  if (filters?.training && filters.training !== 'All') params.append('training', filters.training);
  if (filters?.search) params.append('search', filters.search);

  const qs = params.toString() ? `?${params.toString()}` : '';
  const endpoint = `${API_BASE_URL}/api/centers${qs}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const result: CentersApiResponse = await res.json();
    if (result.success && Array.isArray(result.data)) {
      return {
        centers: result.data,
        states: result.states || [],
        trainings: result.trainings || [],
      };
    }
  } catch (err) {
    console.warn(`Primary getAllCenters failed on ${endpoint}:`, err);
    try {
      const fallbackUrl = `http://localhost:5000/api/centers${qs}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const fallbackResult: CentersApiResponse = await fallbackRes.json();
        if (fallbackResult.success && Array.isArray(fallbackResult.data)) {
          return {
            centers: fallbackResult.data,
            states: fallbackResult.states || [],
            trainings: fallbackResult.trainings || [],
          };
        }
      }
    } catch (fbErr) {
      console.error('Fallback getAllCenters failed:', fbErr);
    }
  }

  return { centers: [], states: [], trainings: [] };
}

export interface PostApiModel {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  content: string;
  link?: string;
  imageUrl?: string;
  isPublished?: boolean;
}

export interface PostsApiResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: PostApiModel[];
  message?: string;
}

export interface SinglePostApiResponse {
  success: boolean;
  data?: PostApiModel;
  message?: string;
}

/**
 * Fetch paginated blog / event posts.
 */
export async function getPosts(page: number = 1, limit: number = 6): Promise<PostsApiResponse> {
  const qs = `?page=${page}&limit=${limit}`;
  const endpoint = `${API_BASE_URL}/api/posts${qs}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const result: PostsApiResponse = await res.json();
    if (result.success && Array.isArray(result.data)) {
      return result;
    }
  } catch (err) {
    console.warn(`Primary getPosts failed on ${endpoint}:`, err);
    try {
      const fallbackUrl = `http://localhost:5000/api/posts${qs}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const fallbackResult: PostsApiResponse = await fallbackRes.json();
        if (fallbackResult.success && Array.isArray(fallbackResult.data)) {
          return fallbackResult;
        }
      }
    } catch (fbErr) {
      console.error('Fallback getPosts failed:', fbErr);
    }
  }

  return { success: false, count: 0, total: 0, page, pages: 0, data: [] };
}

/**
 * Fetch a single blog / event post by slug.
 */
export async function getPostBySlug(slug: string): Promise<PostApiModel | null> {
  const cleanSlug = encodeURIComponent(slug.trim());
  const endpoint = `${API_BASE_URL}/api/posts/${cleanSlug}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const result: SinglePostApiResponse = await res.json();
    if (result.success && result.data) {
      return result.data;
    }
  } catch (err) {
    console.warn(`Primary getPostBySlug failed on ${endpoint}:`, err);
    try {
      const fallbackUrl = `http://localhost:5000/api/posts/${cleanSlug}`;
      const fallbackRes = await fetch(fallbackUrl);
      if (fallbackRes.ok) {
        const fallbackResult: SinglePostApiResponse = await fallbackRes.json();
        if (fallbackResult.success && fallbackResult.data) {
          return fallbackResult.data;
        }
      }
    } catch (fbErr) {
      console.error('Fallback getPostBySlug failed:', fbErr);
    }
  }

  return null;
}
