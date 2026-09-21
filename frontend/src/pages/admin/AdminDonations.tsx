import { useState, useEffect } from 'react';
import {
  HeartHandshake,
  Search,
  Download,
  Phone,
  Mail,
  CreditCard,
  Building,
  RefreshCw,
  Loader2,
  Trash2,
  CheckCircle2,
  Copy
} from 'lucide-react';
import {
  adminGetDonations,
  adminUpdateDonationStatus,
  exportToCSV,
  AdminDonation
} from '@/services/adminApi';

export default function AdminDonations() {
  const [donations, setDonations] = useState<AdminDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const data = await adminGetDonations();
      setDonations(data);
    } catch (err) {
      console.error('Error fetching donations:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleStatusChange = async (id: string, newStatus: any) => {
    try {
      await adminUpdateDonationStatus(id, newStatus);
      setDonations((prev) =>
        prev.map((d) => (d._id === id ? { ...d, paymentStatus: newStatus } : d))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update donation status');
    }
  };

  const handleCopyPAN = (pan: string) => {
    navigator.clipboard.writeText(pan);
    alert(`Copied PAN ${pan} to clipboard for 80G tax receipt.`);
  };

  const handleExport = () => {
    if (!filteredDonations.length) {
      alert('No donation records to export.');
      return;
    }

    const rows = filteredDonations.map((d, index) => ({
      'S.No': index + 1,
      'Donor Full Name': d.fullName,
      'Donation Amount (INR)': d.amount,
      'PAN Number (80G)': d.panNumber,
      'Contact Phone': d.phone,
      'Email Address': d.email || '',
      Organization: d.companyOrOrg || 'Individual',
      'Address & PIN': d.addressWithPin || '',
      'UTR / Transaction Ref': d.utrNumber || '',
      'Payment Status': d.paymentStatus.toUpperCase(),
      'Donated On': new Date(d.createdAt).toLocaleString('en-IN')
    }));

    exportToCSV('Samarth_Bharat_Donations_80G', rows);
  };

  const totalAmount = donations.reduce((acc, curr) => {
    return curr.paymentStatus === 'confirmed' || curr.paymentStatus === 'initiated'
      ? acc + (Number(curr.amount) || 0)
      : acc;
  }, 0);

  const filteredDonations = donations.filter((item) => {
    const matchesSearch =
      item.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.panNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <HeartHandshake className="w-6 h-6 text-emerald-600" />
            Donations & 80G Tax Exemption
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track voluntary donations, donor PAN records for 80G exemption receipts, and payment status.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              setRefreshing(true);
              fetchDonations();
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
            <span>Export CA Audit (CSV)</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Received</span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            ₹{totalAmount.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Across confirmed and initiated donations</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Donors</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{donations.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">Individual and corporate contributors</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">80G Eligible (PAN Attached)</span>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {donations.filter((d) => !!d.panNumber).length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Tax deduction certificates required</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by donor name, PAN number, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 text-xs">
          {[
            { id: 'all', label: 'All Records' },
            { id: 'confirmed', label: '🟢 Confirmed' },
            { id: 'initiated', label: '🔵 Initiated / Pending' },
            { id: 'failed', label: '🔴 Failed' }
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => setStatusFilter(status.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                statusFilter === status.id
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
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
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
          <p className="text-xs">Loading donations records...</p>
        </div>
      ) : filteredDonations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
          <HeartHandshake className="w-12 h-12 mx-auto stroke-1 mb-2 text-slate-300" />
          <p className="text-base font-semibold text-slate-700">No donation records found</p>
          <p className="text-xs text-slate-400 mt-1">Donations initiated on the portal will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Donor Name & Org</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">PAN (For 80G)</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDonations.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Donor Name */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{item.fullName}</div>
                      {item.companyOrOrg && (
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          <span>{item.companyOrOrg}</span>
                        </div>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ₹{Number(item.amount).toLocaleString('en-IN')}
                    </td>

                    {/* PAN Number */}
                    <td className="px-6 py-4">
                      {item.panNumber ? (
                        <button
                          onClick={() => handleCopyPAN(item.panNumber)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-semibold transition-colors"
                          title="Click to copy PAN"
                        >
                          <span>{item.panNumber}</span>
                          <Copy className="w-3 h-3 text-slate-400" />
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">N/A</span>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 text-xs space-y-0.5">
                      <div>
                        <a href={`tel:${item.phone}`} className="font-mono text-slate-700 hover:text-amber-600">
                          {item.phone}
                        </a>
                      </div>
                      {item.email && <div className="text-[11px] text-slate-400">{item.email}</div>}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <select
                        value={item.paymentStatus}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                          item.paymentStatus === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.paymentStatus === 'failed'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="confirmed">🟢 Confirmed</option>
                        <option value="initiated">🟡 Initiated / Pending</option>
                        <option value="failed">🔴 Failed</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-xs text-slate-400 text-right">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
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
