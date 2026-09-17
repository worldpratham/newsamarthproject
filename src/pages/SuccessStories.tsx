import PageBanner from '@/components/PageBanner';
import { successStories } from '@/data/content';
import { Quote } from 'lucide-react';

export default function SuccessStories() {
  return (
    <div>
      <PageBanner
        title="Success Stories"
        subtitle="Real journeys of our trainees who turned skills into strength, and dreams into reality."
        bgImage="https://images.pexels.com/photos/31381691/pexels-photo-31381691.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <div className="space-y-8">
            {successStories.map((story, index) => (
              <article
                key={index}
                className={`group bg-dark-50 rounded-2xl overflow-hidden border border-dark-100 hover:shadow-xl transition-all duration-300 ${
                  index % 2 === 0 ? '' : ''
                }`}
              >
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 to-transparent" />
                  </div>
                  <div className="md:col-span-2 p-6 md:p-8">
                    <Quote className="text-primary-300 mb-3" size={28} />
                    <h3 className="text-xl font-bold text-dark-800 mb-1">{story.name}</h3>
                    <p className="text-primary-600 text-sm font-medium mb-4">{story.role}</p>
                    <p className="text-dark-500 leading-relaxed text-sm">{story.fullStory}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
