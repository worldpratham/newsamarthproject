import { FALLBACK_CENTERS } from '@/data/centersData';

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

export interface CenterVideo {
  title: string;
  url: string;
  thumbnail?: string;
  _id?: string;
}

export interface CenterApiModel {
  _id?: string;
  id?: string;
  centerName?: string;
  city?: string;
  state: string;
  courses?: string[];
  trainingName: string;
  pincode?: string;
  address: string;
  googleLocationUrl: string;
  contactPhone?: string;
  contactPerson?: string;
  timing?: string;
  images?: string[];
  videos?: CenterVideo[];
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
  cities?: string[];
  courses?: string[];
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

    if (trainingName) {
      return FALLBACK_CENTERS.filter((c) =>
        c.trainingName.toLowerCase().includes(trainingName.toLowerCase())
      );
    }
    return FALLBACK_CENTERS;
  }
}

export interface AllCentersResponse {
  centers: CenterApiModel[];
  cities: string[];
  courses: string[];
  states: string[];
  trainings: string[];
}

/**
 * Fetch all centers with optional filtering for city, course, state, training, search, centerId.
 */
export async function getAllCenters(filters?: {
  city?: string;
  course?: string;
  state?: string;
  training?: string;
  search?: string;
  centerId?: string;
}): Promise<AllCentersResponse> {
  const params = new URLSearchParams();
  if (filters?.city && filters.city !== 'All') params.append('city', filters.city);
  if (filters?.course && filters.course !== 'All') params.append('course', filters.course);
  if (filters?.training && filters.training !== 'All') params.append('training', filters.training);
  if (filters?.state && filters.state !== 'All') params.append('state', filters.state);
  if (filters?.search) params.append('search', filters.search);
  if (filters?.centerId) params.append('centerId', filters.centerId);

  const qs = params.toString() ? `?${params.toString()}` : '';
  const endpoint = `${API_BASE_URL}/api/centers${qs}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const result: CentersApiResponse = await res.json();
    if (result.success && Array.isArray(result.data)) {
      return {
        centers: result.data,
        cities: result.cities || [],
        courses: result.courses || result.trainings || [],
        states: result.states || [],
        trainings: result.trainings || result.courses || [],
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
            cities: fallbackResult.cities || [],
            courses: fallbackResult.courses || fallbackResult.trainings || [],
            states: fallbackResult.states || [],
            trainings: fallbackResult.trainings || fallbackResult.courses || [],
          };
        }
      }
    } catch (fbErr) {
      console.error('Fallback getAllCenters failed:', fbErr);
    }
  }

  // Final fallback to static verified centers
  let filtered = FALLBACK_CENTERS;
  if (filters?.city && filters.city !== 'All') {
    filtered = filtered.filter(c => c.city && c.city.toLowerCase() === filters.city!.toLowerCase());
  }
  if (filters?.course && filters.course !== 'All') {
    const cLow = filters.course.toLowerCase();
    filtered = filtered.filter(c =>
      (Array.isArray(c.courses) && c.courses.some(crs => crs.toLowerCase().includes(cLow))) ||
      (c.trainingName && c.trainingName.toLowerCase().includes(cLow))
    );
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase().trim();
    filtered = filtered.filter(c =>
      (c.centerName && c.centerName.toLowerCase().includes(s)) ||
      (c.city && c.city.toLowerCase().includes(s)) ||
      (c.address && c.address.toLowerCase().includes(s)) ||
      (c.pincode && c.pincode.toLowerCase().includes(s)) ||
      (Array.isArray(c.courses) && c.courses.some(crs => crs.toLowerCase().includes(s)))
    );
  }

  const cities = [...new Set(FALLBACK_CENTERS.map((c) => c.city).filter(Boolean) as string[])].sort();
  const coursesSet = new Set<string>();
  FALLBACK_CENTERS.forEach(c => {
    if (Array.isArray(c.courses)) c.courses.forEach(crs => coursesSet.add(crs));
    if (c.trainingName) c.trainingName.split(',').forEach(crs => coursesSet.add(crs.trim()));
  });

  return {
    centers: filtered,
    cities,
    courses: [...coursesSet].filter(Boolean).sort(),
    states: [...new Set(FALLBACK_CENTERS.map((c) => c.state))].sort(),
    trainings: [...coursesSet].filter(Boolean).sort(),
  };
}

/**
 * Fetch a single center by ID
 */
export async function getCenterById(id: string): Promise<CenterApiModel | null> {
  const endpoint = `${API_BASE_URL}/api/centers/${encodeURIComponent(id)}`;
  try {
    const res = await fetch(endpoint);
    if (res.ok) {
      const result = await res.json();
      if (result.success && result.data) return result.data;
    }
  } catch {
    try {
      const fb = await fetch(`http://localhost:5000/api/centers/${encodeURIComponent(id)}`);
      if (fb.ok) {
        const result = await fb.json();
        if (result.success && result.data) return result.data;
      }
    } catch {
      // ignore
    }
  }
  return FALLBACK_CENTERS.find(c => c._id === id || c.centerName === id) || null;
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
