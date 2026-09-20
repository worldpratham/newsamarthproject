import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Clock,
  Award,
  Loader2,
  X,
  Sparkles,
  Phone,
  Mail,
  User,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { ctpBanner, ctpIntro } from '@/data/communityTrainingData';
import {
  getCourses,
  getAllCenters,
  CourseApiModel,
  CenterApiModel,
} from '@/services/courseApi';

export interface DisplayCourseItem {
  id: string | number;
  title: string;
  language: string;
  duration: string;
  certification: string;
  image: string;
  slug: string;
}

interface IndexedCenter extends CenterApiModel {
  originalSNo: number;
}

const LOCAL_COURSE_IMAGES: Record<string, string> = {
  'video-editing-course': '/courses/video-editing.jpg',
  'ai-prompt-engineering': '/courses/ai-prompt-engineering.jpg',
  'flutter-app-development': '/courses/flutter-app.jpg',
  'digital-marketing-course': '/courses/digital-marketing.jpg',
  'bakery-course': '/courses/bakery-course.jpg',
  'ac-fridge-repair-course': '/courses/ac-repair-course.jpg',
  'beautician-course': '/courses/beautician-training-course.jpg',
  'nail-art-course': '/courses/nail-art.jpg',
  'ro-repairing-course': '/courses/ro-repairing.jpg',
  'carpenter-training': '/courses/carpenter-training.jpg',
  'cutting-tailoring': '/courses/cutting-tailoring-course.jpg',
  'truck-repairing-course': '/courses/truck-repairing-course.jpg',
  'general-duty-assistant': '/courses/gda-course.jpg',
};

const COMMUNITY_COURSE_SLUGS = [
  'ac-fridge-repair-course',
  'bakery-course',
  'beautician-course',
  'digital-marketing-course',
  'nail-art-course',
  'ro-repairing-course',
  'truck-repairing-course',
  'carpenter-training',
  'general-duty-assistant',
  'cutting-tailoring',
];

export default function CommunityTrainingPrograms() {
  const [courses, setCourses] = useState<DisplayCourseItem[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [isLiveCourses, setIsLiveCourses] = useState(false);

  const [centers, setCenters] = useState<CenterApiModel[]>([]);
  const [loadingCenters, setLoadingCenters] = useState(true);
  const [isLiveCenters, setIsLiveCenters] = useState(false);

  // TablePress DataTables controls state
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<
    'sNo' | 'state' | 'trainingName' | 'address' | 'googleLocationUrl'
  >('sNo');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Enroll modal
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
    document.title = 'Community Training Programs - Samarth Bharat';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let isMounted = true;

    // 1. Fetch Courses via API
    async function fetchCoursesData() {
      try {
        setLoadingCourses(true);
        console.log('[CommunityTraining] Fetching courses from API: /api/courses');
        const apiCourses = await getCourses();
        console.log('[CommunityTraining] Received courses count from API:', apiCourses?.length);

        if (isMounted && apiCourses && apiCourses.length > 0) {
          // Filter for community training courses (or non-CDC courses)
          const filtered = apiCourses.filter((c) => {
            const cleanSlug = (c.slug || '').replace(/^\/+|\/+$/g, '');
            return (
              COMMUNITY_COURSE_SLUGS.includes(cleanSlug) ||
              (!c.isCDC && c.category !== 'Career Development Centre (CDC)')
            );
          });

          // Sort in standard order
          const sorted = [...filtered].sort((a, b) => {
            const cleanA = (a.slug || '').replace(/^\/+|\/+$/g, '');
            const cleanB = (b.slug || '').replace(/^\/+|\/+$/g, '');
            const idxA = COMMUNITY_COURSE_SLUGS.indexOf(cleanA);
            const idxB = COMMUNITY_COURSE_SLUGS.indexOf(cleanB);
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            return (a.order || 99) - (b.order || 99);
          });

          const mapped: DisplayCourseItem[] = sorted.map((c, idx) => {
            const cleanSlug = (c.slug || '').replace(/^\/+|\/+$/g, '');
            const fallbackLocal = LOCAL_COURSE_IMAGES[cleanSlug] || '/courses/ac-repair-course.jpg';
            return {
              id: c._id || c.id || idx + 1,
              title: c.title,
              language: c.language || 'Hindi',
              duration: c.duration || '2 Month',
              certification: c.certification || 'Yes',
              image: LOCAL_COURSE_IMAGES[cleanSlug] || c.imageUrl || fallbackLocal,
              slug: `/courses/${cleanSlug}`,
            };
          });

          setCourses(mapped);
          setIsLiveCourses(true);
        }
      } catch (err) {
        console.error('[CommunityTraining] Failed to fetch courses from API:', err);
      } finally {
        if (isMounted) setLoadingCourses(false);
      }
    }

    // 2. Fetch Centers via API
    async function fetchCentersData() {
      try {
        setLoadingCenters(true);
        console.log('[CommunityTraining] Fetching centers from API: /api/centers');
        const res = await getAllCenters();
        console.log('[CommunityTraining] Received centers count from API:', res?.centers?.length);

        if (isMounted && res && res.centers && res.centers.length > 0) {
          setCenters(res.centers);
          setIsLiveCenters(true);
        }
      } catch (err) {
        console.error('[CommunityTraining] Failed to fetch centers from API:', err);
      } finally {
        if (isMounted) setLoadingCenters(false);
      }
    }

    fetchCoursesData();
    fetchCentersData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Prepare centers with 1-based original index
  const centersWithIndex = useMemo<IndexedCenter[]>(() => {
    return centers.map((c, i) => ({
      ...c,
      originalSNo: i + 1,
    }));
  }, [centers]);

  // Handle column sort
  const handleSort = (
    column: 'sNo' | 'state' | 'trainingName' | 'address' | 'googleLocationUrl'
  ) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filtered and Sorted centers
  const filteredAndSortedCenters = useMemo(() => {
    let result = [...centersWithIndex];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((c) => {
        const stateStr = (c.state || '').toLowerCase();
        const trainingStr = (c.trainingName || '').toLowerCase();
        const addressStr = (c.address || '').toLowerCase();
        const sNoStr = String(c.originalSNo);

        return (
          sNoStr.includes(q) ||
          stateStr.includes(q) ||
          trainingStr.includes(q) ||
          addressStr.includes(q)
        );
      });
    }

    // Sort by column
    result.sort((a, b) => {
      let valA: string | number = '';
      let valB: string | number = '';

      if (sortColumn === 'sNo') {
        valA = a.originalSNo;
        valB = b.originalSNo;
      } else if (sortColumn === 'state') {
        valA = (a.state || '').toLowerCase();
        valB = (b.state || '').toLowerCase();
      } else if (sortColumn === 'trainingName') {
        valA = (a.trainingName || '').toLowerCase();
        valB = (b.trainingName || '').toLowerCase();
      } else if (sortColumn === 'address') {
        valA = (a.address || '').toLowerCase();
        valB = (b.address || '').toLowerCase();
      } else if (sortColumn === 'googleLocationUrl') {
        valA = (a.googleLocationUrl || '').toLowerCase();
        valB = (b.googleLocationUrl || '').toLowerCase();
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      const strA = String(valA);
      const strB = String(valB);
      if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
      if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [centersWithIndex, searchQuery, sortColumn, sortDirection]);

  // Pagination calculation
  const totalEntries = filteredAndSortedCenters.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalEntries);
  const currentEntries = filteredAndSortedCenters.slice(startIndex, endIndex);

  // Pagination page numbers generator
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  // Sort indicator helper
  const renderSortIndicator = (
    col: 'sNo' | 'state' | 'trainingName' | 'address' | 'googleLocationUrl'
  ) => {
    const isActive = sortColumn === col;
    return (
      <span className="inline-block ml-1 text-[10px] text-white/70">
        {isActive ? (sortDirection === 'asc' ? '▲' : '▼') : '↕'}
      </span>
    );
  };

  // State list for enrollment modal
  const uniqueStates = useMemo(() => {
    const set = new Set(centers.map((c) => c.state).filter(Boolean));
    return Array.from(set).sort();
  }, [centers]);

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
    }, 2500);
  };

  return (
    <div className="bg-white w-full overflow-x-hidden">
      {/* 1. Hero Banner with Exact Gradient matching WordPress */}
      <section
        className="w-full py-16 sm:py-20 md:py-24 text-center text-white overflow-hidden relative"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-['Times_New_Roman',serif] text-white text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold leading-tight tracking-tight mb-4">
            Community Training Programs
          </h1>
          <p className="font-['Montserrat',sans-serif] text-white/95 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
            {ctpBanner.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Banner Collage Image matching WordPress elementor-widget-image */}
      <section className="w-full bg-white pt-8 pb-4">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <img
              src={ctpBanner.bannerImage}
              alt="Community Training Programs - Samarth Bharat"
              className="w-full h-auto object-cover max-h-[500px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = ctpBanner.wpBannerImage;
              }}
            />
          </div>
        </div>
      </section>

      {/* 3. Deep Navy Info Box with White Text matching WordPress elementor-element-2101e4a */}
      <section className="w-full py-8 md:py-12 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#001C5C] text-white p-6 sm:p-10 md:p-14 rounded-2xl shadow-md">
            <h2 className="font-['Times_New_Roman',serif] text-white text-2xl sm:text-3xl md:text-[38px] font-semibold mb-6 sm:mb-8 leading-tight">
              Community Training Programs
            </h2>
            <div className="space-y-4 font-['Montserrat',sans-serif] text-white text-[15px] leading-[1.8] text-justify font-normal">
              {ctpIntro.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Community Training Courses Grid with Purple-Blue Gradient matching WordPress elementor-element-9a13a3f */}
      <section
        id="courses"
        className="w-full py-12 sm:py-16 md:py-20 text-white overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-['Times_New_Roman',serif] text-white text-3xl sm:text-4xl md:text-[42px] font-semibold leading-tight">
              Community Training Courses
            </h2>
            <p className="font-['Montserrat',sans-serif] text-white/95 text-base sm:text-lg font-normal mt-2">
              Practical Training for Real-World Careers.
            </p>
            {isLiveCourses && (
              <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                <Sparkles size={13} className="text-yellow-300" />
                Live Database Synchronized ({courses.length} Courses)
              </span>
            )}
          </div>

          {loadingCourses ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 size={36} className="animate-spin text-white" />
              <p className="font-['Montserrat',sans-serif] text-sm text-white/80">
                Loading community courses from API...
              </p>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 text-white/80 bg-white/10 rounded-xl max-w-md mx-auto">
              <p>No community courses found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl overflow-hidden border border-[#001C5C] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Image with 12px border radius matching WordPress */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden p-2">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const cleanSlug = course.slug.replace(/^\/+|\/+$/g, '').replace(/^courses\//, '');
                        const fallback = LOCAL_COURSE_IMAGES[cleanSlug] || '/courses/ac-repair-course.jpg';
                        if (target.src !== fallback) {
                          target.src = fallback;
                        }
                      }}
                    />
                  </div>

                  {/* Course Title */}
                  <div className="px-4 pt-1 pb-2">
                    <h3 className="font-['Times_New_Roman',serif] text-[#001C5C] text-lg sm:text-[19px] font-semibold leading-snug line-clamp-2 min-h-[50px]">
                      {course.title}
                    </h3>
                  </div>

                  {/* Details & Action Button (60% / 40% split matching WordPress) */}
                  <div className="flex items-end justify-between p-4 pt-1 gap-2 mt-auto">
                    {/* Left 60%: Icon List */}
                    <ul className="w-[62%] space-y-1 text-xs font-['Montserrat',sans-serif] text-gray-800">
                      <li className="flex items-center gap-1.5">
                        <Globe size={13} className="text-[#F87902] shrink-0" />
                        <span className="truncate">{course.language}</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Clock size={13} className="text-[#F87902] shrink-0" />
                        <span className="truncate">Duration: {course.duration}</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <Award size={13} className="text-[#F87902] shrink-0" />
                        <span className="truncate">Certification: {course.certification}</span>
                      </li>
                    </ul>

                    {/* Right 40%: Course Detail Button */}
                    <div className="w-[38%] text-right">
                      <Link
                        to={course.slug}
                        className="inline-block w-full bg-[#F87902] hover:bg-[#e06c00] text-white font-['Montserrat',sans-serif] text-[11px] font-medium uppercase tracking-wider py-2 px-1 rounded text-center transition-colors shadow-xs"
                      >
                        Course Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Community Training Centers Table matching WordPress TablePress elementor-element-25ac7c3 */}
      <section id="centers" className="w-full py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Heading without underline, exactly like WordPress */}
          <div className="text-center mb-6">
            <h2 className="font-['Times_New_Roman',serif] text-[#001C5C] text-3xl sm:text-4xl md:text-[40px] font-semibold leading-tight">
              Community Training Centers
            </h2>
            {isLiveCenters && (
              <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                <Sparkles size={12} className="text-green-600" />
                Data fetched via API ({centers.length} Centers)
              </span>
            )}
          </div>

          {/* Top ENROLL NOW Button on Left matching WordPress */}
          <div className="mb-4">
            <button
              onClick={() => setEnrollModalOpen(true)}
              className="bg-[#F87902] hover:bg-[#e06c00] text-white font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded shadow-xs transition-colors cursor-pointer"
            >
              ENROLL NOW
            </button>
          </div>

          {/* DataTables Header Toolbar: entries per page & Search input */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 text-xs sm:text-[13px] text-[#333] font-['Montserrat',sans-serif]">
            {/* Entries per page dropdown */}
            <div className="flex items-center gap-1.5">
              <select
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded px-2.5 py-1 text-xs sm:text-[13px] bg-white focus:outline-none focus:border-gray-500 cursor-pointer shadow-2xs"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>entries per page</span>
            </div>

            {/* Search Input Box */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="dt-search" className="text-gray-700">
                Search:
              </label>
              <input
                id="dt-search"
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder=""
                className="border border-gray-300 rounded px-2.5 py-1 text-xs sm:text-[13px] bg-white focus:outline-none focus:border-gray-500 w-44 sm:w-56"
              />
            </div>
          </div>

          {/* TablePress Table matching WordPress Design */}
          <div className="overflow-x-auto border border-[#ddd] shadow-2xs mb-3 bg-white">
            <table
              id="tablepress-15"
              className="w-full border-collapse text-left font-['Montserrat',sans-serif] text-xs sm:text-[13px]"
            >
              <thead>
                <tr className="bg-[#001C5C] text-white select-none">
                  <th
                    onClick={() => handleSort('sNo')}
                    className="py-3 px-3.5 font-bold text-left w-16 cursor-pointer hover:bg-[#001547] transition-colors"
                  >
                    <span>S.NO.</span>
                    {renderSortIndicator('sNo')}
                  </th>
                  <th
                    onClick={() => handleSort('state')}
                    className="py-3 px-4 font-bold w-28 sm:w-32 cursor-pointer hover:bg-[#001547] transition-colors"
                  >
                    <span>State</span>
                    {renderSortIndicator('state')}
                  </th>
                  <th
                    onClick={() => handleSort('trainingName')}
                    className="py-3 px-4 font-bold w-48 sm:w-56 cursor-pointer hover:bg-[#001547] transition-colors"
                  >
                    <span>Training Name</span>
                    {renderSortIndicator('trainingName')}
                  </th>
                  <th
                    onClick={() => handleSort('address')}
                    className="py-3 px-4 font-bold min-w-[280px] cursor-pointer hover:bg-[#001547] transition-colors"
                  >
                    <span>Address</span>
                    {renderSortIndicator('address')}
                  </th>
                  <th
                    onClick={() => handleSort('googleLocationUrl')}
                    className="py-3 px-4 font-bold min-w-[260px] cursor-pointer hover:bg-[#001547] transition-colors"
                  >
                    <span>Google Location</span>
                    {renderSortIndicator('googleLocationUrl')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loadingCenters ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500 bg-white">
                      <Loader2 size={24} className="animate-spin text-[#001C5C] mx-auto mb-2" />
                      Loading centers from database...
                    </td>
                  </tr>
                ) : currentEntries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500 bg-white">
                      No matching records found
                    </td>
                  </tr>
                ) : (
                  currentEntries.map((center, idx) => {
                    const cleanUrl = (center.googleLocationUrl || '').replace(/&amp;/g, '&');
                    const addressParts = (center.address || '')
                      .split(/<br\s*\/?>|\n|(?=\s*(?:Land\s*mark|Landmark)\b)/i)
                      .map((p) => p.trim())
                      .filter(Boolean);

                    return (
                      <tr
                        key={center._id || idx}
                        className={`transition-colors ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'
                        } hover:bg-[#f3f3f3]`}
                      >
                        <td className="py-2.5 px-3.5 text-gray-800 align-top">
                          {center.originalSNo}
                        </td>
                        <td className="py-2.5 px-4 text-gray-800 align-top">
                          {center.state}
                        </td>
                        <td className="py-2.5 px-4 text-gray-800 align-top">
                          {center.trainingName}
                        </td>
                        <td className="py-2.5 px-4 text-gray-800 align-top leading-relaxed">
                          {addressParts.map((part, pIdx) => (
                            <span key={pIdx} className="block">
                              {part}
                            </span>
                          ))}
                        </td>
                        <td className="py-2.5 px-4 align-top">
                          {cleanUrl ? (
                            <a
                              href={cleanUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0563C1] underline hover:text-[#004aad] break-all text-xs sm:text-[12.5px] leading-normal"
                            >
                              {cleanUrl}
                            </a>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* DataTables Bottom Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-[13px] text-[#333] font-['Montserrat',sans-serif] mb-6">
            <div>
              Showing {totalEntries === 0 ? 0 : startIndex + 1} to {endIndex} of {totalEntries} entries
              {searchQuery && (
                <span className="text-gray-500"> (filtered from {centers.length} total entries)</span>
              )}
            </div>

            {/* Pagination Controls matching TablePress DataTables */}
            <div className="flex items-center gap-1 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1 rounded text-xs border border-transparent hover:border-gray-300 disabled:opacity-40 disabled:hover:border-transparent disabled:cursor-not-allowed transition-all cursor-pointer text-gray-700"
              >
                Previous
              </button>
              {getPageNumbers().map((p, pIdx) =>
                typeof p === 'number' ? (
                  <button
                    key={pIdx}
                    onClick={() => setCurrentPage(p)}
                    className={`px-2.5 py-1 rounded text-xs min-w-[28px] text-center transition-all cursor-pointer ${
                      currentPage === p
                        ? 'border border-[#111] bg-white font-semibold text-black shadow-2xs'
                        : 'border border-transparent hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {p}
                  </button>
                ) : (
                  <span key={pIdx} className="px-1 text-gray-400">
                    {p}
                  </span>
                )
              )}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || totalEntries === 0}
                className="px-2.5 py-1 rounded text-xs border border-transparent hover:border-gray-300 disabled:opacity-40 disabled:hover:border-transparent disabled:cursor-not-allowed transition-all cursor-pointer text-gray-700"
              >
                Next
              </button>
            </div>
          </div>

          {/* Bottom ENROLL NOW Button on Left matching WordPress */}
          <div className="mt-2">
            <button
              onClick={() => setEnrollModalOpen(true)}
              className="bg-[#F87902] hover:bg-[#e06c00] text-white font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded shadow-xs transition-colors cursor-pointer"
            >
              ENROLL NOW
            </button>
          </div>
        </div>
      </section>

      {/* Enroll Now Modal */}
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
                  Thank you! Our community coordinator will contact you shortly with center details and admission schedule.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-['Times_New_Roman',serif] text-[#001C5C] text-2xl font-bold mb-1">
                  Enroll in Community Training
                </h3>
                <p className="font-['Montserrat',sans-serif] text-xs text-gray-500 mb-6">
                  Join our skill courses across 53+ centers to unlock free certification and livelihood opportunities.
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
                        Select State *
                      </label>
                      <select
                        required
                        value={enrollForm.state}
                        onChange={(e) => setEnrollForm({ ...enrollForm, state: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001C5C]/20 focus:border-[#001C5C]"
                      >
                        <option value="">Choose State</option>
                        {uniqueStates.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Select Course *
                      </label>
                      <select
                        required
                        value={enrollForm.trainingName}
                        onChange={(e) => setEnrollForm({ ...enrollForm, trainingName: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001C5C]/20 focus:border-[#001C5C]"
                      >
                        <option value="">Choose Course</option>
                        {courses.map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title}
                          </option>
                        ))}
                      </select>
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
