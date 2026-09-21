import { CourseApiModel } from './courseApi';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AdminEnrollment {
  _id: string;
  id?: string;
  fullName: string;
  dateOfBirth?: string;
  fatherName?: string;
  motherName?: string;
  phone: string;
  email?: string;
  qualification?: string;
  course: string;
  address?: string;
  message?: string;
  status: 'pending' | 'contacted' | 'enrolled' | 'cancelled';
  createdAt: string;
}

export interface AdminDonation {
  _id: string;
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  amount: number;
  companyOrOrg?: string;
  addressWithPin?: string;
  panNumber: string;
  message?: string;
  paymentStatus: 'initiated' | 'confirmed' | 'failed' | 'pending';
  utrNumber?: string;
  createdAt: string;
}

export interface AdminVolunteer {
  _id: string;
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  areaOfInterest?: string;
  skills?: string;
  availability?: string;
  message?: string;
  createdAt: string;
}

export interface AdminContactMessage {
  _id: string;
  id?: string;
  fullName?: string;
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

const TOKEN_KEY = 'samarth_admin_token';
const USER_KEY = 'samarth_admin_user';

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredAdminUser(): AdminUser | null {
  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setAdminAuth(token: string, user: AdminUser): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logoutAdmin(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return !!getAdminToken();
}

/**
 * Common fetch helper with authorization and localhost fallback
 */
async function adminFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
  const token = getAdminToken();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const fullUrl = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(fullUrl, { ...options, headers });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    // If running in development with separate ports, try direct fallback
    if (!API_BASE_URL.includes('localhost:5000')) {
      try {
        const fallbackUrl = `http://localhost:5000${endpoint}`;
        const fallbackRes = await fetch(fallbackUrl, { ...options, headers });
        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok) return fallbackData;
      } catch {
        // Ignore fallback failure and throw primary error
      }
    }
    throw err;
  }
}

// ==================== AUTH APIs ====================

export async function loginAdmin(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
  const res = await adminFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  if (res.success && res.token && res.user) {
    setAdminAuth(res.token, res.user);
    return { token: res.token, user: res.user };
  }
  throw new Error(res.message || 'Login failed');
}

export async function getAdminProfile(): Promise<AdminUser> {
  const res = await adminFetch('/api/auth/me');
  if (res.success && res.user) {
    return res.user;
  }
  throw new Error('Failed to fetch profile');
}

// ==================== COURSES MANAGEMENT ====================

export async function adminGetCourses(): Promise<CourseApiModel[]> {
  const res = await adminFetch('/api/courses');
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
}

export async function adminCreateCourse(courseData: Partial<CourseApiModel>): Promise<CourseApiModel> {
  const res = await adminFetch('/api/courses', {
    method: 'POST',
    body: JSON.stringify(courseData)
  });
  if (res.success && res.data) {
    return res.data;
  }
  throw new Error(res.message || 'Failed to create course');
}

export async function adminUpdateCourse(idOrSlug: string, courseData: Partial<CourseApiModel>): Promise<CourseApiModel> {
  const res = await adminFetch(`/api/courses/${idOrSlug}`, {
    method: 'PUT',
    body: JSON.stringify(courseData)
  });
  if (res.success && res.data) {
    return res.data;
  }
  throw new Error(res.message || 'Failed to update course');
}

export async function adminDeleteCourse(idOrSlug: string): Promise<boolean> {
  const res = await adminFetch(`/api/courses/${idOrSlug}`, {
    method: 'DELETE'
  });
  return !!res.success;
}

// ==================== ENROLLMENTS MANAGEMENT ====================

export async function adminGetEnrollments(): Promise<AdminEnrollment[]> {
  const res = await adminFetch('/api/enrollments');
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
}

export async function adminUpdateEnrollmentStatus(id: string, status: string): Promise<AdminEnrollment> {
  const res = await adminFetch(`/api/enrollments/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
  if (res.success && res.data) {
    return res.data;
  }
  throw new Error(res.message || 'Failed to update enrollment status');
}

export async function adminDeleteEnrollment(id: string): Promise<boolean> {
  const res = await adminFetch(`/api/enrollments/${id}`, {
    method: 'DELETE'
  });
  return !!res.success;
}

// ==================== DONATIONS MANAGEMENT ====================

export async function adminGetDonations(): Promise<AdminDonation[]> {
  const res = await adminFetch('/api/donations');
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
}

export async function adminUpdateDonationStatus(id: string, paymentStatus: string): Promise<AdminDonation> {
  const res = await adminFetch(`/api/donations/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ paymentStatus })
  });
  if (res.success && res.data) {
    return res.data;
  }
  throw new Error(res.message || 'Failed to update donation status');
}

// ==================== VOLUNTEERS & CONTACTS ====================

export async function adminGetVolunteers(): Promise<AdminVolunteer[]> {
  const res = await adminFetch('/api/volunteers');
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
}

export async function adminGetContacts(): Promise<AdminContactMessage[]> {
  const res = await adminFetch('/api/contacts');
  if (res.success && Array.isArray(res.data)) {
    return res.data;
  }
  return [];
}

// ==================== CSV EXPORTER UTILITY ====================

export function exportToCSV(filename: string, rows: Record<string, any>[]): void {
  if (!rows || !rows.length) {
    alert('No data to export.');
    return;
  }

  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map((row) => {
        return keys
          .map((k) => {
            let val = row[k] === null || row[k] === undefined ? '' : String(row[k]);
            val = val.replace(/"/g, '""');
            if (val.search(/("|,|\n)/g) >= 0) {
              val = `"${val}"`;
            }
            return val;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
