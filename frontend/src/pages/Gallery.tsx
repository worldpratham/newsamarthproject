import { useState, useEffect, useCallback } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryItems, GalleryItem } from '@/data/galleryData';

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Gallery - Samarth Bharat';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') {
        setSelectedIdx(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
      }
    },
    [selectedIdx]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openLightbox = (index: number) => {
    setSelectedIdx(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
    document.body.style.overflow = 'auto';
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
  };

  const activeItem: GalleryItem | null =
    selectedIdx !== null ? galleryItems[selectedIdx] : null;

  return (
    <div className="bg-white w-full overflow-x-hidden min-h-screen">
      {/* Hero Banner with exact purple-blue gradient matching WordPress elementor-element-51a1f26 */}
      <section
        className="w-full py-14 sm:py-16 md:py-20 text-center text-white overflow-hidden shadow-xs"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-[44px] font-extrabold leading-tight mb-3 tracking-wide">
            Success Gallery
          </h1>
          <p className="font-['Montserrat',sans-serif] text-white/95 text-sm sm:text-base md:text-[17px] max-w-3xl mx-auto font-normal">
            Capturing moments of skill learning, hands-on workshops, center inaugurations, and student celebrations across India.
          </p>
        </div>
      </section>

      {/* Main Gallery Masonry Grid matching WordPress elementor-element-f666794 */}
      <section className="w-full py-10 md:py-16 bg-white">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Photo Counter Bar */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
            <p className="font-['Montserrat',sans-serif] text-xs sm:text-sm font-semibold text-[#001C5C] uppercase tracking-wider">
              All Photographs ({galleryItems.length})
            </p>
            <span className="text-xs text-gray-500 font-['Montserrat',sans-serif]">
              Click on any photo to view full size
            </span>
          </div>

          {/* 4-Column Responsive Grid matching WordPress (columns: 4, gap: 14px) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] items-stretch">
            {galleryItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-[8px] overflow-hidden bg-gray-100 border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full h-64 sm:h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.wpImage;
                    }}
                  />

                  {/* Dark Translucent Hover Overlay matching WordPress elementor-gallery-item__overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    {/* Top Right Zoom Icon */}
                    <div className="self-end w-9 h-9 rounded-full bg-white/20 backdrop-blur-xs text-white flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn size={18} />
                    </div>

                    {/* Bottom Title Badge */}
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#F87902] text-white uppercase tracking-wider mb-1.5">
                        {item.category || 'Samarth Bharat'}
                      </span>
                      <h3 className="font-serif text-white font-bold text-sm sm:text-[15px] leading-snug drop-shadow-sm">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Full-Screen Modal */}
      {selectedIdx !== null && activeItem && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 select-none animate-fade-in"
        >
          {/* Top Bar: Counter & Close Button */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-50">
            <span className="font-['Montserrat',sans-serif] text-xs sm:text-sm font-semibold bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-xs">
              {selectedIdx + 1} of {galleryItems.length}
            </span>

            <button
              onClick={closeLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close image viewer"
            >
              <X size={22} />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={showPrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-[#F87902] text-white flex items-center justify-center transition-all cursor-pointer z-50 shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Main Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[92vw] max-h-[82vh] flex flex-col items-center justify-center"
          >
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-w-full max-h-[72vh] object-contain rounded-[8px] shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = activeItem.wpImage;
              }}
            />

            {/* Caption underneath */}
            <div className="mt-3 text-center px-4 max-w-xl">
              <h2 className="font-serif text-white font-bold text-base sm:text-lg">
                {activeItem.title}
              </h2>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={showNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-[#F87902] text-white flex items-center justify-center transition-all cursor-pointer z-50 shadow-md"
            aria-label="Next image"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </div>
  );
}
