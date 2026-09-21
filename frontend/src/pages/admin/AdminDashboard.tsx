import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  HeartHandshake,
  Users,
  PlusCircle,
  Download,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Phone
} from 'lucide-react';
import {
  adminGetCourses,
  adminGetEnrollments,
  adminGetDonations,
  adminGetVolunteers,
  adminUpdateEnrollmentStatus,
  exportToCSV,
  AdminEnrollment,
  AdminDonation
} from '@/services/adminApi';
import { CourseApiModel } from '@/services/courseApi';

export default function AdminDashboard() {
  const [courses, setCourses] = useState<CourseApiModel[]>([]);
  const [enrollments, setEnrollments] = useState<AdminEnrollment[]>([]);
  const [donations, setDonations] = useState<AdminDonation[]>([]);
  const [volunteersCount, setVolunteersCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [cData, eData, dData, vData] = await Promise.all([
        adminGetCourses().catch(() => []),
        adminGetEnrollments().catch(() => []),
        adminGetDonations().catch(() => []),
        adminGetVolunteers().catch(() => [])
      ]);
      setCourses(cData);
      setEnrollments(eData);
      setDonations(dData);
      setVolunteersCount(vData.length);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  // Quick Status Change on Dashboard
  const handleStatusChange = async (id: string, newStatus: any) => {
    try {
      await adminUpdateEnrollmentStatus(id, newStatus);
      setEnrollments((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  // Stats Calculations
  const totalDonationsAmount = donations.reduce((acc, curr) => {
    return curr.paymentStatus === 'confirmed' || curr.paymentStatus === 'initiated'
      ? acc + (Number(curr.amount) || 0)
      : acc;
  }, 0);

  const pendingEnrollments = enrollments.filter((e) => e.status === 'pending').length;

  const handleExportEnrollments = () => {
    if (!enrollments.length) {
      alert('No student admissions to export.');
      return;
    }
    const formatted = enrollments.map((e, index) => ({
      'S.No': index + 1,
      'Student Name': e.fullName,
      'Phone / WhatsApp': e.phone,
      Course: e.course,
      'Date of Birth': e.dateOfBirth ? new Date(e.dateOfBirth).toLocaleDateString('en-IN') : 'N/A',
      "Father's Name": e.fatherName || '',
      "Mother's Name": e.motherName || '',
      Qualification: e.qualification || '',
      Address: e.address || '',
      Status: e.status.toUpperCase(),
      'Submitted Date': new Date(e.createdAt).toLocaleString('en-IN')
    }));
    exportToCSV('Samarth_Bharat_Student_Admissions', formatted);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-3" />
        <p className="text-sm font-medium">Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/30">
            <span>Official Portal</span> • <span>Bhaorao Deoras Seva Nyas</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Welcome to Samarth Bharat Admin
          </h1>
          <p className="text-sm text-slate-300 mt-2">
            Overview of live courses, recent student admissions, donor contributions, and community programs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition-all backdrop-blur"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <Link
            to="/admin/courses?add=true"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-lg shadow-amber-500/30 transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add New Course</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Courses */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Courses
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{courses.length}</span>
            <span className="text-xs font-semibold text-emerald-600">Active</span>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Live on website</span>
            <Link to="/admin/courses" className="font-semibold text-blue-600 hover:underline inline-flex items-center gap-0.5">
              Manage <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: Enrollments */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Student Applications
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{enrollments.length}</span>
            {pendingEnrollments > 0 && (
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                {pendingEnrollments} pending
              </span>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Admissions received</span>
            <Link to="/admin/enrollments" className="font-semibold text-amber-600 hover:underline inline-flex items-center gap-0.5">
              View List <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Donations */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Donations
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">
              ₹{totalDonationsAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">{donations.length} total donors</span>
            <Link to="/admin/donations" className="font-semibold text-emerald-600 hover:underline inline-flex items-center gap-0.5">
              Receipts <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Card 4: Volunteers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Volunteers & Inquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">{volunteersCount}</span>
            <span className="text-xs font-semibold text-purple-600">Registered</span>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Community support</span>
            <Link to="/admin/leads" className="font-semibold text-purple-600 hover:underline inline-flex items-center gap-0.5">
              Review <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            ⚡
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-900">Quick Operations</h3>
            <p className="text-xs text-slate-600">Frequently used actions by coordinators</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportEnrollments}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export Students (CSV)
          </button>
          <Link
            to="/admin/courses?add=true"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Create Course
          </Link>
        </div>
      </div>

      {/* Recent Admissions Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Student Admissions</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest applications submitted by students via course application forms
            </p>
          </div>
          <Link
            to="/admin/enrollments"
            className="text-xs font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
          >
            View All ({enrollments.length}) →
          </Link>
        </div>

        {enrollments.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <GraduationCap className="w-12 h-12 mx-auto stroke-1 mb-2 opacity-50" />
            <p className="text-sm font-medium">No student admissions recorded yet.</p>
            <p className="text-xs mt-1">When students apply on the website, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Student Name</th>
                  <th className="px-6 py-3.5">Course</th>
                  <th className="px-6 py-3.5">Contact</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enrollments.slice(0, 5).map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      <div>{item.fullName}</div>
                      <div className="text-[11px] font-normal text-slate-400">
                        {item.qualification || 'Qualification not specified'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                        {item.course}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center gap-1 text-slate-700 hover:text-amber-600 font-mono text-xs"
                      >
                        <Phone className="w-3 h-3 text-slate-400" />
                        {item.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none focus:ring-2 cursor-pointer ${
                          item.status === 'enrolled'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 focus:ring-emerald-400'
                            : item.status === 'contacted'
                            ? 'bg-blue-50 text-blue-700 border-blue-200 focus:ring-blue-400'
                            : item.status === 'cancelled'
                            ? 'bg-rose-50 text-rose-700 border-rose-200 focus:ring-rose-400'
                            : 'bg-amber-50 text-amber-700 border-amber-200 focus:ring-amber-400'
                        }`}
                      >
                        <option value="pending">🟡 Pending</option>
                        <option value="contacted">🔵 Contacted</option>
                        <option value="enrolled">🟢 Enrolled</option>
                        <option value="cancelled">🔴 Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
