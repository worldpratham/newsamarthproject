import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  Globe,
  Clock,
  Award,
  CheckCircle2,
  MapPin,
  ExternalLink,
  ChevronRight,
  Send,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { detailedCourses, DetailedCourse, CourseModuleItem, CourseCenterItem } from '@/data/coursesDetailData';
import { getCourseBySlug, getCentersForTraining, CourseApiModel, CenterApiModel } from '@/services/courseApi';

const ALL_COURSES_OPTIONS = [
  'AC/Refrigerator Repairing',
  'Beautician',
  'Cutting & Tailoring',
  'Digital Marketing',
  'Bakery',
  'Truck Repairing',
  'GDA (General Duty Assistant)',
  'Carpenter',
  'Nail Art',
  'RO Repairing',
  'Flutter App Development',
  'AI Prompt Engineering',
  'Video Editing',
];

const COURSE_SLUG_TO_ENUM: Record<string, string> = {
  'ac-fridge-repair-course': 'AC/Refrigerator Repairing',
  'beautician-course': 'Beautician',
  'cutting-tailoring': 'Cutting & Tailoring',
  'digital-marketing-course': 'Digital Marketing',
  'bakery-course': 'Bakery',
  'truck-repairing-course': 'Truck Repairing',
  'general-duty-assistant': 'GDA (General Duty Assistant)',
  'video-editing-course': 'Video Editing',
  'ai-prompt-engineering': 'AI Prompt Engineering',
  'flutter-app-development': 'Flutter App Development',
  'nail-art-course': 'Nail Art',
  'ro-repairing-course': 'RO Repairing',
  'carpenter-training': 'Carpenter',
};

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  // Resolve course by exact slug or path segment
  const pathSegment = location.pathname.replace(/^\/+|\/+$/g, '').replace(/^courses\//, '');
  const activeSlug = slug || pathSegment;
  const normalizedSlug = (activeSlug || '').toLowerCase().replace(/\/+$/, '');

  const fallbackCourse: DetailedCourse =
    detailedCourses[normalizedSlug] ||
    Object.values(detailedCourses).find(
      (c) => c.slug.includes(normalizedSlug) || normalizedSlug.includes(c.slug)
    ) ||
    detailedCourses['ac-fridge-repair-course'];

  const [apiCourse, setApiCourse] = useState<CourseApiModel | null>(null);
  const [apiCenters, setApiCenters] = useState<CenterApiModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiveFromApi, setIsLiveFromApi] = useState<boolean>(false);

  // Fetch course details and centers from API
  useEffect(() => {
    let isMounted = true;

    async function fetchCourseData() {
      try {
        setLoading(true);
        const apiData = await getCourseBySlug(normalizedSlug);
        if (isMounted && apiData) {
          setApiCourse(apiData);
          setIsLiveFromApi(true);

          // Find centers based on title or category
          const title = apiData.title.toLowerCase();
          let trainingQuery = '';
          if (title.includes('ac') || title.includes('refrigerat') || title.includes('fridge')) {
            trainingQuery = 'AC';
          } else if (title.includes('beautician') || title.includes('beauty')) {
            trainingQuery = 'Beautician';
          } else if (title.includes('bakery')) {
            trainingQuery = 'Bakery';
          } else if (title.includes('tailor') || title.includes('cutting')) {
            trainingQuery = 'Tailoring';
          } else if (title.includes('nail')) {
            trainingQuery = 'Nail';
          } else if (title.includes('ro') || title.includes('water')) {
            trainingQuery = 'RO';
          } else if (title.includes('truck')) {
            trainingQuery = 'Truck';
          } else if (title.includes('gda') || title.includes('assistant')) {
            trainingQuery = 'GDA';
          } else if (title.includes('carpenter') || title.includes('wood')) {
            trainingQuery = 'Carpenter';
          }

          if (trainingQuery) {
            const centers = await getCentersForTraining(trainingQuery);
            if (isMounted && centers && centers.length > 0) {
              setApiCenters(centers);
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch course from API, falling back to local dataset:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCourseData();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
    };
  }, [normalizedSlug]);

  // Assemble consolidated courseData
  const title = apiCourse?.title || fallbackCourse.title;
  const duration = apiCourse?.duration || fallbackCourse.duration;
  const language = apiCourse?.language || fallbackCourse.language;
  const certification = apiCourse?.certification || fallbackCourse.certification;
  const description = apiCourse?.overview || fallbackCourse.description;
  const eligibility = apiCourse?.eligibility || fallbackCourse.eligibility;
  const image = apiCourse?.imageUrl || fallbackCourse.image || '/courses/ac-repair-course.jpg';
  const wpImageFallback = fallbackCourse.wpImageFallback || apiCourse?.imageUrl || '/courses/ac-repair-course.jpg';

  // Build module sections from API modules or fallback modules
  const moduleSections: CourseModuleItem[] =
    apiCourse?.modules && apiCourse.modules.length > 0
      ? apiCourse.modules.map((m) => ({
          title: m.title.includes('–') || m.title.toLowerCase().startsWith('module')
            ? m.title
            : `Module ${m.moduleNumber || ''}: ${m.title}`.trim(),
          items: m.description
            ? m.description.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean)
            : [],
        }))
      : fallbackCourse.moduleSections;

  // Build centers strictly from API
  const centers: CourseCenterItem[] = apiCenters.map((c) => ({
    state: c.state,
    trainingName: c.trainingName,
    address: c.address,
    googleLocationUrl: c.googleLocationUrl,
  }));

  const courseData = {
    title,
    slug: apiCourse?.slug || fallbackCourse.slug,
    duration,
    language,
    certification,
    description,
    eligibility,
    image,
    wpImageFallback,
    moduleSections,
    centers,
  };

  const defaultCourseEnum = COURSE_SLUG_TO_ENUM[normalizedSlug] || 'AC/Refrigerator Repairing';

  const [activeTab, setActiveTab] = useState<'details' | 'eligibility' | 'centers'>('details');

  // Enrollment Form State
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    fatherName: '',
    motherName: '',
    phone: '',
    email: '',
    qualification: '10th Pass',
    course: defaultCourseEnum,
    address: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Update selected course in form when page changes
  useEffect(() => {
    if (courseData) {
      document.title = `${courseData.title} - Samarth Bharat`;
      const mapped = COURSE_SLUG_TO_ENUM[courseData.slug] || courseData.title || 'AC/Refrigerator Repairing';
      setFormData((prev) => ({
        ...prev,
        course: mapped,
      }));
    }
  }, [courseData.title, courseData.slug]);

  const scrollToEnrollForm = () => {
    const el = document.getElementById('enrollment-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setSubmitError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          dateOfBirth: '',
          fatherName: '',
          motherName: '',
          phone: '',
          email: '',
          qualification: '10th Pass',
          course: courseData.title,
          address: '',
          message: '',
        });
      } else {
        setSubmitError(data.message || 'Failed to submit registration. Please try again.');
      }
    } catch (err: any) {
      console.error('Enrollment submission error:', err);
      // Fallback direct call if proxy fails
      try {
        const directRes = await fetch('http://localhost:5000/api/enrollments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const directData = await directRes.json();
        if (directRes.ok && directData.success) {
          setSubmitSuccess(true);
          return;
        }
      } catch (fallbackErr) {
        console.error('Direct fallback failed:', fallbackErr);
      }
      setSubmitError('Failed to connect to server. Please try again or call 8595887700.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!courseData) {
    return (
      <div className="py-24 text-center bg-white min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#001C5C] mb-4">
          Course Not Found
        </h2>
        <p className="text-gray-600 mb-6 font-['Montserrat',sans-serif]">
          The training program you are looking for is currently being updated.
        </p>
        <Link
          to="/#training-programs"
          className="bg-[#F87902] text-white px-6 py-2.5 font-semibold text-sm rounded-none hover:bg-[#e06c00] transition-colors"
        >
          View All Training Programs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white w-full overflow-x-hidden">
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 py-3">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs sm:text-[13px] font-['Montserrat',sans-serif] text-gray-500">
            <Link to="/" className="hover:text-[#F87902] transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link to="/#training-programs" className="hover:text-[#F87902] transition-colors">
              Training Programs
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#001C5C] font-semibold">{courseData.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Course Content Container */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Top Section: Course Photo on Left, Info on Right */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12 sm:mb-16">
          {/* Left Column (5 cols): Course Image */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-[10px] overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
              <img
                src={courseData.image}
                alt={courseData.title}
                className="w-full aspect-[4/3] object-cover hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (courseData.wpImageFallback && target.src !== courseData.wpImageFallback) {
                    target.src = courseData.wpImageFallback;
                  }
                }}
              />
            </div>
          </div>

          {/* Right Column (7 cols): Title, Meta, Description & CTA */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h1 className="font-serif text-[#001C5C] text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight">
                {courseData.title}
              </h1>
             
            </div>

            {/* Meta Row with Language, Duration, Certification */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 py-3 border-y border-gray-200/80 mb-5 font-['Montserrat',sans-serif] text-[13.5px] text-gray-700">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-[#F87902]" />
                <span className="font-medium">{courseData.language}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-[#F87902]" />
                <span className="font-medium">Duration: {courseData.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} className="text-[#F87902]" />
                <span className="font-medium">Certification: {courseData.certification}</span>
              </div>
            </div>

            {/* Course Description */}
            <p className="font-['Montserrat',sans-serif] text-[#333333] text-[14.5px] leading-[1.8] text-justify mb-7">
              {courseData.description}
            </p>

            {/* Enroll Now Button */}
            <div>
              <button
                type="button"
                onClick={scrollToEnrollForm}
                className="inline-block bg-[#F87902] hover:bg-[#e06c00] text-white text-xs sm:text-[13px] font-semibold uppercase tracking-wider px-8 py-3.5 transition-colors shadow-sm rounded-none cursor-pointer"
              >
                ENROLL NOW
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Tabs Section */}
        <section className="mb-14 sm:mb-16">
          {/* Tabs Navigation Bar */}
          <div className="flex items-center border-b border-gray-300 gap-1.5 sm:gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`py-3.5 px-4 sm:px-6 font-['Montserrat',sans-serif] text-sm sm:text-[15px] font-bold tracking-wide transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'details'
                  ? 'border-[#001C5C] text-[#001C5C] bg-gray-50/70'
                  : 'border-transparent text-gray-500 hover:text-[#001C5C] hover:border-gray-300'
              }`}
            >
              Course Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('eligibility')}
              className={`py-3.5 px-4 sm:px-6 font-['Montserrat',sans-serif] text-sm sm:text-[15px] font-bold tracking-wide transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'eligibility'
                  ? 'border-[#001C5C] text-[#001C5C] bg-gray-50/70'
                  : 'border-transparent text-gray-500 hover:text-[#001C5C] hover:border-gray-300'
              }`}
            >
              Eligibility Criteria
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('centers')}
              className={`py-3.5 px-4 sm:px-6 font-['Montserrat',sans-serif] text-sm sm:text-[15px] font-bold tracking-wide transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'centers'
                  ? 'border-[#001C5C] text-[#001C5C] bg-gray-50/70'
                  : 'border-transparent text-gray-500 hover:text-[#001C5C] hover:border-gray-300'
              }`}
            >
              Centers Available ({courseData.centers.length})
            </button>
          </div>

          {/* Tab 1: Course Details */}
          {activeTab === 'details' && (
            <div className="py-8 bg-white">
              <div className="space-y-8">
                {courseData.moduleSections.map((sec, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <h3 className="font-serif text-[#001C5C] text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F87902]" />
                      {sec.title}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 pl-4 sm:pl-5">
                      {sec.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="font-['Montserrat',sans-serif] text-[#333333] text-[13.5px] leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={scrollToEnrollForm}
                  className="inline-block bg-[#F87902] hover:bg-[#e06c00] text-white text-xs sm:text-[13px] font-semibold uppercase tracking-wider px-7 py-3 transition-colors shadow-sm rounded-none cursor-pointer"
                >
                  ENROLL NOW
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Eligibility Criteria */}
          {activeTab === 'eligibility' && (
            <div className="py-8 bg-white">
              <div className="max-w-3xl p-6 rounded-[10px] border border-orange-200 bg-orange-50/40">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F87902]/10 text-[#F87902] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <h4 className="font-serif text-[#001C5C] text-lg font-bold mb-2">
                      Eligibility Requirements
                    </h4>
                    <p className="font-['Montserrat',sans-serif] text-[#333333] text-[14.5px] leading-relaxed">
                      {courseData.eligibility}
                    </p>
                    <p className="font-['Montserrat',sans-serif] text-gray-500 text-xs mt-3">
                      * Trainees will receive hands-on practical training, toolkits, and government-recognized certification upon course completion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={scrollToEnrollForm}
                  className="inline-block bg-[#F87902] hover:bg-[#e06c00] text-white text-xs sm:text-[13px] font-semibold uppercase tracking-wider px-7 py-3 transition-colors shadow-sm rounded-none cursor-pointer"
                >
                  ENROLL NOW
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Centers Available Table */}
          {activeTab === 'centers' && (
            <div className="py-8 bg-white">
              {courseData.centers.length === 0 ? (
                <div className="py-12 px-4 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
                  <MapPin size={32} className="mx-auto mb-2 text-[#001C5C]/50" />
                  <p className="font-semibold text-base text-[#001C5C]">
                    No Centers Currently Listed
                  </p>
                  <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                    Training centers for this course will be announced soon or are operated in collaboration with partner institutions.
                  </p>
                </div>
              ) : (
                <>
                  {/* Mobile scroll hint */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2 sm:hidden px-1">
                    <span className="flex items-center gap-1 font-medium text-[#001C5C]">
                      👉 Swipe horizontally to view all center columns
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-[8px] border border-gray-200 shadow-xs -mx-4 sm:mx-0">
                    <table className="w-full min-w-[620px] text-left border-collapse font-['Montserrat',sans-serif]">
                      <thead>
                        <tr className="bg-[#001C5C] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
                          <th className="py-3.5 px-4 w-16 text-center">S. NO.</th>
                          <th className="py-3.5 px-4 w-32">State</th>
                          <th className="py-3.5 px-4 w-44">Training Name</th>
                          <th className="py-3.5 px-4">Address</th>
                          <th className="py-3.5 px-4 w-40 text-center">Google Location</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-[13px] sm:text-[13.5px] text-gray-800">
                        {courseData.centers.map((center, idx) => (
                          <tr
                            key={idx}
                            className={idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50/50 hover:bg-gray-100/70'}
                          >
                            <td className="py-3.5 px-4 text-center font-medium text-gray-500">
                              {idx + 1}
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-[#001C5C]">
                              {center.state}
                            </td>
                            <td className="py-3.5 px-4 font-medium text-[#F87902]">
                              {center.trainingName}
                            </td>
                            <td className="py-3.5 px-4 leading-relaxed text-gray-700">
                              {center.address}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              {center.googleLocationUrl ? (
                                <a
                                  href={center.googleLocationUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#001C5C] hover:text-[#F87902] transition-colors py-1 px-2.5 rounded bg-blue-50/80 hover:bg-orange-50 border border-blue-100 hover:border-orange-200"
                                >
                                  <MapPin size={13} className="text-[#F87902]" />
                                  <span>View on Map</span>
                                  <ExternalLink size={11} className="text-gray-400" />
                                </a>
                              ) : (
                                <span className="text-gray-400 text-xs">N/A</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              <div className="mt-8">
                <button
                  type="button"
                  onClick={scrollToEnrollForm}
                  className="inline-block bg-[#F87902] hover:bg-[#e06c00] text-white text-xs sm:text-[13px] font-semibold uppercase tracking-wider px-7 py-3 transition-colors shadow-sm rounded-none cursor-pointer"
                >
                  ENROLL NOW
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Enrollment Registration Form Section */}
        <section
          id="enrollment-form"
          className="scroll-mt-20 pt-10 pb-6 border-t-2 border-gray-100"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 text-[#F87902] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles size={14} />
                <span>Admissions Open</span>
              </div>
              <h2 className="font-serif text-[#001C5C] text-2xl sm:text-3xl md:text-[34px] font-bold leading-tight mb-3">
                Enroll Now – Begin Your Skill Journey Today!
              </h2>
              <p className="font-['Montserrat',sans-serif] text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                Fill out the application form below to book your seat in our next batch. Our academic counselor will call you within 24 hours.
              </p>
            </div>

            {/* Submission Success Alert */}
            {submitSuccess && (
              <div className="mb-8 p-6 rounded-[10px] bg-emerald-50 border border-emerald-300 text-center animate-fade-in">
                <CheckCircle2 size={40} className="text-emerald-600 mx-auto mb-3" />
                <h3 className="font-serif text-emerald-900 text-xl font-bold mb-1">
                  Registration Submitted Successfully!
                </h3>
                <p className="text-emerald-800 text-sm font-['Montserrat',sans-serif] max-w-md mx-auto">
                  Thank you for enrolling in <strong>{courseData.title}</strong>. Our training coordinator will contact you shortly on your provided phone number.
                </p>
              </div>
            )}

            {/* Submission Error Alert */}
            {submitError && (
              <div className="mb-8 p-4 rounded-[8px] bg-red-50 border border-red-200 text-red-700 text-sm font-['Montserrat',sans-serif] text-center">
                {submitError}
              </div>
            )}

            {/* Registration Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-gray-200 rounded-[12px] p-5 sm:p-8 md:p-10 shadow-xs space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block font-['Montserrat',sans-serif] text-xs font-bold text-[#001C5C] uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-[6px] focus:outline-none focus:border-[#001C5C] focus:ring-1 focus:ring-[#001C5C] font-['Montserrat',sans-serif]"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block font-['Montserrat',sans-serif] text-xs font-bold text-[#001C5C] uppercase tracking-wider mb-1.5">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-[6px] focus:outline-none focus:border-[#001C5C] focus:ring-1 focus:ring-[#001C5C] font-['Montserrat',sans-serif]"
                  />
                </div>

                {/* Father's Name */}
                <div>
                  <label className="block font-['Montserrat',sans-serif] text-xs font-bold text-[#001C5C] uppercase tracking-wider mb-1.5">
                    Father's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    required
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    placeholder="Enter father's name"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-[6px] focus:outline-none focus:border-[#001C5C] focus:ring-1 focus:ring-[#001C5C] font-['Montserrat',sans-serif]"
                  />
                </div>

                {/* Mother's Name */}
                <div>
                  <label className="block font-['Montserrat',sans-serif] text-xs font-bold text-[#001C5C] uppercase tracking-wider mb-1.5">
                    Mother's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="motherName"
                    required
                    value={formData.motherName}
                    onChange={handleInputChange}
                    placeholder="Enter mother's name"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-[6px] focus:outline-none focus:border-[#001C5C] focus:ring-1 focus:ring-[#001C5C] font-['Montserrat',sans-serif]"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block font-['Montserrat',sans-serif] text-xs font-bold text-[#001C5C] uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-[6px] focus:outline-none focus:border-[#001C5C] focus:ring-1 focus:ring-[#001C5C] font-['Montserrat',sans-serif]"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-['Montserrat',sans-serif] text-xs font-bold text-[#001C5C] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-[6px] focus:outline-none focus:border-[#001C5C] focus:ring-1 focus:ring-[#001C5C] font-['Montserrat',sans-serif]"
                  />
                </div>

                {/* Qualification */}
                <div>
                  <label className="block font-['Montserrat',sans-serif] text-xs font-bold text-[#001C5C] uppercase tracking-wider mb-1.5">
                    Your Qualification <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-[6px] focus:outline-none focus:border-[#001C5C] focus:ring-1 focus:ring-[#001C5C] font-['Montserrat',sans-serif] bg-white"
                  >
                    <option value="Below 8th">Below 8th</option>
                    <option value="8th Pass">8th Pass</option>
                    <option value="10th Pass">10th Pass</option>
                    <option value="12th Pass">12th Pass</option>
                    <option value="ITI / Diploma">ITI / Diploma</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                  </select>
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block font-['Montserrat',sans-serif] text-xs font-bold text-[#001C5C] uppercase tracking-wider mb-1.5">
                    Which Course Are You Looking? <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-[6px] focus:outline-none focus:border-[#001C5C] focus:ring-1 focus:ring-[#001C5C] font-['Montserrat',sans-serif] bg-white font-medium text-[#001C5C]"
                  >
                    {ALL_COURSES_OPTIONS.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block font-['Montserrat',sans-serif] text-xs font-bold text-[#001C5C] uppercase tracking-wider mb-1.5">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House / Street, Locality, City, State, Pincode"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-[6px] focus:outline-none focus:border-[#001C5C] focus:ring-1 focus:ring-[#001C5C] font-['Montserrat',sans-serif]"
                />
              </div>

              {/* Message / Query */}
              <div>
                <label className="block font-['Montserrat',sans-serif] text-xs font-bold text-[#001C5C] uppercase tracking-wider mb-1.5">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your learning goals or preferred center timings..."
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-[6px] focus:outline-none focus:border-[#001C5C] focus:ring-1 focus:ring-[#001C5C] font-['Montserrat',sans-serif] resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 text-center sm:text-left">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-[#F87902] hover:bg-[#e06c00] text-white text-xs sm:text-[13px] font-semibold uppercase tracking-wider px-9 py-3.5 transition-colors shadow-sm rounded-none disabled:opacity-70 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting Registration...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>SUBMIT REGISTRATION</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
