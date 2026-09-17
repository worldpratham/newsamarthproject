import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import { events, reports } from '@/data/content';

export default function Events() {
  return (
    <div>
      <PageBanner
        title="Events"
        subtitle="Capturing Every Moment of Change – Our Events, Your Inspiration!"
        bgImage="https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Events List */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <div className="max-w-4xl mx-auto space-y-8">
            {events.map((event) => (
              <article
                key={event.slug}
                className="group bg-white rounded-2xl overflow-hidden border border-dark-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  <div className="relative h-56 md:h-full overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-center gap-2 text-sm text-dark-400 mb-3">
                      <Calendar size={16} className="text-primary-500" />
                      <span>{event.dateFormatted}</span>
                      <span className="text-dark-300">|</span>
                      <span>No Comments</span>
                    </div>
                    <h3 className="text-lg font-bold text-dark-800 mb-3 group-hover:text-primary-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-dark-500 text-sm leading-relaxed mb-4 line-clamp-4">{event.excerpt}</p>
                    <Link
                      to={`/events/${event.slug}`}
                      className="inline-flex items-center gap-1.5 text-primary-600 font-medium text-sm hover:gap-2.5 transition-all"
                    >
                      Read More
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-16 bg-dark-50">
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="section-title flex items-center justify-center gap-3">
              <FileText size={32} className="text-primary-600" />
              Reports
            </h2>
            <p className="section-subtitle">Access our yearly and monthly reports to track our progress</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Yearly Reports */}
            <div className="bg-white rounded-2xl p-6 border border-dark-100">
              <h3 className="text-lg font-bold text-dark-800 mb-4">Yearly Reports</h3>
              <ul className="space-y-2">
                {reports.yearly.map((report) => (
                  <li key={report.label}>
                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-dark-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <FileText size={16} className="text-primary-500 shrink-0" />
                      {report.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Monthly Reports */}
            <div className="bg-white rounded-2xl p-6 border border-dark-100">
              <h3 className="text-lg font-bold text-dark-800 mb-4">Monthly Reports</h3>
              <ul className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {reports.monthly.map((report) => (
                  <li key={report.label}>
                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-dark-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <FileText size={16} className="text-primary-500 shrink-0" />
                      {report.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
