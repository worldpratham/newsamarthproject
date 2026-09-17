import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Award, Globe, CheckCircle2 } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import { courses } from '@/data/content';

export default function Courses() {
  return (
    <div>
      <PageBanner
        title="Our Courses"
        subtitle="Practical Training for Real-World Careers"
        bgImage="https://images.pexels.com/photos/33986511/pexels-photo-33986511.png?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="section-title">Popular Training Programs</h2>
            <p className="section-subtitle">Industry-relevant courses designed to build practical skills and create livelihood opportunities</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.slug}
                className="group bg-white rounded-2xl overflow-hidden border border-dark-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-dark-700 flex items-center gap-1">
                      <Globe size={12} /> {course.language}
                    </span>
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-dark-700 flex items-center gap-1">
                      <Clock size={12} /> {course.duration}
                    </span>
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-dark-700 flex items-center gap-1">
                      <Award size={12} /> Certified
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-dark-800 mb-2 group-hover:text-primary-600 transition-colors">{course.title}</h3>
                  <p className="text-dark-500 text-sm leading-relaxed mb-4 line-clamp-3">{course.description}</p>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="inline-flex items-center gap-1.5 text-primary-600 font-medium text-sm hover:gap-2.5 transition-all"
                  >
                    Course Detail
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-dark-50">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Our Training?</h2>
            <p className="section-subtitle">We provide more than just training — we build pathways to dignified livelihoods</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Free Training', description: 'All our courses are provided free of cost to ensure accessibility for everyone.' },
              { title: 'Industry-Recognized Certification', description: 'Certificates from recognized bodies like KVIC validate your skills.' },
              { title: 'Hands-On Practice', description: 'Practical, real-world training that prepares you for actual job scenarios.' },
              { title: 'Placement Support', description: 'Job fairs and placement assistance to help you secure employment.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-dark-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  <CheckCircle2 size={22} />
                </div>
                <h3 className="font-bold text-dark-800 mb-2">{item.title}</h3>
                <p className="text-dark-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
