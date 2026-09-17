import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import { events } from '@/data/content';

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-dark-800 mb-4">Event Not Found</h2>
        <Link to="/events" className="text-primary-600 font-medium hover:underline">Back to Events</Link>
      </div>
    );
  }

  return (
    <div>
      <PageBanner title="Events" subtitle="Capturing Every Moment of Change" bgImage={event.image} />

      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-dark-400 mb-4">
              <Calendar size={16} className="text-primary-500" />
              <span>{event.dateFormatted}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-dark-800 mb-6">{event.title}</h1>

            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
              <img src={event.image} alt={event.title} className="w-full h-[400px] object-cover" />
            </div>

            <div className="prose prose-lg max-w-none">
              {event.fullContent.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-dark-600 leading-relaxed mb-4">{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-dark-200">
              <Link to="/events" className="inline-flex items-center gap-2 text-primary-600 font-medium hover:gap-3 transition-all">
                <ArrowRight size={16} className="rotate-180" />
                Back to Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
