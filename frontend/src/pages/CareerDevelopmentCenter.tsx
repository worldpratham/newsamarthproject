import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Clock, Award, Loader2 } from 'lucide-react';
import {
  cdcBanner,
  cdcIntro,
  cdcOffers,
  cdcSideImage,
  partnerCollegeLogos,
} from '@/data/cdcData';
import { getCourses } from '@/services/courseApi';

interface DisplayCdcCourse {
  id: string | number;
  title: string;
  language: string;
  duration: string;
  certification: string;
  imageUrl?: string;
  fallbackImage: string;
  wpImage?: string;
  slug: string;
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
};

export default function CareerDevelopmentCenter() {
  const [courses, setCourses] = useState<DisplayCdcCourse[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [isLiveFromApi, setIsLiveFromApi] = useState(false);

  useEffect(() => {
    document.title = 'Career Development Centre - Samarth Bharat';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let isMounted = true;
    async function fetchCdcCourses() {
      try {
        setLoadingCourses(true);
        console.log('[CDC Page] Calling courses API: /api/courses?isCDC=true');
        const apiList = await getCourses({ isCDC: true });
        console.log('[CDC Page] Received courses count from API:', apiList?.length);

        if (isMounted && apiList && apiList.length > 0) {
          const mapped: DisplayCdcCourse[] = apiList.map((item, idx) => {
            const cleanSlug = (item.slug || '').replace(/^\/+|\/+$/g, '');
            const fallbackLocal = LOCAL_COURSE_IMAGES[cleanSlug] || '/courses/ac-repair-course.jpg';
            const resolvedSlug = `/${cleanSlug}`;

            return {
              id: item._id || item.id || idx + 1,
              title: item.title,
              language: item.language || 'Hindi',
              duration: item.duration || '',
              certification: item.certification || 'Yes',
              imageUrl: item.imageUrl || fallbackLocal,
              fallbackImage: fallbackLocal,
              wpImage: item.imageUrl,
              slug: resolvedSlug,
            };
          });

          setCourses(mapped);
          setIsLiveFromApi(true);
        } else if (isMounted) {
          setCourses([]);
        }
      } catch (err) {
        console.error('[CDC Page] API call failed:', err);
        if (isMounted) {
          setCourses([]);
        }
      } finally {
        if (isMounted) setLoadingCourses(false);
      }
    }

    fetchCdcCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white w-full overflow-x-hidden min-h-screen">
      {/* 1. Hero Gradient Title Banner matching WordPress elementor-element-df498c9 */}
      <section
        className="w-full py-12 sm:py-16 md:py-20 text-center text-white overflow-hidden shadow-xs"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-[44px] font-extrabold leading-tight tracking-wide">
            {cdcBanner.title}
          </h1>
        </div>
      </section>

      {/* 2. Full-Width CDC Banner Graphic matching WordPress elementor-element-f6923aa */}
      <section className="w-full bg-white">
        <div className="w-full mx-auto">
          <img
            src={cdcBanner.bannerImage}
            alt="CDC - Career Development Centers"
            className="w-full h-auto object-cover max-h-[500px]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = cdcBanner.wpBannerImage;
            }}
          />
        </div>
      </section>

      {/* 3. Introduction Section matching WordPress elementor-element-f54a008 */}
      <section
        className="w-full py-12 sm:py-14 md:py-16 text-white overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="w-full text-left">
            <h2 className="font-['Times_New_Roman',serif] text-white text-2xl sm:text-3xl md:text-[40px] font-extrabold mb-5 leading-tight tracking-normal">
              {cdcIntro.heading}
            </h2>
            <div className="space-y-4 font-['Montserrat',sans-serif] text-white text-[15px] leading-[1.8] text-justify font-normal">
              {cdcIntro.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. "These CDCs Offer" Section matching WordPress elementor-element-d48cc8b */}
      <section className="w-full py-12 md:py-16 bg-[#F8FAFC]">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="font-serif text-[#001C5C] text-2xl sm:text-3xl md:text-[36px] font-bold">
              These CDCs Offer
            </h2>
            <div className="w-20 h-1 bg-[#F87902] mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Column: 5 Offer items */}
            <div className="space-y-5">
              {cdcOffers.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-xs border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all duration-300"
                >
                  <div className="shrink-0 w-16 h-16 rounded-lg bg-orange-50/60 p-2 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = item.wpImage;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-[#001C5C] text-lg font-bold mb-1">
                      {item.title}
                    </h3>
                    <p className="font-['Montserrat',sans-serif] text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Workshop Image */}
            <div className="flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white max-w-lg w-full group">
                <img
                  src={cdcSideImage.image}
                  alt={cdcSideImage.alt}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = cdcSideImage.wpImage;
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Partner Colleges MoUs Signed matching WordPress elementor-element-a034068 */}
      <section className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-[#001C5C] text-2xl sm:text-3xl md:text-[34px] font-bold">
              Partner Colleges of University of Delhi – MoUs Signed
            </h2>
            <div className="w-20 h-1 bg-[#F87902] mx-auto mt-3"></div>
          </div>

          {/* Logo Carousel / Marquee */}
          <div className="relative mb-12 overflow-hidden py-4 border-y border-gray-100 bg-gray-50/50 group">
            {/* Subtle edge fade overlays */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-gray-50 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-gray-50 to-transparent z-10" />

            <div className="flex w-max gap-6 sm:gap-10 items-center animate-marquee-left">
              {[...partnerCollegeLogos, ...partnerCollegeLogos, ...partnerCollegeLogos].map((logo, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center justify-center shrink-0 w-24 sm:w-28 h-20 sm:h-24 bg-white p-2 rounded-lg shadow-xs border border-gray-200/60"
                  title={logo.name}
                >
                  <img
                    src={`/cdc/colleges/${logo.file}`}
                    alt={logo.name}
                    className="max-h-12 sm:max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://samarthbharat.net/wp-content/uploads/2025/09/${logo.file}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Partner Colleges Table */}
          {/* <div className="max-w-4xl mx-auto overflow-x-auto rounded-lg shadow-sm border border-gray-200">
            <table className="w-full border-collapse text-left text-sm font-['Montserrat',sans-serif]">
              <thead>
                <tr className="bg-[#001C5C] text-white">
                  <th className="py-3.5 px-4 font-bold text-center w-20 border-r border-blue-900/40">
                    S. No.
                  </th>
                  <th className="py-3.5 px-6 font-bold">
                    College Name
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partnerCollegesList.map((college, idx) => (
                  <tr
                    key={college.sno}
                    className={idx % 2 === 0 ? 'bg-white hover:bg-orange-50/50 transition-colors' : 'bg-gray-50/80 hover:bg-orange-50/50 transition-colors'}
                  >
                    <td className="py-2.5 px-4 text-center font-medium text-gray-700 border-r border-gray-200">
                      {college.sno}
                    </td>
                    <td className="py-2.5 px-6 font-medium text-gray-800">
                      {college.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
      </section>

      {/* 6. CDC Courses Grid matching WordPress elementor-element-f53c76f */}
      <section className="w-full py-12 md:py-16 bg-[#F8FAFC]">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-[#001C5C] text-2xl sm:text-3xl md:text-[36px] font-bold">
              Career Development Centre (CDC) Courses
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <p className="font-['Montserrat',sans-serif] text-[#F87902] font-semibold text-base sm:text-lg">
                Practical Training for Real-World Careers.
              </p>
             
              
            </div>
            <div className="w-20 h-1 bg-[#F87902] mx-auto mt-3"></div>
          </div>

          {/* 4-Column Responsive Grid */}
          {loadingCourses && courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="animate-spin text-[#F87902]" size={36} />
              <p className="text-gray-500 font-['Montserrat',sans-serif] text-sm">
                Loading CDC courses...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-xl border border-gray-200/80 transition-all duration-300 flex flex-col group"
                >
                  {/* Course Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                    <img
                      src={course.imageUrl || course.wpImage || course.fallbackImage}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = course.fallbackImage;
                      }}
                    />
                  </div>

                  {/* Course Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-[#001C5C] font-bold text-lg mb-3 min-h-[48px] leading-tight">
                        {course.title}
                      </h3>

                      {/* Metadata List */}
                      <ul className="space-y-1.5 text-xs text-gray-600 font-['Montserrat',sans-serif] mb-5">
                        <li className="flex items-center gap-2">
                          <Globe size={14} className="text-[#001C5C]" />
                          <span>{course.language}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock size={14} className="text-[#001C5C]" />
                          <span>Duration: {course.duration}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Award size={14} className="text-[#001C5C]" />
                          <span>Certification: {course.certification}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Course Detail Button */}
                    <div className="pt-2 border-t border-gray-100 flex justify-end">
                      <Link
                        to={course.slug}
                        className="inline-block bg-[#F87902] hover:bg-[#e06c00] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-sm transition-all shadow-xs hover:shadow-sm"
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

      {/* 7. Featured Courses Swiper Carousel matching WordPress bottom slider */}
  {/* <section className="w-full py-12 md:py-16 bg-white border-t border-gray-200">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-serif text-[#001C5C] text-xl sm:text-2xl font-bold">
                Featured CDC Training Highlights
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-['Montserrat',sans-serif]">
                Handpicked hands-on vocational courses for immediate employment
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous Course"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-[#001C5C] hover:text-white hover:border-[#001C5C] transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Course"
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-[#001C5C] hover:text-white hover:border-[#001C5C] transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Slider Item */}
          {/* <div className="bg-[#F8FAFC] rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-64 sm:h-72 rounded-xl overflow-hidden bg-gray-200">
                <img
                  src={featuredSliderCourses[sliderIndex].image}
                  alt={featuredSliderCourses[sliderIndex].title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      featuredSliderCourses[sliderIndex].wpImage;
                  }}
                />
              </div>
              <div className="space-y-4">
                <span className="inline-block bg-[#001C5C] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded">
                  Featured Course
                </span>
                <h4 className="font-serif text-[#001C5C] text-2xl sm:text-3xl font-bold">
                  {featuredSliderCourses[sliderIndex].title}
                </h4>
                <ul className="space-y-2 text-sm text-gray-600 font-['Montserrat',sans-serif]">
                  <li className="flex items-center gap-2">
                    <Globe size={16} className="text-[#F87902]" />
                    <span>Medium: {featuredSliderCourses[sliderIndex].language}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock size={16} className="text-[#F87902]" />
                    <span>Duration: {featuredSliderCourses[sliderIndex].duration}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award size={16} className="text-[#F87902]" />
                    <span>Govt Recognized Certification: Yes</span>
                  </li>
                </ul>
                <div className="pt-2">
                  <Link
                    to={featuredSliderCourses[sliderIndex].slug}
                    className="inline-block bg-[#F87902] hover:bg-[#e06c00] text-white text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded shadow-sm transition-all"
                  >
                    View Complete Syllabus & Centers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>*/}
    </div>
  );
}
