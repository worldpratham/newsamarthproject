import { useState, useEffect } from 'react';
import {
  Users,
  MessageSquare,
  Search,
  Download,
  Phone,
  Mail,
  MapPin,
  Clock,
  Loader2,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import {
  adminGetVolunteers,
  adminGetContacts,
  exportToCSV,
  AdminVolunteer,
  AdminContactMessage
} from '@/services/adminApi';

export default function AdminLeads() {
  const [activeTab, setActiveTab] = useState<'volunteers' | 'contacts'>('volunteers');
  const [volunteers, setVolunteers] = useState<AdminVolunteer[]>([]);
  const [contacts, setContacts] = useState<AdminContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [vData, cData] = await Promise.all([
        adminGetVolunteers().catch(() => []),
        adminGetContacts().catch(() => [])
      ]);
      setVolunteers(vData);
      setContacts(cData);
    } catch (err) {
      console.error('Error loading leads:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExport = () => {
    if (activeTab === 'volunteers') {
      if (!volunteers.length) return alert('No volunteers to export.');
      const rows = volunteers.map((v, i) => ({
        'S.No': i + 1,
        'Full Name': v.fullName,
        Phone: v.phone,
        Email: v.email || '',
        City: v.city || '',
        'Area of Interest': v.areaOfInterest || '',
        Skills: v.skills || '',
        Availability: v.availability || '',
        Message: v.message || '',
        'Registered On': new Date(v.createdAt).toLocaleString('en-IN')
      }));
      exportToCSV('Samarth_Bharat_Volunteers', rows);
    } else {
      if (!contacts.length) return alert('No contact queries to export.');
      const rows = contacts.map((c, i) => ({
        'S.No': i + 1,
        Name: c.fullName || c.name || '',
        Phone: c.phone || '',
        Email: c.email || '',
        Subject: c.subject || '',
        Message: c.message || '',
        'Received On': new Date(c.createdAt).toLocaleString('en-IN')
      }));
      exportToCSV('Samarth_Bharat_Contact_Queries', rows);
    }
  };

  const filteredVolunteers = volunteers.filter((v) =>
    v.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.skills?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contacts.filter((c) =>
    (c.fullName || c.name)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Users className="w-6 h-6 text-purple-600" />
            Volunteers & Inquiries
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review community volunteer registrations and general contact form messages.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setRefreshing(true);
              fetchData();
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
            <span>Export {activeTab === 'volunteers' ? 'Volunteers' : 'Queries'} (CSV)</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-3 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('volunteers')}
          className={`pb-3 px-1 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'volunteers'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Volunteers ({volunteers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('contacts')}
          className={`pb-3 px-1 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'contacts'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Queries ({contacts.length})</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search in ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-2" />
          <p className="text-xs">Loading data...</p>
        </div>
      ) : activeTab === 'volunteers' ? (
        filteredVolunteers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <Users className="w-12 h-12 mx-auto stroke-1 mb-2 text-slate-300" />
            <p className="text-base font-semibold text-slate-700">No volunteer registrations found</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Volunteer Name</th>
                    <th className="px-6 py-4">City / Location</th>
                    <th className="px-6 py-4">Interest & Skills</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredVolunteers.map((v) => (
                    <tr key={v._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{v.fullName}</div>
                        {v.availability && (
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{v.availability}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-slate-700">
                        {v.city || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <div className="font-medium text-purple-700">{v.areaOfInterest || 'Community Support'}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{v.skills || 'No skills listed'}</div>
                      </td>
                      <td className="px-6 py-4 text-xs space-y-0.5">
                        <div>
                          <a href={`tel:${v.phone}`} className="font-mono text-slate-800 hover:text-purple-600">
                            {v.phone}
                          </a>
                        </div>
                        {v.email && <div className="text-[11px] text-slate-400">{v.email}</div>}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400 text-right">
                        {new Date(v.createdAt).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : filteredContacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <MessageSquare className="w-12 h-12 mx-auto stroke-1 mb-2 text-slate-300" />
          <p className="text-base font-semibold text-slate-700">No contact messages found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Sender</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredContacts.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {c.fullName || c.name || 'Anonymous User'}
                    </td>
                    <td className="px-6 py-4 text-xs space-y-0.5">
                      {c.phone && (
                        <div>
                          <a href={`tel:${c.phone}`} className="font-mono text-slate-800 hover:text-purple-600">
                            {c.phone}
                          </a>
                        </div>
                      )}
                      {c.email && <div className="text-[11px] text-slate-400">{c.email}</div>}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-700 max-w-md">
                      {c.subject && <div className="font-semibold text-slate-900 mb-0.5">{c.subject}</div>}
                      <p className="line-clamp-2">{c.message}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 text-right">
                      {new Date(c.createdAt).toLocaleDateString('en-IN')}
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
