import { useState, useEffect } from 'react';
import {
  GraduationCap,
  Search,
  Download,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Trash2,
  RefreshCw,
  Loader2,
  MessageCircle,
  Filter,
  CheckCircle2,
  Clock,
  User
} from 'lucide-react';
import {
  adminGetEnrollments,
  adminUpdateEnrollmentStatus,
  adminDeleteEnrollment,
  exportToCSV,
  AdminEnrollment
} from '@/services/adminApi';

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState<AdminEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const data = await adminGetEnrollments();
      setEnrollments(data);
    } catch (err) {
      console.error('Error fetching enrollments:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

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

  const handleDelete = async (enrollment: AdminEnrollment) => {
    if (!window.confirm(`Delete application for ${enrollment.fullName}?`)) return;
    try {
      await adminDeleteEnrollment(enrollment._id);
      setEnrollments((prev) => prev.filter((e) => e._id !== enrollment._id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete record');
    }
  };

  const handleExport = () => {
    if (!filteredEnrollments.length) {
      alert('No student records to export.');
      return;
    }

    const rows = filteredEnrollments.map((e, index) => ({
      'S.No': index + 1,
      'Full Name': e.fullName,
      'Contact Phone': e.phone,
      'Email Address': e.email || '',
      'Course Applied': e.course,
      'Date of Birth': e.dateOfBirth ? new Date(e.dateOfBirth).toLocaleDateString('en-IN') : '',
      "Father's Name": e.fatherName || '',
      "Mother's Name": e.motherName || '',
      Qualification: e.qualification || '',
      Address: e.address || '',
      'Candidate Message': e.message || '',
      'Admission Status': e.status.toUpperCase(),
      'Submitted On': new Date(e.createdAt).toLocaleString('en-IN')
    }));

    exportToCSV('Samarth_Bharat_Admissions', rows);
  };

  const filteredEnrollments = enrollments.filter((item) => {
    const matchesSearch =
      item.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <GraduationCap className="w-6 h-6 text-amber-500" />
            Student Admissions & Enrollments
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review admissions submitted by students, update calling status, and export to Excel/CSV.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setRefreshing(true);
              fetchEnrollments();
            }}
            disabled={refreshing}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export to Excel (CSV)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, mobile number, course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 text-xs">
          {[
            { id: 'all', label: 'All Applications' },
            { id: 'pending', label: '🟡 Pending' },
            { id: 'contacted', label: '🔵 Contacted' },
            { id: 'enrolled', label: '🟢 Enrolled' },
            { id: 'cancelled', label: '🔴 Cancelled' }
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => setStatusFilter(status.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                statusFilter === status.id
                  ? 'bg-amber-500 text-white shadow-xs font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto mb-2" />
          <p className="text-xs">Loading student admissions...</p>
        </div>
      ) : filteredEnrollments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <GraduationCap className="w-12 h-12 mx-auto stroke-1 mb-2 text-slate-300" />
          <p className="text-base font-semibold text-slate-700">No applications match your filter</p>
          <p className="text-xs text-slate-400 mt-1">Try clearing your search or status filter</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Student & Parents</th>
                  <th className="px-6 py-4">Course Applied</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Address & Education</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnrollments.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Student Name */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{item.fullName}</div>
                      <div className="text-[11px] text-slate-500">
                        {item.fatherName ? `Father: ${item.fatherName}` : ''}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        DOB: {item.dateOfBirth ? new Date(item.dateOfBirth).toLocaleDateString('en-IN') : 'N/A'}
                      </div>
                    </td>

                    {/* Course */}
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-semibold">
                        {item.course}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">
                        Applied: {new Date(item.createdAt).toLocaleDateString('en-IN')}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${item.phone}`}
                          className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-800 hover:text-amber-600"
                        >
                          <Phone className="w-3 h-3 text-slate-400" />
                          {item.phone}
                        </a>
                        <a
                          href={`https://wa.me/91${item.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open WhatsApp Chat"
                          className="p-1 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      {item.email && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Mail className="w-3 h-3 shrink-0" />
                          <span className="truncate max-w-[140px]">{item.email}</span>
                        </div>
                      )}
                    </td>

                    {/* Address & Qualification */}
                    <td className="px-6 py-4 text-xs">
                      <div className="font-medium text-slate-700">
                        {item.qualification || 'Not provided'}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 max-w-xs" title={item.address}>
                        {item.address || 'Address not provided'}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                          item.status === 'enrolled'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.status === 'contacted'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : item.status === 'cancelled'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="pending">🟡 Pending</option>
                        <option value="contacted">🔵 Contacted</option>
                        <option value="enrolled">🟢 Enrolled</option>
                        <option value="cancelled">🔴 Cancelled</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(item)}
                        title="Delete application"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
