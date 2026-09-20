import { useState, useEffect, useMemo } from 'react';
import {
  MapPin,
  Phone,
  Search,
  Filter,
  X,
  Sparkles,
  Loader2,
  CheckCircle2,
  User,
  Mail,
  Send,
  Building2,
} from 'lucide-react';
import { getAllCenters, CenterApiModel } from '@/services/courseApi';

export default function CentresDetails() {
  const [centers, setCenters] = useState<CenterApiModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiveFromApi, setIsLiveFromApi] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedTraining, setSelectedTraining] = useState('All');

  // Enrollment Modal state
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);
  const [enrollForm, setEnrollForm] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    trainingName: '',
  });

  useEffect(() => {
    document.title = 'Centres Details - Samarth Bharat';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let isMounted = true;

    async function fetchCenters() {
      try {
        setLoading(true);
        console.log('[CentresDetails] Fetching centers from API: /api/centers');
        const res = await getAllCenters();
        console.log('[CentresDetails] Received centers count from API:', res?.centers?.length);
        if (isMounted && res && res.centers && res.centers.length > 0) {
          setCenters(res.centers);
          setIsLiveFromApi(true);
        }
      } catch (err) {
        console.error('[CentresDetails] Failed to fetch centers from API:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCenters();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter options
  const uniqueStates = useMemo(() => {
    const set = new Set(centers.map((c) => c.state).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [centers]);

  const uniqueTrainings = useMemo(() => {
    const set = new Set(centers.map((c) => c.trainingName).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [centers]);

  // Filtered centers
  const filteredCenters = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return centers.filter((c) => {
      const matchState =
        selectedState === 'All' ||
        (c.state || '').toLowerCase() === selectedState.toLowerCase();
      const matchTraining =
        selectedTraining === 'All' ||
        (c.trainingName || '').toLowerCase() === selectedTraining.toLowerCase();

      if (!matchState || !matchTraining) return false;

      if (!q) return true;

      const stateStr = (c.state || '').toLowerCase();
      const trainingStr = (c.trainingName || '').toLowerCase();
      const addressStr = (c.address || '').toLowerCase();
      const locationStr = (c.googleLocationUrl || '').toLowerCase();

      return (
        stateStr.includes(q) ||
        trainingStr.includes(q) ||
        addressStr.includes(q) ||
        locationStr.includes(q)
      );
    });
  }, [centers, searchQuery, selectedState, selectedTraining]);

  const openEnrollModal = (center?: CenterApiModel) => {
    if (center) {
      setEnrollForm((prev) => ({
        ...prev,
        state: center.state || '',
        trainingName: center.trainingName || '',
      }));
    }
    setEnrollModalOpen(true);
  };

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollSubmitted(true);
    setTimeout(() => {
      setEnrollSubmitted(false);
      setEnrollModalOpen(false);
      setEnrollForm({
        name: '',
        phone: '',
        email: '',
        state: '',
        trainingName: '',
      });
    }, 2000);
  };

  return (
    <div className="bg-white w-full overflow-x-hidden min-h-screen">
      {/* 1. Hero Gradient Title Banner matching WordPress elementor-element-b376433 */}
      <section
        className="w-full py-12 sm:py-16 md:py-20 text-center text-white overflow-hidden shadow-xs"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-['Times_New_Roman',serif] text-white text-3xl sm:text-4xl md:text-[44px] font-extrabold leading-tight tracking-wide">
            All Centres Details
          </h1>
          <p className="font-['Montserrat',sans-serif] text-white/95 text-sm sm:text-base md:text-lg font-normal mt-4 max-w-4xl mx-auto leading-relaxed">
            Explore our centre, available courses, and the opportunities we provide to help learners build successful careers.
          </p>
          
        </div>
      </section>

      {/* 2. Main Content Section matching WordPress elementor-element-db54098 */}
      <section className="w-full py-10 sm:py-14 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Enroll Now Button (Center Aligned matching WordPress elementor-element-b2efe03) */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => openEnrollModal()}
              className="bg-[#F87902] hover:bg-[#e06c00] text-white font-['Montserrat',sans-serif] text-sm sm:text-[15px] font-semibold uppercase tracking-wider py-3 px-8 rounded shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              Enroll Now
            </button>
          </div>

          {/* Quick Search & Filter Toolbar */}
      

          {/* 3. The wpdtSimpleTable-1 matching WordPress table layout */}
          <div className="overflow-x-auto border border-[#ccc] shadow-2xs mb-8 bg-white">
            <table
              id="wpdtSimpleTable-1"
              className="w-full border-collapse text-center font-['Montserrat',sans-serif] text-xs sm:text-[13px]"
              style={{ borderCollapse: 'collapse', borderSpacing: '0px' }}
            >
              <thead>
                <tr className="wpdt-cell-row select-none">
                  <th
                    className="border border-[#ccc] py-3 px-3.5 font-bold text-center text-white bg-[#001129] w-[14%]"
                    style={{ backgroundColor: '#001129', color: '#FFFFFF', padding: '10px' }}
                  >
                    State
                  </th>
                  <th
                    className="border border-[#ccc] py-3 px-3.5 font-bold text-center text-white bg-[#001129] w-[20%]"
                    style={{ backgroundColor: '#001129', color: '#FFFFFF', padding: '10px' }}
                  >
                    Training Name
                  </th>
                  <th
                    className="border border-[#ccc] py-3 px-4 font-bold text-center text-white bg-[#001129] w-[34%]"
                    style={{ backgroundColor: '#001129', color: '#FFFFFF', padding: '10px' }}
                  >
                    Address
                  </th>
                  <th
                    className="border border-[#ccc] py-3 px-3.5 font-bold text-center text-white bg-[#001129] w-[20%]"
                    style={{ backgroundColor: '#001129', color: '#FFFFFF', padding: '10px' }}
                  >
                    Google Location
                  </th>
                  <th
                    className="border border-[#ccc] py-3 px-3.5 font-bold text-center text-white bg-[#001129] w-[12%]"
                    style={{ backgroundColor: '#001129', color: '#FFFFFF', padding: '10px' }}
                  >
                    Contact Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-gray-500 bg-white border border-[#ccc]">
                      <Loader2 size={28} className="animate-spin text-[#004AAD] mx-auto mb-2" />
                      Loading centres details from database...
                    </td>
                  </tr>
                ) : filteredCenters.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500 bg-white border border-[#ccc]">
                      No centres match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredCenters.map((center, idx) => {
                    const cleanUrl = (center.googleLocationUrl || '').replace(/&amp;/g, '&');
                    const addressParts = (center.address || '')
                      .split(/<br\s*\/?>|\n|(?=\s*(?:Land\s*mark|Landmark)\b)/i)
                      .map((p) => p.trim())
                      .filter(Boolean);

                    const isEven = idx % 2 === 1;

                    return (
                      <tr
                        key={center._id || idx}
                        className={`wpdt-cell-row transition-colors ${
                          isEven ? 'bg-[#eeeeee]' : 'bg-white'
                        } hover:bg-[#e6e6e6]`}
                      >
                        {/* 1. State */}
                        <td
                          className="border border-[#ccc] py-2.5 px-3 text-gray-800 text-center align-middle font-medium"
                          style={{ padding: '10px' }}
                        >
                          {center.state}
                        </td>

                        {/* 2. Training Name */}
                        <td
                          className="border border-[#ccc] py-2.5 px-3 text-gray-800 text-center align-middle font-semibold"
                          style={{ padding: '10px' }}
                        >
                          {center.trainingName}
                        </td>

                        {/* 3. Address */}
                        <td
                          className="border border-[#ccc] py-2.5 px-4 text-gray-800 text-left align-middle leading-relaxed"
                          style={{ padding: '10px' }}
                        >
                          {addressParts.map((part, pIdx) => (
                            <span key={pIdx} className="block">
                              {part}
                            </span>
                          ))}
                        </td>

                        {/* 4. Google Location */}
                        <td
                          className="border border-[#ccc] py-2.5 px-3 align-middle text-center"
                          style={{ padding: '10px' }}
                        >
                          {cleanUrl ? (
                            <a
                              href={cleanUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0563C1] underline hover:text-[#004AAD] break-all text-xs sm:text-[12.5px] leading-normal"
                            >
                              {cleanUrl}
                            </a>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>

                        {/* 5. Contact Number (Enroll Now / Call) */}
                        <td
                          className="border border-[#ccc] py-2.5 px-3 align-middle text-center"
                          style={{ padding: '10px' }}
                        >
                          <div className="flex flex-col items-center justify-center gap-1.5">
                            <button
                              onClick={() => openEnrollModal(center)}
                              className="bg-[#F87902] hover:bg-[#e06c00] text-white text-xs font-semibold px-3 py-1.5 rounded shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
                            >
                              Enroll Now
                            </button>
                       
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom Enroll Now Button (Left Aligned matching WordPress elementor-element-ff5e80f) */}
          <div className="mt-4">
            <button
              onClick={() => openEnrollModal()}
              className="bg-[#F87902] hover:bg-[#e06c00] text-white font-['Montserrat',sans-serif] text-sm sm:text-[15px] font-semibold uppercase tracking-wider py-3 px-8 rounded shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </section>

      {/* 4. Enroll Now Modal Popup matching Elementor Popup 1022 */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative border border-gray-100">
            <button
              onClick={() => setEnrollModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {enrollSubmitted ? (
              <div className="text-center py-8 space-y-3 animate-fade-in">
                <CheckCircle2 size={56} className="text-green-500 mx-auto" />
                <h3 className="font-['Times_New_Roman',serif] text-2xl font-bold text-gray-900">
                  Enrollment Inquiry Submitted!
                </h3>
                <p className="font-['Montserrat',sans-serif] text-sm text-gray-600">
                  Thank you! Our center coordinator will contact you shortly with course schedules and batch details.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-['Times_New_Roman',serif] text-[#001C5C] text-2xl font-bold mb-1">
                  Enroll Now – Begin Your Skill Journey Today!
                </h3>
                <p className="font-['Montserrat',sans-serif] text-xs text-gray-500 mb-6">
                  Please ensure all details are filled correctly for smooth enrollment and communication.
                </p>

                <form onSubmit={handleEnrollSubmit} className="space-y-4 font-['Montserrat',sans-serif]">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={enrollForm.name}
                        onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001C5C]/20 focus:border-[#001C5C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          required
                          value={enrollForm.phone}
                          onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                          placeholder="Mobile number"
                          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001C5C]/20 focus:border-[#001C5C]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={enrollForm.email}
                          onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                          placeholder="Email (optional)"
                          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001C5C]/20 focus:border-[#001C5C]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        State *
                      </label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          required
                          value={enrollForm.state}
                          onChange={(e) => setEnrollForm({ ...enrollForm, state: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001C5C]/20 focus:border-[#001C5C]"
                        >
                          <option value="">Choose State</option>
                          {uniqueStates
                            .filter((s) => s !== 'All')
                            .map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Training Program *
                      </label>
                      <div className="relative">
                        <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          required
                          value={enrollForm.trainingName}
                          onChange={(e) => setEnrollForm({ ...enrollForm, trainingName: e.target.value })}
                          className="w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001C5C]/20 focus:border-[#001C5C]"
                        >
                          <option value="">Choose Course</option>
                          {uniqueTrainings
                            .filter((t) => t !== 'All')
                            .map((tr) => (
                              <option key={tr} value={tr}>
                                {tr}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#F87902] hover:bg-[#e06c00] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send size={15} />
                      Submit Enrollment Inquiry
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
