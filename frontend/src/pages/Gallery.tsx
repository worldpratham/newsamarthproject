import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { getGalleryItems, GalleryApiModel } from '@/services/galleryApi';

export default function Gallery() {
  const [galleryList, setGalleryList] = useState<GalleryApiModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Gallery - Samarth Bharat';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let isMounted = true;
    async function fetchGallery() {
      try {
        setLoading(true);
        console.log('[Gallery Page] Fetching dynamic gallery items from API...');
        const data = await getGalleryItems();
        if (isMounted) {
          setGalleryList(data);
        }
      } catch (err) {
        console.error('[Gallery Page] Error loading gallery items:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchGallery();
    return () => {
      isMounted = false;
    };
  }, []);

  // Keyboard navigation for Lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Escape') {
        setSelectedIdx(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev !== null && prev < galleryList.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryList.length - 1));
      }
    },
    [selectedIdx, galleryList.length]
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
    setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryList.length - 1));
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev !== null && prev < galleryList.length - 1 ? prev + 1 : 0));
  };

  const activeItem: GalleryApiModel | null =
    selectedIdx !== null ? galleryList[selectedIdx] : null;

  return (
    <div className="bg-white w-full overflow-x-hidden min-h-screen">
      {/* WordPress Elementor Section 51a1f26: Title Banner */}
      <section
        className="w-full flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
          minHeight: '200px',
        }}
      >
        <div className="max-w-[1450px] mx-auto px-4 py-8">
          <h2
            className="text-white text-center font-serif text-2xl sm:text-3xl md:text-[40px] leading-tight font-[800]"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
            }}
          >
            Training Centers Pictures
          </h2>
        </div>
      </section>

      {/* WordPress Elementor Section f666794: Gallery Section */}
      <section className="w-full py-8 sm:py-10 md:py-12 bg-white">
        <div className="max-w-[1450px] mx-auto px-3 sm:px-5 lg:px-6">
          {loading ? (
            <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
              <Loader2 size={36} className="animate-spin text-[#F87902]" />
              <p className="text-slate-500 text-sm font-['Montserrat',sans-serif]">Loading gallery...</p>
            </div>
          ) : galleryList.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">
              No gallery images found.
            </div>
          ) : (
            /* Masonry Layout matching WordPress elementor-widget-gallery (columns: 4, gap: 14px) */
            <div className="columns-1 sm:columns-2 lg:columns-4 gap-[10px] sm:gap-[14px]">
              {galleryList.map((item, idx) => (
                <div
                  key={item._id || item.id || idx}
                  onClick={() => openLightbox(idx)}
                  className="break-inside-avoid mb-[10px] sm:mb-[14px] cursor-pointer group"
                >
                  <div className="relative overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-auto block object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        if (item.wpImage && (e.target as HTMLImageElement).src !== item.wpImage) {
                          (e.target as HTMLImageElement).src = item.wpImage;
                        }
                      }}
                    />
                    {/* Elementor Gallery Item Overlay (fade-in, bg-black/50, transition duration 800ms) */}
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-colors duration-700 ease-in-out pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Elementor Lightbox Modal */}
      {selectedIdx !== null && activeItem && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-between p-3 sm:p-6 select-none animate-fadeIn"
        >
          {/* Header Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[1450px] flex items-center justify-between text-white py-2 px-3 z-50"
          >
            <span className="font-['Montserrat',sans-serif] text-xs sm:text-sm font-medium tracking-wide text-white/80">
              {selectedIdx + 1} / {galleryList.length}
            </span>

            <button
              onClick={closeLightbox}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={26} />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={showPrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer z-50"
            aria-label="Previous image"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Center Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex flex-col items-center justify-center max-w-[92vw] max-h-[80vh] my-auto"
          >
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-w-full max-h-[75vh] object-contain shadow-2xl"
              onError={(e) => {
                if (activeItem.wpImage && (e.target as HTMLImageElement).src !== activeItem.wpImage) {
                  (e.target as HTMLImageElement).src = activeItem.wpImage;
                }
              }}
            />
            {/* Title / Caption */}
            {activeItem.title && (
              <p
                className="mt-3 text-white/90 text-center text-sm sm:text-base font-serif px-4 max-w-3xl"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {activeItem.title}
              </p>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={showNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer z-50"
            aria-label="Next image"
          >
            <ChevronRight size={36} />
          </button>

          {/* Footer spacer */}
          <div className="h-4" />
        </div>
      )}
    </div>
  );
}
