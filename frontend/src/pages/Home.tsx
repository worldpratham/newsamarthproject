import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  Briefcase,
  Users,
  Building2,
  HandHeart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Play,
  X,
  Globe,
  Clock,
} from 'lucide-react';
import { successStories, courseAnnouncements, supporters } from '@/data/content';
import { getCourses } from '@/services/courseApi';
import { getStories, StoryItem } from '@/services/storyApi';

function CountUp({
  target,
  suffix = '',
  className = '',
}: {
  target: number;
  suffix?: string;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className={className || "text-4xl md:text-5xl font-bold text-white"}>
      {count.toLocaleString()}<span>{suffix}</span>
    </div>
  );
}

interface DisplayCarouselCourse {
  id: string | number;
  slug: string;
  title: string;
  language: string;
  duration: string;
  certification: string;
  image: string;
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

const POPULAR_SLUG_ORDER = [
  'ac-fridge-repair-course',
  'beautician-course',
  'cutting-tailoring',
  'digital-marketing-course',
  'bakery-course',
  'video-editing-course',
  'ai-prompt-engineering',
  'flutter-app-development',
  'nail-art-course',
  'ro-repairing-course',
  'carpenter-training',
  'truck-repairing-course',
  'general-duty-assistant',
];

function CourseCarousel() {
  const [courseList, setCourseList] = useState<DisplayCarouselCourse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchPopularCourses() {
      try {
        setIsLoading(true);
        console.log('[Home] Fetching courses from API: /api/courses');
        const apiCourses = await getCourses();
        console.log('[Home] Courses fetched via API count:', apiCourses?.length);

        if (isMounted && apiCourses && apiCourses.length > 0) {
          // Sort courses prioritizing popular community training courses
          const sorted = [...apiCourses].sort((a, b) => {
            const cleanA = (a.slug || '').replace(/^\/+|\/+$/g, '');
            const cleanB = (b.slug || '').replace(/^\/+|\/+$/g, '');
            const idxA = POPULAR_SLUG_ORDER.indexOf(cleanA);
            const idxB = POPULAR_SLUG_ORDER.indexOf(cleanB);
            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            return (a.order || 99) - (b.order || 99);
          });

          const mapped: DisplayCarouselCourse[] = sorted.map((item, idx) => {
            const cleanSlug = (item.slug || '').replace(/^\/+|\/+$/g, '');
            const localFallback = LOCAL_COURSE_IMAGES[cleanSlug] || '/courses/ac-repair-course.jpg';
            return {
              id: item._id || item.id || idx + 1,
              slug: cleanSlug,
              title: item.title,
              language: item.language || 'Hindi',
              duration: item.duration || '3 Month',
              certification: item.certification || 'Yes',
              image: LOCAL_COURSE_IMAGES[cleanSlug] || item.imageUrl || localFallback,
            };
          });

          setCourseList(mapped);
        }
      } catch (err) {
        console.warn('[Home] Failed to load courses from API, maintaining local dataset:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchPopularCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalCourses = courseList.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, totalCourses - slidesPerView);

  // Re-clamp currentIndex whenever maxIndex changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [maxIndex, currentIndex]);

  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex]);

  const nextSlide = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <div
      className="relative max-w-6xl mx-auto px-4 sm:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel viewport */}
      <div className="overflow-hidden py-2">
        {isLoading && courseList.length === 0 ? (
          <div className="flex -mx-3">
            {Array.from({ length: slidesPerView }).map((_, i) => (
              <div key={i} className="shrink-0 px-3" style={{ width: `${100 / slidesPerView}%` }}>
                <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-3.5 h-[280px] animate-pulse flex flex-col justify-between">
                  <div className="w-full aspect-[16/10] bg-gray-200 rounded-lg" />
                  <div className="space-y-2 mt-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-7 bg-orange-100 rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex transition-transform duration-500 ease-in-out -mx-3"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
            }}
          >
          {courseList.map((course) => {
            const cleanSlug = course.slug.replace(/^\/+|\/+$/g, '');
            const fallbackLocal = LOCAL_COURSE_IMAGES[cleanSlug] || '/courses/ac-repair-course.jpg';
            const durationText = course.duration.toLowerCase().startsWith('duration:')
              ? course.duration
              : `Duration: ${course.duration}`;
            const certText = course.certification.toLowerCase().startsWith('certification:')
              ? course.certification
              : `Certification: ${course.certification}`;

            return (
              <div
                key={course.id || course.slug}
                className="shrink-0 px-3"
                style={{ width: `${100 / slidesPerView}%` }}
              >
                <div className="bg-white rounded-xl border border-[#001C5C] p-3 sm:p-3.5 flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-shadow">
                  {/* Course Image */}
                  <Link
                    to={`/courses/${cleanSlug}`}
                    className="block rounded-lg overflow-hidden w-full aspect-[16/10] bg-gray-100 mb-3 group"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== fallbackLocal) {
                          target.src = fallbackLocal;
                        }
                      }}
                    />
                  </Link>

                  {/* Course Title (Serif Navy matching WordPress) */}
                  <Link to={`/courses/${cleanSlug}`} className="block">
                    <h3 className="text-[15px] sm:text-[16px] font-serif font-bold text-[#001C5C] hover:text-[#F87902] transition-colors mb-3 text-left leading-snug line-clamp-1">
                      {course.title}
                    </h3>
                  </Link>

                  {/* Bottom Row: Info on Left, COURSE DETAIL Button on Right */}
                  <div className="flex items-end justify-between gap-2 pt-2 border-t border-gray-100">
                    {/* Left: Info list */}
                    <div className="space-y-1 text-xs text-dark-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Globe size={13} className="text-[#F87902] shrink-0" />
                        <span>{course.language}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-[#F87902] shrink-0" />
                        <span>{durationText}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#F87902] shrink-0 inline-block" />
                        <span>{certText}</span>
                      </div>
                    </div>

                    {/* Right: COURSE DETAIL Button */}
                    <Link
                      to={`/courses/${cleanSlug}`}
                      className="bg-[#F87902] hover:bg-[#e06c00] text-white text-[10.5px] sm:text-[11.5px] font-semibold uppercase tracking-wider px-3 py-1.5 sm:px-3.5 sm:py-2 transition-colors shadow-sm rounded-none whitespace-nowrap inline-block"
                    >
                      COURSE DETAIL
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        )}
      </div>

      {/* Navigation arrows (Subtle chevrons on sides matching WordPress) */}
      <button
        onClick={prevSlide}
        className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 text-dark-300 hover:text-dark-700 transition-colors flex items-center justify-center z-10 cursor-pointer"
        aria-label="Previous course"
      >
        <ChevronLeft size={28} className="stroke-[1.5]" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-dark-300 hover:text-dark-700 transition-colors flex items-center justify-center z-10 cursor-pointer"
        aria-label="Next course"
      >
        <ChevronRight size={28} className="stroke-[1.5]" />
      </button>
    </div>
  );
}

function SupportersSlider() {
  return (
    <div className="relative w-full overflow-hidden py-4 group">
      {/* Subtle edge fade overlays for smooth look */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Sliding Marquee Track */}
      <div className="flex w-max items-center gap-10 sm:gap-14 md:gap-16 animate-marquee-left">
        {[...supporters, ...supporters, ...supporters].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center shrink-0 w-32 sm:w-40 md:w-48 h-24 sm:h-28 px-3 transition-transform duration-300 hover:scale-105"
            title={item.name}
          >
            <img
              src={item.logo}
              alt={item.name}
              className="max-h-16 sm:max-h-20 md:max-h-24 max-w-full object-contain filter hover:brightness-105 transition-all"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const localStoryFallbacks: Record<number, string> = {
  1: '/stories/story-1.jpg',
  2: '/stories/story-2.jpg',
  3: '/stories/story-3.jpg',
  4: '/stories/story-4.png',
  5: '/stories/story-5.png',
  6: '/stories/story-6.jpg',
  7: '/stories/story-7.jpg',
  8: '/stories/story-8.png',
  9: '/stories/story-9.png',
  10: '/stories/story-10.jpg',
  11: '/stories/story-11.jpg',
  12: '/stories/story-12.jpg',
  13: '/stories/story-13.jpg',
  14: '/stories/story-14.jpg',
  15: '/stories/story-15.jpg',
  16: '/stories/story-16.jpg',
  17: '/stories/story-17.png',
  18: '/stories/story-18.jpg',
  19: '/stories/story-19.png',
  20: '/stories/story-20.png',
  21: '/stories/story-21.jpg',
  22: '/stories/story-22.jpg',
  23: '/stories/story-23.jpg',
  24: '/stories/story-24.jpg',
};

function getStoryExcerpt(story: StoryItem): string {
  const text = story.storyText || story.story || '';
  if (!text) return '';
  if (text.length <= 150) return text;
  const sliced = text.slice(0, 150);
  const lastSpace = sliced.lastIndexOf(' ');
  return (lastSpace > 110 ? sliced.slice(0, lastSpace) : sliced) + '...';
}

export default function Home() {
  const [stories, setStories] = useState<StoryItem[]>(() =>
    successStories.slice(0, 6).map((s) => ({
      name: s.name,
      role: s.role,
      image: s.image,
      imageUrl: s.image,
      storyText: s.shortDescription,
    }))
  );
  const [loadingStories, setLoadingStories] = useState(true);
  const [storyIndex, setStoryIndex] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const [isAnnouncePaused, setIsAnnouncePaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchHomeStories() {
      try {
        setLoadingStories(true);
        console.log('[Home] Calling stories API: /api/stories');
        const data = await getStories();
        console.log('[Home] Received stories count from API:', data?.length);
        if (isMounted && data && data.length > 0) {
          setStories(data.slice(0, 6));
        }
      } catch (err) {
        console.warn('[Home] Failed to fetch stories from API, keeping fallback dataset:', err);
      } finally {
        if (isMounted) setLoadingStories(false);
      }
    }
    fetchHomeStories();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxStoryIndex = isMobile ? Math.max(0, stories.length - 1) : Math.max(0, stories.length - 2);

  // Clamp storyIndex if maxStoryIndex changes
  useEffect(() => {
    if (storyIndex > maxStoryIndex) {
      setStoryIndex(0);
    }
  }, [maxStoryIndex, storyIndex]);

  useEffect(() => {
    if (isStoryPaused) return;
    const interval = setInterval(() => {
      setStoryIndex((prev) => (prev >= maxStoryIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isStoryPaused, maxStoryIndex]);

  const prevStory = () => {
    setStoryIndex((prev) => (prev <= 0 ? maxStoryIndex : prev - 1));
  };

  const nextStory = () => {
    setStoryIndex((prev) => (prev >= maxStoryIndex ? 0 : prev + 1));
  };

  return (
    <div>
      {/* Hero Section (Authentic WordPress Design from samarthbharat.net) */}
      <section className="relative bg-white">
        {/* Banner Graphic (Empowering Skills, Transforming Lives + Trainees Collage) */}
        <div className="w-full relative bg-white">
          <img
            src="/banner-1.webp"
            alt="Empowering Skills, Transforming Lives - Samarth Bharat"
            className="w-full h-auto object-cover min-h-[300px] md:min-h-[440px] lg:min-h-[500px]"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://samarthbharat.net/wp-content/uploads/2025/05/banner-1-scaled.webp';
            }}
          />
        </div>

        {/* Three Pillars Blue Banner (Skill Development, Certification, Livelihood Opportunities) */}
        <div className="container-page -mt-8 sm:-mt-12 md:-mt-20 lg:-mt-24 relative z-20 pb-12">
          <div className="bg-[#001C5C] text-white rounded-xl shadow-2xl p-6 md:p-8 lg:p-9">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-start divide-y md:divide-y-0 md:divide-x divide-white/20">
              {/* 1. Skill Development */}
              <div className="flex items-start gap-4 pt-4 md:pt-0">
                <svg
                  className="w-9 h-9 fill-current text-white shrink-0 mt-0.5"
                  viewBox="0 0 640 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M290.547 189.039c-20.295-10.149-44.147-11.199-64.739-3.89 42.606 0 71.208 20.475 85.578 50.576 8.576 17.899-5.148 38.071-23.617 38.071 18.429 0 32.211 20.136 23.617 38.071-14.725 30.846-46.123 50.854-80.298 50.854-.557 0-94.471-8.615-94.471-8.615l-66.406 33.347c-9.384 4.693-19.815.379-23.895-7.781L1.86 290.747c-4.167-8.615-1.111-18.897 6.946-23.621l58.072-33.069L108 159.861c6.39-57.245 34.731-109.767 79.743-146.726 11.391-9.448 28.341-7.781 37.51 3.613 9.446 11.394 7.78 28.067-3.612 37.516-12.503 10.559-23.618 22.509-32.509 35.57 21.672-14.729 46.679-24.732 74.186-28.067 14.725-1.945 28.063 8.336 29.73 23.065 1.945 14.728-8.336 28.067-23.062 29.734-16.116 1.945-31.12 7.503-44.178 15.284 26.114-5.713 58.712-3.138 88.079 11.115 13.336 6.669 18.893 22.509 12.224 35.848-6.389 13.06-22.504 18.617-35.564 12.226zm-27.229 69.472c-6.112-12.505-18.338-20.286-32.231-20.286a35.46 35.46 0 0 0-35.565 35.57c0 21.428 17.808 35.57 35.565 35.57 13.893 0 26.119-7.781 32.231-20.286 4.446-9.449 13.614-15.006 23.339-15.284-9.725-.277-18.893-5.835-23.339-15.284zm374.821-37.237c4.168 8.615 1.111 18.897-6.946 23.621l-58.071 33.069L532 352.16c-6.39 57.245-34.731 109.767-79.743 146.726-10.932 9.112-27.799 8.144-37.51-3.613-9.446-11.394-7.78-28.067 3.613-37.516 12.503-10.559 23.617-22.509 32.508-35.57-21.672 14.729-46.679 24.732-74.186 28.067-10.021 2.506-27.552-5.643-29.73-23.065-1.945-14.728 8.336-28.067 23.062-29.734 16.116-1.946 31.12-7.503 44.178-15.284-26.114 5.713-58.712 3.138-88.079-11.115-13.336-6.669-18.893-22.509-12.224-35.848 6.389-13.061 22.505-18.619 35.565-12.227 20.295 10.149 44.147 11.199 64.739 3.89-42.606 0-71.208-20.475-85.578-50.576-8.576-17.899 5.148-38.071 23.617-38.071-18.429 0-32.211-20.136-23.617-38.071 14.033-29.396 44.039-50.887 81.966-50.854l92.803 8.615 66.406-33.347c9.408-4.704 19.828-.354 23.894 7.781l44.455 88.926zm-229.227-18.618c-13.893 0-26.119 7.781-32.231 20.286-4.446 9.449-13.614 15.006-23.339 15.284 9.725.278 18.893 5.836 23.339 15.284 6.112 12.505 18.338 20.286 32.231 20.286a35.46 35.46 0 0 0 35.565-35.57c0-21.429-17.808-35.57-35.565-35.57z"
                  />
                </svg>
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-serif text-white mb-2 leading-snug">
                    Skill Development
                  </h3>
                  <p className="text-white/85 text-xs md:text-[13px] leading-relaxed">
                    We provide industry-relevant training programs that equip individuals with practical knowledge and hands-on experience. Our focus is on enhancing employability by developing both technical expertise and essential life skills needed in today's competitive world.
                  </p>
                </div>
              </div>

              {/* 2. Certification */}
              <div className="flex items-start gap-4 pt-6 md:pt-0 md:pl-6 lg:pl-8">
                <GraduationCap size={36} className="text-white shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-serif text-white mb-2 leading-snug">
                    Certification
                  </h3>
                  <p className="text-white/85 text-xs md:text-[13px] leading-relaxed">
                    On successful completion of training, participants are awarded recognized certificates that validate their skills and boost their career prospects. These certifications serve as a bridge between learning and employment, opening doors to new opportunities.
                  </p>
                </div>
              </div>

              {/* 3. Livelihood Opportunities */}
              <div className="flex items-start gap-4 pt-6 md:pt-0 md:pl-6 lg:pl-8">
                <Trophy size={34} className="text-white shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-serif text-white mb-2 leading-snug">
                    Livelihood Opportunities
                  </h3>
                  <p className="text-white/85 text-xs md:text-[13px] leading-relaxed">
                    Empowering individuals with sustainable income avenues through employment, self-employment and entrepreneurship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements / Counter Section (Orange Background with MoU photo & exact WordPress numbers) */}
      <section
        className="relative bg-cover bg-center py-20 md:py-28 overflow-hidden text-white"
        style={{
          backgroundImage: "url('/achievements-bg.jpg')",
        }}
      >
        {/* Exact WordPress Overlay Gradient: #F87902 to #A21A3B */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(248, 121, 2, 0.84) 0%, rgba(162, 26, 59, 0.84) 100%)',
          }}
        />

        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading, text, and play button */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-5 tracking-tight">
                Achievements
              </h2>
              <p className="text-white text-base sm:text-lg leading-relaxed mb-8 max-w-lg font-normal">
                A quiet strength fills our mission, as lives transform with every skill learned — like the steady rise of a new dawn, bright with confidence, hope, and the promise of self-reliance.
              </p>
              {/* Play Button */}
              <button
                onClick={() => setVideoModalOpen(true)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-[3px] border-white flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer group bg-white/10 hover:bg-white/20"
                aria-label="Play video"
                title="Play Video"
              >
                <Play size={28} className="fill-white translate-x-0.5 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Right Column: Numbers Layout matching WordPress site */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 sm:gap-y-12 gap-x-8 lg:gap-x-12">
                {/* 1. Trained: 11,800+ */}
                <div>
                  <CountUp
                    target={11800}
                    suffix="+"
                    className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-none"
                  />
                  <p className="text-white text-base sm:text-lg font-medium mt-2">
                    Trained
                  </p>
                </div>

                {/* 2. Working and earning: 65% */}
                <div>
                  <CountUp
                    target={65}
                    suffix="%"
                    className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-none"
                  />
                  <p className="text-white text-base sm:text-lg font-medium mt-2">
                    Working and earning
                  </p>
                </div>

                {/* 3. Running a business: 2,937 */}
                <div>
                  <CountUp
                    target={2937}
                    suffix=""
                    className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-none"
                  />
                  <p className="text-white text-base sm:text-lg font-medium mt-2">
                    Running a business
                  </p>
                </div>

                {/* 4. Training Centers: 100+ */}
                <div>
                  <CountUp
                    target={100}
                    suffix="+"
                    className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-none"
                  />
                  <p className="text-white text-base sm:text-lg font-medium mt-2">
                    Training Centers
                  </p>
                </div>

                {/* 5. States: 16 (centered on sm screens or under column 1) */}
                <div className="sm:col-span-2 flex justify-start sm:justify-center lg:justify-start pt-2">
                  <div>
                    <CountUp
                      target={16}
                      suffix=""
                      className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-none"
                    />
                    <p className="text-white text-base sm:text-lg font-medium mt-2">
                      States
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridging the Gap Section (Exact WordPress Replica) */}
      <section className="w-full bg-white overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Left Column: Edge-to-edge Collage Image */}
          <div className="w-full lg:w-1/2 flex">
            <img
              src="/sb-about.jpg"
              alt="Samarth Bharat Trainees & Skill Training Workshop"
              className="w-full h-full object-cover min-h-[360px] sm:min-h-[440px] lg:min-h-[520px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://samarthbharat.net/wp-content/uploads/2025/05/SB-About-img.jpg';
              }}
            />
          </div>

          {/* Right Column: Content with Navy Serif Heading & Orange KNOW MORE button */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 py-12 lg:py-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#001C5C] leading-snug mb-6">
              Bridging the Gap Between Industry Demand and Skill Ecosystem
            </h2>

            <p className="text-dark-600 text-sm md:text-[14.5px] leading-relaxed mb-5 text-justify sm:text-left">
              Samarth Bharat embodies a diverse approach to national development through various Skill Development Programs and Career Development Centers (CDCs). The Skill Development Program aims to empower vulnerable and marginalized communities by providing them with essential skills needed for active workforce participation. This endeavor fosters aspirational values amongst the youth by building capacity for skill development across formal and informal sectors.
            </p>

            <p className="text-dark-600 text-sm md:text-[14.5px] leading-relaxed mb-8 text-justify sm:text-left">
              Further, it enables the generation of large-scale employment opportunities, thus contributing significantly to the nation's economic growth. Additionally, CDCs are set up in numerous colleges and universities to equip students with the essential tools and knowledge required to navigate the intricacies of entrepreneurship and the startup ecosystem. These centers serve as holistic development hubs for students, offering a range of services from mentorship by industry experts to platforms for startup and innovation initiatives.
            </p>

            <div>
              <Link
                to="/samarth-bharat-intro"
                className="inline-block bg-[#F87902] hover:bg-[#e06c00] text-white text-xs sm:text-[13px] font-semibold uppercase tracking-wider px-7 py-3 transition-colors shadow-sm rounded-none"
              >
                KNOW MORE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Training Programs - Auto-sliding Carousel (Exact WordPress Replica) */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#001C5C] mb-2">
              Our Popular Training Program
            </h2>
            <p className="text-sm md:text-base text-[#F87902] font-normal tracking-wide">
              Practical Training for Real-World Careers.
            </p>
          </div> 
          <CourseCarousel />
        </div>
      </section>

      {/* Message from the Patron */}


      {/* Success Stories & Announcements Section (Exact WordPress Replica) */}
      <section className="py-12 md:py-16 bg-white overflow-hidden">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Left Column (60% width): Success Stories Carousel */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Heading Bar - Orange matching WordPress */}
              <div className="bg-[#F87902] px-4 sm:px-5 py-2.5 mb-4 shadow-xs">
                <h2 className="text-xl sm:text-2xl font-serif font-semibold text-white tracking-wide m-0">
                  Success Stories
                </h2>
              </div>

              {/* Carousel Viewport */}
              <div
                className="relative overflow-hidden group flex-1 flex flex-col justify-center"
                onMouseEnter={() => setIsStoryPaused(true)}
                onMouseLeave={() => setIsStoryPaused(false)}
              >
                {/* Track */}
                <div
                  className="flex transition-transform duration-500 ease-in-out -mx-2"
                  style={{
                    transform: `translateX(-${storyIndex * (isMobile ? 100 : 50)}%)`,
                  }}
                >
                  {stories.map((story, i) => {
                    const fallbackImg = localStoryFallbacks[i + 1] || '/stories/story-1.jpg';
                    const storyImg = story.imageUrl || story.image || fallbackImg;
                    const excerpt = getStoryExcerpt(story);

                    return (
                      <div
                        key={story._id || story.id || i}
                        className="w-full sm:w-1/2 shrink-0 px-2 flex"
                      >
                        <div className="bg-[#001C5C] text-white rounded-[10px] p-5 sm:p-6 flex flex-col justify-between w-full h-[330px] sm:h-[350px] shadow-sm hover:shadow-md transition-shadow">
                          {/* Top: Avatar */}
                          <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-white/20 mb-3 bg-white/10">
                            <img
                              src={storyImg}
                              alt={story.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                if (target.src !== fallbackImg) {
                                  target.src = fallbackImg;
                                }
                              }}
                            />
                          </div>

                          {/* Middle: Short Description with Read More */}
                          <div className="flex-1 mb-2 text-white text-[13.5px] font-['Montserrat',sans-serif] leading-relaxed overflow-hidden">
                            <span>{excerpt}</span>
                            <Link
                              to="/success-stories"
                              className="font-bold text-white underline hover:text-orange-200 ml-1.5 inline whitespace-nowrap"
                            >
                              Read More
                            </Link>
                          </div>

                          {/* Bottom: Name & Role */}
                          <div className="pt-2 border-t border-white/10">
                            <h4 className="text-white font-serif font-semibold text-base leading-tight">
                              {story.name}
                            </h4>
                            <p className="text-white/80 font-['Montserrat',sans-serif] text-xs font-normal mt-0.5">
                              {story.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevStory}
                  className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/70 cursor-pointer"
                  aria-label="Previous story"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextStory}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/70 cursor-pointer"
                  aria-label="Next story"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Controls & View More Button */}
              <div className="flex items-center justify-between mt-4">
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: maxStoryIndex + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setStoryIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        i === storyIndex
                          ? 'w-6 bg-[#F87902]'
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* VIEW MORE Button (Right-aligned, Orange, rounded-none matching WordPress) */}
                <Link
                  to="/success-stories"
                  className="bg-[#F87902] hover:bg-[#e06c00] text-white font-['Montserrat',sans-serif] text-xs sm:text-[14px] font-medium uppercase tracking-wider px-6 py-2 transition-all shadow-sm rounded-none inline-block"
                >
                  VIEW MORE
                </Link>
              </div>
            </div>

            {/* Right Column (40% width): Announcements Box (Exact WordPress Replica) */}
            <div className="lg:col-span-5 flex flex-col">
              {/* Unified Bordered Container with Navy Header matching samarthbharat.net */}
              <div className="border border-[#001C5C] bg-white flex flex-col h-full rounded-none overflow-hidden shadow-xs">
                {/* Heading Bar - Navy matching WordPress elementor-element-618d0ed */}
                <div className="bg-[#001C5C] px-4 sm:px-5 py-2.5 shrink-0">
                  <h2 className="text-xl sm:text-2xl font-serif font-semibold text-white tracking-wide m-0">
                    Announcements
                  </h2>
                </div>

                {/* Marquee Content Container matching WordPress elementor-element-d9ae1c0 */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center min-h-[330px] sm:min-h-[350px] overflow-hidden">
                  <marquee
                    direction="up"
                    scrollamount={3}
                    className="w-full h-[290px] sm:h-[310px] overflow-hidden"
                    onMouseEnter={(e: any) => e.currentTarget.stop()}
                    onMouseLeave={(e: any) => e.currentTarget.start()}
                  >
                    <ul className="space-y-4 pl-5 list-outside">
                      {courseAnnouncements.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-[#fb0808] pl-1 marker:text-[#fb0808] marker:text-base"
                          style={{ listStyleType: 'circle' }}
                        >
                          <Link
                            to={item.link}
                            className="group block hover:underline"
                          >
                            <p className="font-['Montserrat',sans-serif] text-[14.5px] sm:text-[15px] text-black leading-relaxed m-0">
                              <span>{item.title}</span>{' '}
                              <span className="font-semibold text-[#fb0808] group-hover:underline whitespace-nowrap ml-1">
                                Apply Now
                              </span>
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </marquee>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Supporters Section (Exact WordPress Replica) */}
      <section className="py-14 md:py-20 bg-white overflow-hidden">
        <div className="container-page">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#001C5C] mb-2.5">
              Our Supporters
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#F87902] font-normal max-w-3xl mx-auto px-4">
              Your support is the foundation that turns every skill into strength, and every dream into reality.
            </p>
          </div>

          <SupportersSlider />
        </div>
      </section>
      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <iframe
              src="https://www.youtube.com/embed/o8F60YNoAss?autoplay=1"
              title="Samarth Bharat Video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
