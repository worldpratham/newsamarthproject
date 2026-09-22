import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, ChevronRight, Loader2, MapPin } from 'lucide-react';
import {
  wpEventsData,
  yearlyReports,
  monthlyReports,
  EventItem,
} from '@/data/eventsData';
import { getPostBySlug, PostApiModel } from '@/services/courseApi';

const LOCAL_EVENT_IMAGES: Record<string, string> = {
  'workshop-reportfoundation-of-innovation-workshop-16-18-february-2026organized-under-the-aegis-of-the-career-development-centre':
    '/events/workshop-report.png',
  'samarth-bharat-vichar-goshti-2026': '/events/vichar-goshti-2026.jpg',
  'dseu-signs-mou-with-samarth-bharat-and-sewa-bharti-to-promote-skill-development-and-socialupliftment':
    '/events/dseu-mou.jpeg',
  'seed-fund-accelerator-pitching-competition': '/events/shivaji-competition.jpeg',
  'my-career-my-choice-a-step-towards-clarity-in-career-building':
    '/events/mata-sundari-workshop.jpeg',
  'training-to-self-employment-success-story-program': '/events/sbsc-success-story.jpg',
};

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  // Resolve slug from param or path
  const pathSegment = location.pathname.replace(/^\/+|\/+$/g, '').replace(/^events\//, '');
  const activeSlug = (slug || pathSegment || '').toLowerCase().trim();

  // Fallback find in local dataset
  const fallbackEvent = wpEventsData.find(
    (e) =>
      e.slug.toLowerCase() === activeSlug ||
      activeSlug.includes(e.slug.toLowerCase()) ||
      e.slug.toLowerCase().includes(activeSlug)
  );

  const [apiPost, setApiPost] = useState<PostApiModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let isMounted = true;
    async function fetchPost() {
      if (!activeSlug) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getPostBySlug(activeSlug);
        if (isMounted && data) {
          setApiPost(data);
          document.title = `${data.title} - Samarth Bharat`;
        } else if (isMounted && fallbackEvent) {
          document.title = `${fallbackEvent.title} - Samarth Bharat`;
        }
      } catch (err) {
        console.warn('Failed to fetch event from API, using fallback:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [activeSlug, fallbackEvent]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 py-20">
        <Loader2 className="animate-spin text-[#004AAD]" size={36} />
        <p className="text-gray-500 font-['Montserrat',sans-serif] text-sm">Loading event details...</p>
      </div>
    );
  }

  // If both API post and fallback are missing
  if (!apiPost && !fallbackEvent) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto px-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#001C5C] mb-4">
          Event Not Found
        </h2>
        <p className="text-gray-600 font-['Montserrat',sans-serif] text-sm mb-6">
          The event you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 bg-[#004AAD] text-white px-5 py-2.5 rounded-md font-['Montserrat',sans-serif] text-sm font-semibold hover:bg-[#003c8c] transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Events
        </Link>
      </div>
    );
  }

  // Resolved event values
  const title = apiPost?.title || fallbackEvent?.title || '';
  const dateStr = apiPost?.date || fallbackEvent?.date || '';
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : fallbackEvent?.dateFormatted || '';

  const cleanSlug = apiPost?.slug || fallbackEvent?.slug || activeSlug;
  const localImage = LOCAL_EVENT_IMAGES[cleanSlug] || fallbackEvent?.fallbackImage || '/events/workshop-report.png';
  const imageUrl = apiPost?.imageUrl || fallbackEvent?.image || localImage;
  const content = apiPost?.content || fallbackEvent?.fullContent || '';
  const galleryImages = fallbackEvent?.galleryImages || [];

  return (
    <div className="w-full bg-[#FFFFFF]">
      {/* 1. Elementor Gradient Banner Section (matches elementor-element-6162515 exactly like samarthbharat.net/events/) */}
      <section
        className="w-full py-12 md:py-16 text-center relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2
            className="text-white text-3xl sm:text-4xl md:text-[40px] font-extrabold tracking-tight m-0"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            Events
          </h2>

          <h5 className="font-['Montserrat',sans-serif] text-white text-base sm:text-lg font-normal mt-2.5 max-w-3xl mx-auto leading-relaxed opacity-95 m-0">
            Capturing Every Moment of Change – Our Events, Your Inspiration!
          </h5>
        </div>
      </section>

      {/* 2. Main 2-Column Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
          {/* LEFT: 70% Width Article */}
          <main className="w-full lg:w-[70%] lg:pr-4">
            {/* Event Title */}
            <h1
              className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#001C5C] leading-snug mb-3"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              {title}
            </h1>

            {/* Date & Venue Bar */}
            {formattedDate && (
              <div className="flex items-center gap-2 text-sm font-['Montserrat',sans-serif] font-bold text-[#001C5C] mb-6">
                <Calendar size={15} />
                <span>{formattedDate}</span>
                {fallbackEvent?.venue && (
                  <>
                    <span className="text-gray-400 font-normal">•</span>
                    <span className="flex items-center gap-1 font-medium text-gray-600">
                      <MapPin size={14} className="text-[#001C5C]" />
                      {fallbackEvent.venue}
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Featured Image */}
            <div className="w-full overflow-hidden rounded-[8px] bg-gray-100 mb-8 border border-[#CACACA] shadow-xs">
              <img
                src={imageUrl}
                alt={title}
                className="w-full max-h-[480px] object-cover rounded-[8px]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = localImage;
                }}
              />
            </div>

            {/* Content Body */}
            {content.includes('<p') || content.includes('<div') || content.includes('<figure') ? (
              <div
                className="prose prose-lg max-w-none font-['Montserrat',sans-serif] text-gray-700 leading-relaxed text-[15px] space-y-4"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <div className="font-['Montserrat',sans-serif] text-gray-700 leading-relaxed text-[15px] sm:text-[16px] space-y-5">
                {content.split('\n\n').map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {/* Embedded Gallery if available */}
            {galleryImages && galleryImages.length > 1 && (
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h3 className="font-serif text-[#001C5C] text-xl font-bold mb-4">
                  Event Highlights & Gallery
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {galleryImages.map((gImg, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden rounded-lg shadow-xs border border-gray-100 group aspect-video bg-gray-100"
                    >
                      <img
                        src={gImg}
                        alt={`${title} photo ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = localImage;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Events navigation */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-[#001C5C] hover:text-[#F87902] font-['Montserrat',sans-serif] text-sm font-semibold transition-colors group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to All Events
              </Link>
            </div>
          </main>

          {/* RIGHT: 30% Width Sidebar */}
          <div className="w-full lg:w-[30%]">
            <div className="space-y-6">
              {/* 1. Facebook Page Embed Box */}
              <div
                className="w-full bg-white rounded-[8px] border border-[#CACACA] overflow-hidden p-2"
                style={{
                  boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.08)',
                }}
              >
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsamarthbharatofficial&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId"
                  width="100%"
                  height="500"
                  style={{ border: 'none', overflow: 'hidden', height: '500px', minHeight: '500px' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Samarth Bharat Facebook Feed"
                  className="w-full h-[500px]"
                />
              </div>

              {/* 2. Yearly Reports */}
              <div className="pt-2">
                <h4
                  className="text-[24px] font-semibold text-[#B80505] leading-tight m-0 mb-3"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Yearly Reports
                </h4>
                <ul className="space-y-1.5 p-0 m-0 list-none">
                  {yearlyReports.map((report) => (
                    <li key={report.label} className="elementor-icon-list-item">
                      <a
                        href={report.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2.5 font-['Poppins',sans-serif] text-[16px] font-normal text-[#001C5C] hover:text-[#F87902] transition-colors py-0.5 group leading-normal"
                      >
                        <svg
                          aria-hidden="true"
                          className="w-2.5 h-3.5 fill-[#001C5C] group-hover:fill-[#F87902] transition-colors shrink-0 mt-1"
                          viewBox="0 0 256 512"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
                        </svg>
                        <span className="elementor-icon-list-text">{report.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Monthly Reports */}
              <div className="pt-3">
                <h4
                  className="text-[24px] font-semibold text-[#B80505] leading-tight m-0 mb-3"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Monthly Reports
                </h4>
                <ul className="space-y-1.5 p-0 m-0 list-none max-h-[620px] overflow-y-auto pr-2 custom-scrollbar">
                  {monthlyReports.map((report, idx) => {
                    if (report.isYearHeader) {
                      return (
                        <li key={`year-${report.label}-${idx}`} className="pt-3 pb-1">
                          <a
                            href={report.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-['Poppins',sans-serif] font-bold text-[16px] text-[#001C5C] hover:text-[#F87902] transition-colors block"
                          >
                            <b>{report.label}</b>
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li key={`report-${report.label}-${idx}`} className="elementor-icon-list-item">
                        <a
                          href={report.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2.5 font-['Poppins',sans-serif] text-[16px] font-normal text-[#001C5C] hover:text-[#F87902] transition-colors py-0.5 group leading-normal"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-2.5 h-3.5 fill-[#001C5C] group-hover:fill-[#F87902] transition-colors shrink-0 mt-1"
                            viewBox="0 0 256 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
                          </svg>
                          <span className="elementor-icon-list-text">{report.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
