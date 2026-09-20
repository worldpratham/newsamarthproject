import { useEffect, useState } from 'react';
import { getStories, StoryItem } from '@/services/storyApi';
import { Loader2, RefreshCw, AlertCircle } from 'lucide-react';

const localFallbacks: Record<number, string> = {
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

function StoryCard({ story, globalIndex }: { story: StoryItem; globalIndex: number }) {
  const fallbackImg = localFallbacks[globalIndex + 1] || '/stories/story-1.jpg';
  const initialImg = story.imageUrl || story.image || fallbackImg;
  const [imgSrc, setImgSrc] = useState(initialImg);

  const storyContent = story.storyText || story.story || '';

  return (
    <div className="w-full p-4 sm:p-5 rounded-[10px] border border-[#F87902] bg-white transition-all duration-300 hover:shadow-md flex flex-col sm:flex-row items-start gap-4 sm:gap-5 overflow-hidden box-border">
      {/* Image on left */}
      <div className="w-full sm:w-[130px] md:w-[140px] lg:w-[130px] xl:w-[140px] shrink-0 mx-auto sm:mx-0 flex justify-center sm:justify-start">
        <img
          src={imgSrc}
          alt={story.name}
          className="w-32 h-32 sm:w-full sm:h-auto aspect-square object-cover rounded-[8px]"
          onError={() => {
            if (imgSrc !== fallbackImg) {
              setImgSrc(fallbackImg);
            }
          }}
        />
      </div>

      {/* Content on right */}
      <div className="flex-1 min-w-0 w-full">
        <h3 className="font-serif text-[#001C5C] text-xl sm:text-[22px] font-bold leading-tight mb-0.5 break-words">
          {story.name}
        </h3>
        <p className="font-['Montserrat',sans-serif] text-[#F87902] text-sm font-semibold mb-2 break-words">
          {story.role}
        </p>
        <p className="font-['Montserrat',sans-serif] text-[#111111] text-[13.5px] leading-[1.75] text-justify break-words">
          {storyContent}
        </p>
      </div>
    </div>
  );
}

function StoryCardSkeleton() {
  return (
    <div className="w-full p-4 sm:p-5 rounded-[10px] border border-gray-200 bg-white flex flex-col sm:flex-row items-start gap-4 sm:gap-5 overflow-hidden box-border animate-pulse">
      <div className="w-32 h-32 sm:w-[130px] md:w-[140px] shrink-0 mx-auto sm:mx-0 bg-gray-200 rounded-[8px]" />
      <div className="flex-1 min-w-0 w-full space-y-3">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-orange-100 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-11/12" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}

export default function SuccessStories() {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStoriesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStories();
      setStories(data);
    } catch (err: any) {
      console.error('Error fetching stories:', err);
      setError(err?.message || 'Failed to load success stories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Success Stories - Samarth Bharat';
    fetchStoriesData();
  }, []);

  // Split stories dynamically into two balanced columns matching WordPress layout
  const half = Math.ceil(stories.length / 2);
  const column1 = stories.slice(0, half);
  const column2 = stories.slice(half);

  return (
    <div className="bg-white w-full overflow-x-hidden">
      {/* Hero Banner with exact purple-blue gradient matching WordPress */}
      <section
        className="w-full py-14 sm:py-16 md:py-20 text-center text-white overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-tight mb-3">
            Success Stories
          </h1>
          <p className="font-['Montserrat',sans-serif] text-white/95 text-sm sm:text-base md:text-[17px] max-w-3xl mx-auto font-normal">
            Real journeys of our trainees who turned skills into strength, and dreams into reality.
          </p>
        </div>
      </section>

      {/* Main Content: 2-Column Grid matching WordPress */}
      <section className="w-full py-10 md:py-16 bg-white overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="w-full">
              <div className="flex items-center justify-center gap-2 mb-8 text-[#001C5C] font-semibold text-base">
                <Loader2 className="w-5 h-5 animate-spin text-[#F87902]" />
                <span>Loading success stories from API...</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start w-full">
                <div className="flex flex-col gap-6 w-full min-w-0">
                  <StoryCardSkeleton />
                  <StoryCardSkeleton />
                  <StoryCardSkeleton />
                </div>
                <div className="flex flex-col gap-6 w-full min-w-0">
                  <StoryCardSkeleton />
                  <StoryCardSkeleton />
                  <StoryCardSkeleton />
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="max-w-xl mx-auto my-12 p-6 rounded-lg bg-red-50 border border-red-200 text-center">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-1">Failed to Load Stories</h3>
              <p className="text-sm text-gray-600 mb-4">{error}</p>
              <button
                onClick={fetchStoriesData}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F87902] text-white font-medium rounded-md hover:bg-[#e06d02] transition-colors shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Retry Loading
              </button>
            </div>
          )}

          {/* Loaded Grid */}
          {!loading && !error && stories.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start w-full">
              {/* Column 1 */}
              <div className="flex flex-col gap-6 w-full min-w-0">
                {column1.map((story, idx) => (
                  <StoryCard
                    key={story._id || story.id || `col1-${idx}`}
                    story={story}
                    globalIndex={idx}
                  />
                ))}
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-6 w-full min-w-0">
                {column2.map((story, idx) => (
                  <StoryCard
                    key={story._id || story.id || `col2-${idx}`}
                    story={story}
                    globalIndex={half + idx}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && stories.length === 0 && (
            <div className="text-center py-16 text-gray-500 font-['Montserrat',sans-serif]">
              No success stories found at this time.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
