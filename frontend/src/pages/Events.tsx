import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import {
  EventItem,
  yearlyReports,
  monthlyReports,
  wpEventsData,
} from '@/data/eventsData';
import { getPosts, PostApiModel } from '@/services/courseApi';

// Fallback images map for clean fallback
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

// Exact Elementor SVG Arrow for icon list
function AngleRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-2.5 h-3.5 fill-[#001C5C] group-hover:fill-[#F87902] transition-colors shrink-0 mt-1"
      viewBox="0 0 256 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
    </svg>
  );
}

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>(wpEventsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Events - Samarth Bharat';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchEvents() {
      try {
        setLoading(true);
        console.log(`[Events Page] Fetching posts from API: page=${currentPage}&limit=6`);
        const res = await getPosts(currentPage, 6);

        if (isMounted && res.success && res.data && res.data.length > 0) {
          const mapped: EventItem[] = res.data.map((p: PostApiModel, idx: number) => {
            const cleanSlug = (p.slug || '').trim();
            const fallbackLocal = LOCAL_EVENT_IMAGES[cleanSlug] || '/events/workshop-report.png';

            let formattedDate = '';
            if (p.date) {
              const d = new Date(p.date);
              formattedDate = d.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              });
            }

            const cleanExcerpt = (p.excerpt || p.content || '')
              .replace(/<[^>]+>/g, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/&#8220;|&#8221;/g, '"')
              .replace(/&#8217;/g, "'")
              .replace(/\s+/g, ' ')
              .trim();

            return {
              id: p._id || p.id || idx + 1,
              slug: cleanSlug,
              title: p.title,
              date: p.date,
              dateFormatted: formattedDate || 'March 7, 2026',
              image: p.imageUrl || fallbackLocal,
              fallbackImage: fallbackLocal,
              wpImage: p.imageUrl || '',
              excerpt: cleanExcerpt,
              fullContent: p.content,
            };
          });

          setEvents(mapped);
          setTotalPages(res.pages || 1);
        } else if (isMounted) {
          setEvents(wpEventsData);
          setTotalPages(1);
        }
      } catch (err) {
        console.warn('[Events Page] API error, using static fallback:', err);
        if (isMounted) {
          setEvents(wpEventsData);
          setTotalPages(1);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchEvents();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] font-sans antialiased text-[#333333]">
      {/* 1. Elementor Gradient Banner Section (matches elementor-element-6162515) */}
      <section
        className="w-full py-12 md:py-16 text-center relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Heading 2 in Times New Roman 800 weight */}
          <h2
            className="text-white text-3xl sm:text-4xl md:text-[40px] font-extrabold tracking-tight m-0"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            Events
          </h2>

          {/* Heading 5 Subtitle in Montserrat font 400 weight */}
          <h5 className="font-['Montserrat',sans-serif] text-white text-base sm:text-lg font-normal mt-2.5 max-w-3xl mx-auto leading-relaxed opacity-95 m-0">
            Capturing Every Moment of Change – Our Events, Your Inspiration!
          </h5>
        </div>
      </section>

      {/* 2. Main Elementor Layout: 2-Column Section (matches elementor-inner-section elementor-element-8c95afe) */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
          {/* LEFT COLUMN: 70% Width (matches elementor-element-043966a) */}
          <div className="w-full lg:w-[70%] lg:pr-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="animate-spin text-[#004AAD]" size={36} />
                <p className="text-gray-500 font-['Montserrat',sans-serif] text-sm">
                  Loading events...
                </p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-lg p-8 border border-gray-200">
                <p className="text-gray-600 font-['Montserrat',sans-serif]">
                  No events found at this moment.
                </p>
              </div>
            ) : (
              <div>
                {/* 2-Column Responsive Card Grid (matches elementor-grid-2 / elementor-posts--skin-cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[18px] gap-y-[40px]">
                  {events.map((event) => {
                    const targetSlug = event.slug.startsWith('/') ? event.slug : `/events/${event.slug}`;
                    const fallbackImg =
                      LOCAL_EVENT_IMAGES[event.slug] || event.fallbackImage || '/events/workshop-report.png';

                    return (
                      <article
                        key={event.id || event.slug}
                        className="elementor-post elementor-grid-item"
                      >
                        {/* Card Outer Container (matches .elementor-post__card: border #CACACA 1px, radius 8px, shadow) */}
                        <div
                          className="bg-white rounded-[8px] border border-[#CACACA] overflow-hidden flex flex-col justify-between h-full transition-shadow duration-300 hover:shadow-[0_0_15px_0_rgba(0,0,0,0.18)]"
                          style={{
                            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.12)',
                          }}
                        >
                          {/* Top: Thumbnail Link (matches .elementor-post__thumbnail: 66% ratio) */}
                          <div>
                            <Link
                              to={targetSlug}
                              className="block relative w-full pt-[66%] overflow-hidden bg-[#F3F4F6] group"
                              tabIndex={-1}
                            >
                              <img
                                decoding="async"
                                src={event.image}
                                alt={event.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = fallbackImg;
                                }}
                              />
                            </Link>

                            {/* Post Text Container (matches .elementor-post__text: padding 16px 12px) */}
                            <div className="p-[16px_12px_10px_12px]">
                              {/* Title (matches .elementor-post__title: Times New Roman 1.2em / ~19px font-weight 800 color #001C5C) */}
                              <h3
                                className="text-[19px] sm:text-[20px] font-extrabold leading-[1.3] mb-3"
                                style={{
                                  fontFamily: '"Times New Roman", Times, serif',
                                }}
                              >
                                <Link
                                  to={targetSlug}
                                  className="text-[#001C5C] hover:text-[#F87902] transition-colors line-clamp-2"
                                  title={event.title}
                                >
                                  {event.title}
                                </Link>
                              </h3>

                              {/* Excerpt (matches .elementor-post__excerpt: Montserrat 15px font-weight 400 color #555555) */}
                              <div className="mb-2.5">
                                <p className="font-['Montserrat',sans-serif] text-[15px] font-normal text-[#555555] leading-[1.6] line-clamp-4 m-0">
                                  {event.excerpt}
                                </p>
                              </div>

                              {/* Read More Link (matches .elementor-post__read-more: Montserrat 14px font-weight 600 color #F87902) */}
                              <div>
                                <Link
                                  to={targetSlug}
                                  className="font-['Montserrat',sans-serif] text-[14px] font-semibold text-[#F87902] hover:text-[#d96600] inline-block transition-colors"
                                >
                                  Read More »
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* Post Meta Data Bar (matches .elementor-post__meta-data: border-top #CACACA, Montserrat 14px 700 #001C5C) */}
                          <div className="border-t border-[#CACACA] p-[10px_12px] flex items-center justify-between text-[14px] font-['Montserrat',sans-serif] font-bold text-[#001C5C]">
                            <span className="elementor-post-date">{event.dateFormatted}</span>
                            <span className="elementor-post-avatar text-gray-500 font-medium">
                              No Comments
                            </span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* Elementor Pagination (matches .elementor-817 .elementor-pagination: margin-top 4em text-center) */}
                <nav
                  className="elementor-pagination flex items-center justify-center gap-3 mt-14 pt-4"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`font-['Montserrat',sans-serif] text-[15px] font-bold transition-colors ${
                      currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-[#001C5C] hover:text-[#F87902] cursor-pointer'
                    }`}
                  >
                    &laquo; Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-8 h-8 rounded text-sm font-['Montserrat',sans-serif] font-bold transition-colors ${
                        currentPage === p
                          ? 'bg-[#001C5C] text-white'
                          : 'text-[#001C5C] hover:bg-orange-50 hover:text-[#F87902]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`font-['Montserrat',sans-serif] text-[15px] font-bold transition-colors ${
                      currentPage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-[#001C5C] hover:text-[#F87902] cursor-pointer'
                    }`}
                  >
                    Next &raquo;
                  </button>
                </nav>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: 30% Width Sidebar (matches elementor-element-99df191) */}
          <div className="w-full lg:w-[30%]">
            <div className="space-y-6">
              {/* 1. Facebook Page Embed Box (matches elementor-element-c9d0e6a) */}
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

              {/* 2. Yearly Reports (matches elementor-element-db11c58 & 6b41645) */}
              <div className="pt-2">
                {/* Heading in Times New Roman 1.5em font-weight 600 color #B80505 */}
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
                        <AngleRightIcon />
                        <span className="elementor-icon-list-text">{report.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Monthly Reports (matches elementor-element-d2256e9 & 37197d3) */}
              <div className="pt-3">
                {/* Heading in Times New Roman 1.5em font-weight 600 color #B80505 */}
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
                          <AngleRightIcon />
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
