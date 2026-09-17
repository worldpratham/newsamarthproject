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
import { courses, successStories, courseAnnouncements } from '@/data/content';

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

function CourseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const totalCourses = courses.length;

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

  useEffect(() => {
    if (isPaused) return;
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
        <div
          className="flex transition-transform duration-500 ease-in-out -mx-3"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
          }}
        >
          {courses.map((course) => (
            <div
              key={course.slug}
              className="shrink-0 px-3"
              style={{ width: `${100 / slidesPerView}%` }}
            >
              <div className="bg-white rounded-xl border border-[#001C5C] p-3 sm:p-3.5 flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-shadow">
                {/* Course Image */}
                <div className="rounded-lg overflow-hidden w-full aspect-[16/10] bg-gray-100 mb-3">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://samarthbharat.net/wp-content/uploads/2025/05/AC-repair-course.jpg';
                    }}
                  />
                </div>

                {/* Course Title (Serif Navy matching WordPress) */}
                <h3 className="text-[15px] sm:text-[16px] font-serif font-bold text-[#001C5C] mb-3 text-left leading-snug line-clamp-1">
                  {course.title}
                </h3>

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
                      <span>Duration: {course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#F87902] shrink-0 inline-block" />
                      <span>Certification: {course.certification}</span>
                    </div>
                  </div>

                  {/* Right: COURSE DETAIL Button */}
                  <Link
                    to={`/courses/${course.slug}`}
                    className="bg-[#F87902] hover:bg-[#e06c00] text-white text-[10.5px] sm:text-[11.5px] font-semibold uppercase tracking-wider px-3 py-1.5 sm:px-3.5 sm:py-2 transition-colors shadow-sm rounded-none whitespace-nowrap inline-block"
                  >
                    COURSE DETAIL
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows (Subtle chevrons on sides matching Image 1) */}
      <button
        onClick={prevSlide}
        className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 text-dark-300 hover:text-dark-700 transition-colors flex items-center justify-center z-10"
        aria-label="Previous course"
      >
        <ChevronLeft size={28} className="stroke-[1.5]" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-dark-300 hover:text-dark-700 transition-colors flex items-center justify-center z-10"
        aria-label="Next course"
      >
        <ChevronRight size={28} className="stroke-[1.5]" />
      </button>
    </div>
  );
}

export default function Home() {
  const [storyIndex, setStoryIndex] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const [isAnnouncePaused, setIsAnnouncePaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const stories = successStories.slice(0, 6);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxStoryIndex = isMobile ? stories.length - 1 : stories.length - 2;

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
                to="/about"
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-primary-600 font-medium text-sm uppercase tracking-wider mb-2">Message from</p>
              <p className="text-dark-500 font-medium text-lg mb-1">The Patron</p>
              <h3 className="text-2xl font-bold text-dark-800 mb-4">Bharat Bhushan</h3>
              <div className="space-y-3 text-dark-600 leading-relaxed text-sm">
                <p>At Samarth Bharat, we are driven by the vision of Pujya Bhaorao Deoras Ji—empowering the socially and economically weaker sections to become self-reliant.</p>
                <p>In August 2020, amidst the COVID-19 crisis, we launched skill training programs across Delhi-NCR, offering 12+ courses to help unemployed youth secure jobs and self-employment opportunities. Through 27 skill development centers, we have impacted 12,000+ lives via job fairs and training programs.</p>
                <p>In 2023, our partnership with Delhi University led to the launch of Career Development Centers (CDCs), fostering entrepreneurship and innovation among students. With a market-driven approach, we continue to build a self-sufficient and resilient workforce under the vision of Atmanirbhar Bharat.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto">
                <img
                  src="https://images.pexels.com/photos/5254594/pexels-photo-5254594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Patron"
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories & Announcements Section (WordPress Replica) */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Success Stories Carousel */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Heading Bar */}
              <div className="bg-[#F87902] px-4 py-2.5 mb-5 shadow-sm">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
                  Success Stories
                </h2>
              </div>

              {/* Carousel Viewport */}
              <div
                className="relative overflow-hidden group"
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
                  {stories.map((story, i) => (
                    <div
                      key={i}
                      className="w-full sm:w-1/2 shrink-0 px-2 flex"
                    >
                      <div className="bg-[#001C5C] text-white rounded-[10px] p-5 md:p-6 flex flex-col justify-between w-full min-h-[350px] md:h-[370px] shadow-sm hover:shadow-md transition-shadow">
                        {/* Top: Avatar */}
                        <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-white/20 mb-4 bg-white/10">
                          <img
                            src={story.image}
                            alt={story.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Middle: Short Description with Read More */}
                        <div className="flex-1 mb-3 text-white text-[13px] md:text-[14px] leading-relaxed overflow-hidden">
                          <span>{story.shortDescription}</span>
                          <Link
                            to="/success-stories"
                            className="font-bold text-white underline hover:text-orange-300 ml-1.5 inline whitespace-nowrap"
                          >
                            Read More
                          </Link>
                        </div>

                        {/* Bottom: Name & Role */}
                        <div className="pt-2 border-t border-white/10">
                          <h4 className="text-white font-bold text-base font-serif leading-tight">
                            {story.name}
                          </h4>
                          <p className="text-white/80 text-xs font-normal mt-0.5">
                            {story.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevStory}
                  className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/70"
                  aria-label="Previous story"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextStory}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/70"
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
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === storyIndex
                          ? 'w-6 bg-[#F87902]'
                          : 'w-2 bg-dark-300 hover:bg-dark-400'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* VIEW MORE Button */}
                <Link
                  to="/success-stories"
                  className="bg-[#F87902] hover:bg-[#e06c00] text-white text-xs font-semibold uppercase tracking-wider px-6 py-2 transition-all shadow-sm rounded-none inline-block"
                >
                  VIEW MORE
                </Link>
              </div>
            </div>

            {/* Right Column: Announcements */}
            <div className="lg:col-span-5 flex flex-col">
              {/* Heading Bar */}
              <div className="bg-[#001C5C] px-4 py-2.5 mb-5 shadow-sm">
                <h2 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
                  Announcements
                </h2>
              </div>

              {/* Announcements Bordered Box */}
              <div
                className="border border-[#001C5C] bg-white p-5 h-[350px] md:h-[370px] overflow-hidden relative flex flex-col justify-center"
                onMouseEnter={() => setIsAnnouncePaused(true)}
                onMouseLeave={() => setIsAnnouncePaused(false)}
              >
                <div
                  className={`space-y-4 animate-marquee-up ${
                    isAnnouncePaused ? '[animation-play-state:paused]' : ''
                  }`}
                >
                  {[...courseAnnouncements, ...courseAnnouncements, ...courseAnnouncements].map(
                    (item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-sm py-1 border-b border-gray-50 last:border-b-0"
                      >
                        <span className="text-[#fb0808] font-bold text-base leading-none select-none">
                          ›
                        </span>
                        <Link
                          to={item.link}
                          className="text-dark-900 hover:text-primary-600 text-[14px] md:text-[15px] leading-snug transition-colors group flex-1"
                        >
                          <span>{item.title}</span>
                          <span className="text-[#fb0808] font-semibold group-hover:underline ml-2 whitespace-nowrap">
                            Apply Now
                          </span>
                        </Link>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Supporters CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-dark-800 to-primary-900 text-white text-center">
        <div className="container-page">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <HandHeart size={32} className="text-secondary-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Supporters</h2>
            <p className="text-dark-300 text-lg mb-8">
              Your support is the foundation that turns every skill into strength, and every dream into reality.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm">
              <a href="tel:8595887700" className="flex items-center gap-2 hover:text-secondary-400 transition-colors">
                <span className="font-semibold">Help Line:</span> 8595887700
              </a>
              <a href="mailto:contact@samarthbharat.net" className="hover:text-secondary-400 transition-colors">
                contact@samarthbharat.net
              </a>
            </div>
            <Link to="/donate-us" className="inline-flex items-center gap-2 px-8 py-4 bg-secondary-500 text-white font-semibold rounded-lg hover:bg-secondary-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
              <HandHeart size={18} />
              Donate Now
            </Link>
          </div>
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
