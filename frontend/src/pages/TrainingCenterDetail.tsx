import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Video,
  Play,
  Phone,
  Clock,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  X,
  ExternalLink,
  Eye,
  CheckCircle2,
  Building2,
  Filter,
  RotateCcw,
  Loader2,
  User,
  Mail,
  Send,
  Calendar,
} from 'lucide-react';
import { getAllCenters, CenterApiModel, CenterVideo } from '@/services/courseApi';

interface CustomDropdownOption {
  value: string;
  label: string;
  sublabel?: string;
}

interface CustomDropdownProps {
  value: string;
  placeholder: string;
  options: CustomDropdownOption[];
  onChange: (value: string) => void;
  searchable?: boolean;
}

function CustomDropdown({
  value,
  placeholder,
  options,
  onChange,
  searchable = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    const term = searchTerm.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(term) ||
        (opt.sublabel && opt.sublabel.toLowerCase().includes(term))
    );
  }, [options, searchTerm]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? 'z-40' : 'z-10'}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F87902] transition-all cursor-pointer flex items-center justify-between hover:bg-slate-100/80 text-left"
      >
        <span
          className={`truncate ${
            !selectedOption || selectedOption.value === '' || selectedOption.value === 'All'
              ? 'text-slate-700'
              : 'text-slate-900 font-semibold'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 ml-2 text-slate-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#F87902]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-50 py-1.5 focus:outline-none animate-in fade-in-50 duration-150">
          {searchable && options.length > 5 && (
            <div className="p-2 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type to filter..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-md pl-8 pr-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#F87902]"
                  autoFocus
                />
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          )}

          {filteredOptions.length === 0 ? (
            <div className="px-3.5 py-3 text-xs text-slate-400 text-center">
              No matching options found
            </div>
          ) : (
            filteredOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50/80 text-[#F87902] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#001C5C]'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="block truncate">{opt.label}</span>
                    {opt.sublabel && (
                      <span className="text-[11px] text-slate-400 block font-normal truncate mt-0.5">
                        {opt.sublabel}
                      </span>
                    )}
                  </div>
                  {isSelected && <Check size={14} className="shrink-0 text-[#F87902]" />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default function TrainingCenterDetail() {
  // Centers data from API
  const [centers, setCenters] = useState<CenterApiModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiCities, setApiCities] = useState<string[]>([]);
  const [apiCourses, setApiCourses] = useState<string[]>([]);

  // Search & Filter state (3-4 search bars)
  const [selectedCenterId, setSelectedCenterId] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedCourse, setSelectedCourse] = useState<string>('All');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Active Center in Spotlight
  const [activeCenter, setActiveCenter] = useState<CenterApiModel | null>(null);

  // Modals state
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string } | null>(null);
  const [activeVideo, setActiveVideo] = useState<CenterVideo | null>(null);

  // Enrollment Modal (Popup 1022)
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollSubmitting, setEnrollSubmitting] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [enrollError, setEnrollError] = useState('');
  const [enrollForm, setEnrollForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    qualification: '',
    course: '',
    center: '',
    address: '',
    message: '',
  });

  // ESC key listener to close active modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImg) setLightboxImg(null);
        else if (activeVideo) setActiveVideo(null);
        else if (enrollModalOpen) setEnrollModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImg, activeVideo, enrollModalOpen]);

  // Fetch centers on mount and when city/course filters change
  useEffect(() => {
    document.title = 'Training Center detail - Samarth Bharat';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let isMounted = true;

    async function loadCenters() {
      try {
        setLoading(true);
        const res = await getAllCenters({
          city: selectedCity !== 'All' ? selectedCity : undefined,
          course: selectedCourse !== 'All' ? selectedCourse : undefined,
        });

        if (isMounted) {
          setCenters(res.centers || []);
          if (res.cities && res.cities.length > 0) setApiCities(res.cities);
          if (res.courses && res.courses.length > 0) setApiCourses(res.courses);

          // If no active center selected or current active center is not in new list, pick the first one
          if (res.centers && res.centers.length > 0) {
            setActiveCenter((prev) => {
              if (prev && res.centers.some((c) => c._id === prev._id || c.centerName === prev.centerName)) {
                return prev;
              }
              return res.centers[0];
            });
          }
        }
      } catch (err) {
        console.error('Failed to load centers from API:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCenters();

    return () => {
      isMounted = false;
    };
  }, [selectedCity, selectedCourse]);

  // Client-side keyword search across center name, address, pincode, courses
  const filteredCenters = useMemo(() => {
    let list = centers;

    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase().trim();
      list = list.filter((c) => {
        const name = (c.centerName || '').toLowerCase();
        const addr = (c.address || '').toLowerCase();
        const city = (c.city || '').toLowerCase();
        const pin = (c.pincode || '').toLowerCase();
        const courses = (c.courses || [c.trainingName]).join(' ').toLowerCase();

        return name.includes(q) || addr.includes(q) || city.includes(q) || pin.includes(q) || courses.includes(q);
      });
    }

    return list;
  }, [centers, searchKeyword]);

  // When filtered centers update, ensure activeCenter is among them
  useEffect(() => {
    if (filteredCenters.length > 0) {
      if (!activeCenter || !filteredCenters.some((c) => (c._id && c._id === activeCenter._id) || c.centerName === activeCenter.centerName)) {
        setActiveCenter(filteredCenters[0]);
        setSelectedCenterId(filteredCenters[0]._id || filteredCenters[0].centerName || '');
      }
    } else {
      setActiveCenter(null);
      setSelectedCenterId('');
    }
  }, [filteredCenters]);

  // Handle center selection from dropdown
  const handleCenterSelect = (val: string) => {
    setSelectedCenterId(val);
    const found = filteredCenters.find((c) => (c._id && c._id === val) || c.centerName === val);
    if (found) {
      setActiveCenter(found);
      const spotlightEl = document.getElementById('center-spotlight');
      if (spotlightEl) {
        spotlightEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedCity('All');
    setSelectedCourse('All');
    setSearchKeyword('');
    setSelectedCenterId('');
  };

  // Options for custom dropdowns
  const cityOptions = useMemo<CustomDropdownOption[]>(() => [
    { value: 'All', label: `Cities (${apiCities.length})` },
    ...apiCities.map((city) => ({ value: city, label: city })),
  ], [apiCities]);

  const courseOptions = useMemo<CustomDropdownOption[]>(() => [
    { value: 'All', label: `Courses (${apiCourses.length})` },
    ...apiCourses.map((crs) => ({ value: crs, label: crs })),
  ], [apiCourses]);

  const centerOptions = useMemo<CustomDropdownOption[]>(() => [
    { value: '', label: '-- Choose Center from Dropdown --' },
    ...filteredCenters.map((c, i) => ({
      value: c._id || c.centerName || String(i),
      label: `${c.centerName || c.address} (${c.city})`,
      sublabel: c.address && c.centerName ? c.address : undefined,
    })),
  ], [filteredCenters]);

  // Helper to ensure 4 images per center
  const getCenterImages = (center: CenterApiModel): string[] => {
    if (center.images && center.images.length === 4) return center.images;
    return [
      center.images?.[0] || '/courses/ac-repair-course.jpg',
      center.images?.[1] || '/gallery/gallery-1.jpg',
      center.images?.[2] || '/gallery/gallery-2.jpg',
      center.images?.[3] || '/gallery/gallery-7.jpg',
    ];
  };

  // Helper to ensure 2 videos per center
  const getCenterVideos = (center: CenterApiModel): CenterVideo[] => {
    if (center.videos && center.videos.length >= 2) return center.videos.slice(0, 2);
    return [
      {
        title: `${center.centerName} - Training Center Facilities Tour`,
        url: 'https://www.youtube.com/watch?v=077D38JpUv4',
        thumbnail: center.images?.[1] || '/gallery/gallery-1.jpg',
      },
      {
        title: `${(center.courses && center.courses[0]) || center.trainingName || 'Skill'} Practical Demonstration Session`,
        url: 'https://www.youtube.com/watch?v=q6t8rS618fQ',
        thumbnail: center.images?.[2] || '/gallery/gallery-8.jpg',
      },
    ];
  };

  // Maps course name / training name to canonical Course Detail route like /community-training-programs
  const getCourseSlugForCourseName = (courseName?: string): string => {
    const c = (courseName || '').toLowerCase().trim();

    if (c.includes('nail')) {
      return '/courses/nail-art-course';
    }
    if (c.includes('ro') && !c.includes('ac') && !c.includes('fridge')) {
      return '/courses/ro-repairing-course';
    }
    if (
      c.includes('ac') ||
      c.includes('fridge') ||
      c.includes('refrigerat') ||
      c.includes('ro') ||
      c.includes('electrician') ||
      c.includes('solar')
    ) {
      return '/courses/ac-fridge-repair-course';
    }
    if (c.includes('beaut') || c.includes('hair')) {
      return '/courses/beautician-course';
    }
    if (c.includes('cutt') || c.includes('tailor') || c.includes('fashion')) {
      return '/courses/cutting-tailoring';
    }
    if (c.includes('baker')) {
      return '/courses/bakery-course';
    }
    if (
      c.includes('truck') ||
      c.includes('bike') ||
      c.includes('weld') ||
      c.includes('motor') ||
      c.includes('driv')
    ) {
      return '/courses/truck-repairing-course';
    }
    if (c.includes('gda') || c.includes('general duty') || c.includes('assistant')) {
      return '/courses/general-duty-assistant';
    }
    if (c.includes('carpenter') || c.includes('furniture')) {
      return '/courses/carpenter-training';
    }
    if (c.includes('digital market') || c.includes('market') || c.includes('tally') || c.includes('gst')) {
      return '/courses/digital-marketing-course';
    }
    if (c.includes('video')) {
      return '/courses/video-editing-course';
    }
    if (c.includes('ai') || c.includes('prompt')) {
      return '/courses/ai-prompt-engineering';
    }
    if (c.includes('flutter') || c.includes('app')) {
      return '/courses/flutter-app-development';
    }

    return '/courses/cutting-tailoring';
  };

  // Get course slug for a specific center
  const getCourseSlugForCenter = (center: CenterApiModel): string => {
    const primaryName = (center.courses && center.courses[0]) || center.trainingName || '';
    return getCourseSlugForCourseName(primaryName);
  };

  // Open enrollment modal for the active center
  const handleOpenEnrollModal = (center: CenterApiModel, defaultCourse?: string) => {
    setEnrollError('');
    setEnrollSuccess(false);
    setEnrollForm({
      fullName: '',
      phone: '',
      email: '',
      qualification: '',
      course: defaultCourse || (center.courses && center.courses[0]) || center.trainingName || '',
      center: center.centerName || center.address,
      address: '',
      message: '',
    });
    setEnrollModalOpen(true);
  };

  // Handle phone input: strictly digits only, max 10
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
    setEnrollForm((prev) => ({ ...prev, phone: clean }));
    if (enrollError) setEnrollError('');
  };

  // Submit enrollment
  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollError('');

    if (!enrollForm.fullName.trim()) {
      setEnrollError('Please enter candidate full name');
      return;
    }

    if (!enrollForm.phone || enrollForm.phone.length !== 10) {
      setEnrollError('Please provide a valid 10-digit mobile number');
      return;
    }

    if (enrollForm.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(enrollForm.email.trim())) {
        setEnrollError('Please enter a valid email address');
        return;
      }
    }

    try {
      setEnrollSubmitting(true);
      const payload = {
        fullName: enrollForm.fullName.trim(),
        phone: enrollForm.phone.trim(),
        email: enrollForm.email.trim().toLowerCase(),
        course: enrollForm.course || 'Vocational Training',
        qualification: enrollForm.qualification.trim(),
        address: enrollForm.address.trim() || enrollForm.center,
        message: `Center: ${enrollForm.center}. Message: ${enrollForm.message.trim()}`,
      };

      const primaryUrl = `${(import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')}/api/enrollments`;
      let res: Response;
      try {
        res = await fetch(primaryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        res = await fetch('http://localhost:5000/api/enrollments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.message || 'Failed to submit enrollment');
      }

      setEnrollSuccess(true);
      setTimeout(() => {
        setEnrollModalOpen(false);
        setEnrollSuccess(false);
      }, 4000);
    } catch (err: any) {
      setEnrollError(err.message || 'Failed to submit enrollment. Please try again.');
    } finally {
      setEnrollSubmitting(false);
    }
  };

  // Helper to extract YouTube embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('embed/')) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-['Montserrat',sans-serif] text-[#333333]">
      {/* =========================================================================
          HERO BANNER
          ========================================================================= */}
      <section
        className="w-full py-12 md:py-16 px-4 flex items-center justify-center text-center text-white"
        style={{
          background: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
          minHeight: '220px',
        }}
      >
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 bg-white/20 backdrop-blur-xs text-white text-xs uppercase tracking-widest font-semibold rounded-full">
            Samarth Bharat Skill Network
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight"
            style={{ fontFamily: '"Times New Roman", Times, serif', fontWeight: 800 }}
          >
            Training Center detail
          </h1>
          <p className="text-sm sm:text-base text-white/95 max-w-2xl mx-auto font-normal">
            Explore our state-of-the-art vocational training centers, modern workshop laboratories, clickable locations, and facility walkthroughs.
          </p>
          <div className="pt-2">
            <Link
              to="/centres-details"
              className="inline-flex items-center gap-2 bg-white text-[#001C5C] hover:bg-orange-50 hover:text-[#F87902] px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <Building2 size={15} className="text-[#F87902]" />
              <span>All Center Details</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEARCH & FILTERS BAR (3-4 Search / Selection Inputs)
          1. Select Center Dropdown
          2. Search by City Dropdown
          3. Search by Course Dropdown
          4. Keyword Search Bar
          ========================================================================= */}
      <section className="relative -mt-7 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200/80 p-5 sm:p-6 transition-all">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2 text-[#001C5C] font-bold text-sm sm:text-base">
              <Filter size={18} className="text-[#F87902]" />
              <span>Filter & Search Training Centers</span>
            </div>
            <div className="flex items-center gap-2.5">
              {/* <Link
                to="/centres-details"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#001C5C] hover:bg-[#F87902] text-white text-xs font-bold rounded-lg shadow-xs hover:shadow transition-all"
                title="View All Center Details"
              >
                <Building2 size={13} className="text-[#F87902]" />
                <span>All Center Details</span>
                <ChevronRight size={13} />
              </Link> */}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-slate-500 hover:text-[#F87902] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>

          {/* Top Row: Search by City, Course, and Keyword */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search 1: Search by City */}
            <div>
              <label className="block text-[11.5px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <MapPin size={13} className="text-[#F87902]" />
                Search by City / Zone
              </label>
              <CustomDropdown
                value={selectedCity}
                placeholder={`All Cities (${apiCities.length})`}
                options={cityOptions}
                onChange={(val) => setSelectedCity(val)}
                searchable
              />
            </div>

            {/* Search 2: Search by Course */}
            <div>
              <label className="block text-[11.5px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <BookOpen size={13} className="text-[#F87902]" />
                Search by Course / Training
              </label>
              <CustomDropdown
                value={selectedCourse}
                placeholder={`All Courses (${apiCourses.length})`}
                options={courseOptions}
                onChange={(val) => setSelectedCourse(val)}
                searchable
              />
            </div>

            {/* Search 3: Keyword Search */}
            <div>
              <label className="block text-[11.5px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Search size={13} className="text-[#F87902]" />
                Search Name, Address, PIN
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="e.g. Dilshad Garden, Kalkaji, 110095..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-8 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F87902] placeholder-slate-400"
                />
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                {searchKeyword && (
                  <button
                    type="button"
                    onClick={() => setSearchKeyword('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Select Center Directly Dropdown (Dedicated Line) */}
          <div className="mt-4 pt-3.5 border-t border-slate-100">
            <label className="block text-[11.5px] font-bold text-slate-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Building2 size={13} className="text-[#F87902]" />
              Select Center Directly
            </label>
            <CustomDropdown
              value={selectedCenterId}
              placeholder="-- Choose Center from Dropdown --"
              options={centerOptions}
              onChange={handleCenterSelect}
              searchable
            />
          </div>

          {/* Results summary & Active filters */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Showing <strong className="text-[#001C5C] font-bold">{filteredCenters.length}</strong> verified training centers
              {selectedCity !== 'All' && <span> in <strong className="text-slate-800">{selectedCity}</strong></span>}
              {selectedCourse !== 'All' && <span> for <strong className="text-slate-800">{selectedCourse}</strong></span>}
            </div>
            {filteredCenters.length > 0 && activeCenter && (
              <div className="text-slate-500">
                Selected: <span className="font-semibold text-[#001C5C]">{activeCenter.centerName}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* =========================================================================
            FEATURED / SELECTED CENTER SPOTLIGHT
            "page open hote hi jo center search kiya hai uski 4 images or 2 video add karna hai jo clickable honi chahiye."
            ========================================================================= */}
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 size={36} className="animate-spin text-[#F87902]" />
            <p className="text-slate-600 text-sm font-medium">Loading training centers from API...</p>
          </div>
        ) : activeCenter ? (
          <section
            id="center-spotlight"
            className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transition-all scroll-mt-24"
          >
            {/* Spotlight Header Banner */}
            <div className="bg-[#001C5C] text-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#F87902] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-sm">
                    {activeCenter.city}
                  </span>
                  <span className="bg-white/20 text-white text-[11px] font-medium px-2.5 py-0.5 rounded-sm">
                    {activeCenter.state}
                  </span>
                  {activeCenter.pincode && (
                    <span className="bg-white/10 text-white/90 text-[11px] font-mono px-2 py-0.5 rounded-sm">
                      PIN: {activeCenter.pincode}
                    </span>
                  )}
                </div>

                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  {activeCenter.centerName}
                </h2>

                <p className="text-white/85 text-xs sm:text-sm flex items-start gap-1.5 max-w-3xl">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-[#F87902]" />
                  <span>{activeCenter.address}</span>
                </p>
              </div>

              {/* Action Buttons: Course Detail, Clickable Location & Enroll */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
                {/* All Center Details Button */}
                {/* <Link
                  to="/centres-details"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-3 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95"
                  title="View All Centers List"
                >
                  <Building2 size={15} className="text-[#F87902]" />
                  <span>All Center Details</span>
                  <ChevronRight size={14} />
                </Link> */}

                {/* Course Detail Button matching /community-training-programs */}
                <Link
                  to={getCourseSlugForCenter(activeCenter)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F87902] hover:bg-[#e06c00] text-white px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wider shadow-md transition-transform active:scale-95"
                  title="View Course Details"
                >
                  <BookOpen size={16} />
                  <span>Course Detail</span>
                  <ChevronRight size={14} />
                </Link>

                {/* Clickable Google Maps Location Link */}
                <a
                  href={activeCenter.googleLocationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#001C5C] hover:bg-slate-100 px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95"
                >
                  <MapPin size={16} className="text-[#F87902]" />
                  <span>Location</span>
                  <ExternalLink size={13} className="text-slate-400" />
                </a>

                <button
                  type="button"
                  onClick={() => handleOpenEnrollModal(activeCenter)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95 cursor-pointer"
                >
                  <Send size={15} />
                  <span>Enroll at this Center</span>
                </button>
              </div>
            </div>

            {/* Spotlight Details Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Center Info Strip (Timings, Phone, Courses) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 text-[#F87902] flex items-center justify-center shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Timings</span>
                    <span className="font-semibold text-slate-800">{activeCenter.timing || 'Mon - Sat: 9:00 AM - 5:30 PM'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#001C5C] flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Helpline / Inquiry</span>
                    <a
                      href={`tel:${activeCenter.contactPhone || '8595887700'}`}
                      className="font-semibold text-blue-700 hover:underline"
                    >
                      {activeCenter.contactPhone || '8595887700'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Center Status</span>
                    <span className="font-semibold text-emerald-700">Active & Enrolling Students</span>
                  </div>
                </div>
              </div>

              {/* Courses Offered Tags */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <BookOpen size={14} className="text-[#F87902]" />
                  Courses Offered at this Center (Click to view Course Details):
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(activeCenter.courses || [activeCenter.trainingName]).map((course, idx) => (
                    <Link
                      key={idx}
                      to={getCourseSlugForCourseName(course)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-orange-50 border border-blue-200 hover:border-[#F87902] text-[#001C5C] hover:text-[#F87902] font-semibold text-xs rounded-md transition-colors"
                      title={`Click to view ${course} Course Details`}
                    >
                      <BookOpen size={13} className="text-[#F87902]" />
                      <span>{course}</span>
                      <ChevronRight size={12} className="text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* =========================================================================
                  4 CLICKABLE IMAGES OF THIS CENTER
                  "jis cenetr ke image pr click karne par us course ke detail open hona chiye jaise is page m /community-training-programs mein couse detail button pr click karne pr detail show hote h theek waise hi"
                  ========================================================================= */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#001C5C] flex items-center gap-2"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    <span>Center Training Facilities & Workshops</span>
                  </h3>
                  <Link
                    to={getCourseSlugForCenter(activeCenter)}
                    className="text-xs text-[#F87902] hover:text-[#e06c00] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Click any image to view Course Details</span>
                    <ChevronRight size={13} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(activeCenter.images && activeCenter.images.length === 4
                    ? activeCenter.images
                    : [
                        activeCenter.images?.[0] || '/courses/ac-repair-course.jpg',
                        activeCenter.images?.[1] || '/gallery/gallery-1.jpg',
                        activeCenter.images?.[2] || '/gallery/gallery-2.jpg',
                        activeCenter.images?.[3] || '/gallery/gallery-7.jpg',
                      ]
                  ).map((imgUrl, imgIndex) => {
                    const courseSlug = getCourseSlugForCenter(activeCenter);
                    const captions = [
                      'Main Practical Training Lab',
                      'Hands-on Vocational Workshop',
                      'Classroom & Digital Learning Area',
                      'Equipment, Tools & Training Station',
                    ];
                    const caption = captions[imgIndex] || `Facility Image ${imgIndex + 1}`;

                    return (
                      <Link
                        key={imgIndex}
                        to={courseSlug}
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 block"
                        title={`Click to open Course Details (${(activeCenter.courses && activeCenter.courses[0]) || activeCenter.trainingName})`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${activeCenter.centerName} - ${caption}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/courses/cutting-tailoring-course.jpg';
                          }}
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="truncate pr-2">{caption}</span>
                            <span className="shrink-0 px-2 py-0.5 bg-[#F87902] text-white text-[10px] font-bold uppercase rounded shadow-xs flex items-center gap-0.5">
                              <span>Course Detail</span>
                              <ChevronRight size={10} />
                            </span>
                          </div>
                        </div>

                        {/* Badge for Mobile */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold rounded sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          Photo {imgIndex + 1} &bull; Course Detail
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* =========================================================================
                  2 CLICKABLE & PLAYABLE VIDEOS OF THIS CENTER
                  "two videos link, location click able for the selected centre from the drop down"
                  ========================================================================= */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#001C5C] flex items-center gap-2"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    <Video size={22} className="text-[#F87902]" />
                    <span>Center Videos & Practical Demonstrations</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Click to watch training video</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {(activeCenter.videos && activeCenter.videos.length >= 2
                    ? activeCenter.videos.slice(0, 2)
                    : [
                        {
                          title: `${activeCenter.centerName} - Training Center Facilities Tour`,
                          url: 'https://www.youtube.com/watch?v=077D38JpUv4',
                          thumbnail: activeCenter.images?.[1] || '/gallery/gallery-1.jpg',
                        },
                        {
                          title: `${activeCenter.courses?.[0] || 'Skill'} Practical Demonstration Session`,
                          url: 'https://www.youtube.com/watch?v=q6t8rS618fQ',
                          thumbnail: activeCenter.images?.[2] || '/gallery/gallery-8.jpg',
                        },
                      ]
                  ).map((vid, vidIdx) => (
                    <div
                      key={vidIdx}
                      className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden hover:border-[#F87902] transition-all shadow-sm hover:shadow-md flex flex-col"
                    >
                      {/* Video Thumbnail Preview */}
                      <div
                        onClick={() => setActiveVideo(vid)}
                        className="relative aspect-video w-full bg-slate-900 overflow-hidden cursor-pointer flex items-center justify-center"
                      >
                        <img
                          src={vid.thumbnail || activeCenter.images?.[vidIdx] || '/gallery/gallery-1.jpg'}
                          alt={vid.title}
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-300"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-[#F87902] hover:bg-[#e06c00] text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform">
                            <Play size={24} className="fill-current ml-0.5" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold rounded">
                          Video {vidIdx + 1}
                        </div>
                      </div>

                      {/* Video Details & Links */}
                      <div className="p-4 flex items-center justify-between gap-3 bg-white flex-1">
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-800 line-clamp-1 group-hover:text-[#001C5C] transition-colors">
                            {vid.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">Samarth Bharat Skill Development Program</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setActiveVideo(vid)}
                            className="px-3 py-1.5 bg-[#001C5C] text-white text-xs font-semibold rounded hover:bg-[#002b8a] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Play size={12} className="fill-current" />
                            <span>Play</span>
                          </button>
                          <a
                            href={vid.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-[#F87902] transition-colors"
                            title="Open on YouTube"
                          >
                            <ExternalLink size={15} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
            <Building2 size={40} className="text-slate-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-700">No training centers matched your search</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Please try adjusting your city, course, or keyword search criteria.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 bg-[#F87902] text-white text-xs font-bold uppercase rounded hover:bg-[#e06c00] transition-colors"
            >
              Show All Centers
            </button>
          </div>
        )}

        {/* =========================================================================
            CENTER-WISE DIRECTORY (All matching centers)
            "data full center wise hona chahiye. jis center ki image per click karte hai unhi center ki details open honi chahiye."
            ========================================================================= */}
        <section className="space-y-6 pt-4">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-[#001C5C]"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                All Training Centers Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Click any center's image or card to open its full facility view, video tour, and location details.
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-md self-start sm:self-auto">
              {filteredCenters.length} Centers Listed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCenters.map((center, index) => {
              const isSelected = activeCenter && (activeCenter._id === center._id || activeCenter.centerName === center.centerName);
              const imagesList = center.images && center.images.length === 4
                ? center.images
                : [
                    center.images?.[0] || '/courses/ac-repair-course.jpg',
                    center.images?.[1] || '/gallery/gallery-1.jpg',
                    center.images?.[2] || '/gallery/gallery-2.jpg',
                    center.images?.[3] || '/gallery/gallery-7.jpg',
                  ];

              return (
                <div
                  key={center._id || index}
                  className={`bg-white rounded-xl border transition-all overflow-hidden flex flex-col justify-between group ${
                    isSelected
                      ? 'border-[#F87902] ring-2 ring-[#F87902]/30 shadow-lg'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* 4 Image Thumbnails Grid */}
                    {/* "jis cenetr ke image pr click karne par us course ke detail open hona chiye jaise is page m /community-training-programs mein couse detail button pr click karne pr detail show hote h theek waise hi" */}
                    <div className="relative p-2 bg-slate-100">
                      <div className="grid grid-cols-4 gap-1.5 rounded-lg overflow-hidden">
                        {imagesList.map((thumbImg, thumbIdx) => {
                          const courseSlug = getCourseSlugForCenter(center);
                          return (
                            <Link
                              key={thumbIdx}
                              to={courseSlug}
                              className="aspect-square bg-slate-200 overflow-hidden cursor-pointer relative group/thumb block"
                              title={`Click to open Course Details for ${(center.courses && center.courses[0]) || center.trainingName || center.centerName}`}
                            >
                              <img
                                src={thumbImg}
                                alt={`${center.centerName} - Photo ${thumbIdx + 1}`}
                                className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-200"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/courses/cutting-tailoring-course.jpg';
                                }}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/55 transition-colors flex flex-col items-center justify-center text-white">
                                <BookOpen size={13} className="text-[#F87902] opacity-0 group-hover/thumb:opacity-100 transition-opacity drop-shadow" />
                                <span className="text-[8.5px] font-bold uppercase tracking-wider opacity-0 group-hover/thumb:opacity-100 transition-opacity drop-shadow mt-0.5 text-center px-1 leading-tight">
                                  Course Detail
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="absolute top-3.5 left-3.5 px-2 py-0.5 bg-[#001C5C]/85 backdrop-blur-xs text-white text-[10px] font-bold uppercase rounded">
                        {center.city}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 space-y-3">
                      <div>
                        <h3
                          onClick={() => {
                            setActiveCenter(center);
                            setSelectedCenterId(center._id || center.centerName || '');
                            const el = document.getElementById('center-spotlight');
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }}
                          className="font-bold text-base text-[#001C5C] hover:text-[#F87902] transition-colors cursor-pointer line-clamp-1"
                          title="Select Center in Spotlight"
                        >
                          {center.centerName}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-start gap-1 mt-1 line-clamp-2">
                          <MapPin size={13} className="shrink-0 mt-0.5 text-slate-400" />
                          <span>{center.address}</span>
                        </p>
                      </div>

                      {/* Courses */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(center.courses || [center.trainingName]).slice(0, 3).map((crs, cIdx) => (
                          <Link
                            key={cIdx}
                            to={getCourseSlugForCourseName(crs)}
                            className="px-2 py-0.5 bg-slate-100 hover:bg-orange-50 border border-transparent hover:border-[#F87902] text-slate-700 hover:text-[#F87902] text-[10.5px] font-medium rounded transition-colors"
                            title={`View details of ${crs} course`}
                          >
                            {crs}
                          </Link>
                        ))}
                        {(center.courses?.length || 1) > 3 && (
                          <span className="px-1.5 py-0.5 text-[10px] text-slate-400 font-semibold">
                            +{(center.courses?.length || 1) - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                    {/* Clickable Map Link */}
                    <a
                      href={center.googleLocationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <MapPin size={12} className="text-[#F87902]" />
                      <span>Maps</span>
                      <ExternalLink size={10} />
                    </a>

                    {/* Play Video Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCenter(center);
                        if (center.videos && center.videos.length > 0) {
                          setActiveVideo(center.videos[0]);
                        } else {
                          setActiveVideo({
                            title: `${center.centerName} Facility Tour`,
                            url: 'https://www.youtube.com/watch?v=077D38JpUv4',
                          });
                        }
                      }}
                      className="text-slate-600 hover:text-[#001C5C] font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Video size={12} className="text-[#F87902]" />
                      <span>Videos</span>
                    </button>

                    {/* Course Detail Button matching /community-training-programs */}
                    <Link
                      to={getCourseSlugForCenter(center)}
                      className="px-3 py-1.5 bg-[#F87902] hover:bg-[#e06c00] text-white font-['Montserrat',sans-serif] font-bold text-[11px] uppercase tracking-wider rounded transition-colors flex items-center gap-1 shadow-xs"
                      title="View Course Details"
                    >
                      <span>Course Detail</span>
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* =========================================================================
          LIGHTBOX MODAL FOR CLICKED CENTER IMAGES
          ========================================================================= */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-[70] bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs cursor-pointer animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
          >
            <div className="p-3.5 bg-[#001C5C] text-white flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold truncate pr-4">{lightboxImg.title}</span>
              <button
                type="button"
                onClick={() => setLightboxImg(null)}
                className="text-white/80 hover:text-white p-1 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-[16/10] max-h-[75vh] w-full bg-black flex items-center justify-center">
              <img
                src={lightboxImg.url}
                alt={lightboxImg.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIDEO PLAYER MODAL
          ========================================================================= */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs cursor-pointer animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700"
          >
            <div className="p-3.5 bg-[#001C5C] text-white flex items-center justify-between">
              <div className="flex items-center gap-2 truncate pr-4">
                <Video size={16} className="text-[#F87902]" />
                <span className="text-xs sm:text-sm font-bold truncate">{activeVideo.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="text-white/80 hover:text-white p-1 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={getEmbedUrl(activeVideo.url)}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-3 bg-slate-800 text-white/80 text-xs flex items-center justify-between">
              <span>Samarth Bharat Vocational Training Walkthrough</span>
              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F87902] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Watch on YouTube</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          ENROLLMENT MODAL (POPUP 1022)
          ========================================================================= */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <div
            className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl text-white rounded-xl"
            style={{ backgroundColor: '#001C5C' }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setEnrollModalOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-1 transition-colors cursor-pointer z-20"
            >
              <X size={22} />
            </button>

            {/* Header */}
            <div className="p-6 border-b border-white/15 text-center sm:text-left">
              <span className="text-[11px] uppercase tracking-wider text-[#F87902] font-bold block mb-1">
                Admissions Open 2026
              </span>
              <h3
                className="text-xl sm:text-2xl font-bold text-white"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Center Enrollment Application
              </h3>
              <p className="text-xs text-white/80 mt-1">
                Applying for: <strong className="text-white">{enrollForm.center}</strong>
              </p>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {enrollSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/30">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white">Application Submitted!</h4>
                  <p className="text-xs text-white/80 max-w-sm mx-auto">
                    Thank you, <strong className="text-white">{enrollForm.fullName}</strong>. Our center coordinator will contact you on your mobile number to confirm your batch timings.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnrollSubmit} className="space-y-3.5 text-slate-800">
                  {enrollError && (
                    <div className="p-2.5 bg-red-500/20 border border-red-500/40 text-red-200 text-xs rounded">
                      {enrollError}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Candidate Full Name *"
                      value={enrollForm.fullName}
                      onChange={(e) => setEnrollForm((prev) => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-white rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902]"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        required
                        placeholder="Phone (10 Digits) *"
                        value={enrollForm.phone}
                        onChange={handlePhoneChange}
                        className="w-full px-3.5 py-2.5 bg-white rounded text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F87902]"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Email (Optional)"
                        value={enrollForm.email}
                        onChange={(e) => setEnrollForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3.5 py-2.5 bg-white rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902]"
                      />
                    </div>
                  </div>

                  {/* Selected Course */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Course Name"
                      value={enrollForm.course}
                      onChange={(e) => setEnrollForm((prev) => ({ ...prev, course: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-white rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902]"
                    />
                  </div>

                  {/* Qualification */}
                  <div>
                    <input
                      type="text"
                      placeholder="Highest Qualification (e.g. 10th, 12th, Graduate)"
                      value={enrollForm.qualification}
                      onChange={(e) => setEnrollForm((prev) => ({ ...prev, qualification: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-white rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902]"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <input
                      type="text"
                      placeholder="Your Residential Address"
                      value={enrollForm.address}
                      onChange={(e) => setEnrollForm((prev) => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-white rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Any query or preferred batch timing (Optional)"
                      value={enrollForm.message}
                      onChange={(e) => setEnrollForm((prev) => ({ ...prev, message: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-white rounded text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={enrollSubmitting}
                      className="w-full py-3 bg-[#F87902] hover:bg-[#e06c00] text-white text-xs font-bold uppercase tracking-wider rounded transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      {enrollSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Submit Enrollment</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
