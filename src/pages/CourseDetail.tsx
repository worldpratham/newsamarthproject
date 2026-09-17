import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Clock, Award, Globe, CheckCircle2, GraduationCap, Briefcase, BookOpen } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import { courses } from '@/data/content';

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-dark-800 mb-4">Course Not Found</h2>
        <Link to="/courses" className="text-primary-600 font-medium hover:underline">Back to All Courses</Link>
      </div>
    );
  }

  return (
    <div>
      <PageBanner title={course.title} subtitle="Practical Training for Real-World Careers" bgImage={course.image} />

      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
                <img src={course.image} alt={course.title} className="w-full h-[350px] object-cover" />
              </div>

              <h2 className="text-2xl font-bold text-dark-800 mb-4">Course Overview</h2>
              <p className="text-dark-500 leading-relaxed mb-8">{course.description}</p>

              <h3 className="text-xl font-bold text-dark-800 mb-4 flex items-center gap-2">
                <BookOpen size={22} className="text-primary-600" />
                Course Modules
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {course.modules.map((module, i) => (
                  <div key={i} className="flex items-start gap-3 bg-dark-50 rounded-xl p-4">
                    <span className="w-7 h-7 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-dark-600 text-sm pt-0.5">{module}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold text-dark-800 mb-4 flex items-center gap-2">
                <Briefcase size={22} className="text-primary-600" />
                Career Opportunities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.careerOpportunities.map((career, i) => (
                  <div key={i} className="flex items-center gap-3 bg-success-50 rounded-xl p-4">
                    <CheckCircle2 size={20} className="text-success-600 shrink-0" />
                    <span className="text-dark-700 text-sm font-medium">{career}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-dark-50 rounded-2xl p-6 sticky top-24">
                <h3 className="text-lg font-bold text-dark-800 mb-5">Course Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-dark-200">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                      <Globe size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-dark-400">Language</p>
                      <p className="text-sm font-medium text-dark-700">{course.language}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pb-3 border-b border-dark-200">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-dark-400">Duration</p>
                      <p className="text-sm font-medium text-dark-700">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pb-3 border-b border-dark-200">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                      <Award size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-dark-400">Certification</p>
                      <p className="text-sm font-medium text-dark-700">{course.certification}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-dark-400">Eligibility</p>
                      <p className="text-sm font-medium text-dark-700">{course.eligibility}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-dark-200">
                  <Link to="/contact-us" className="btn-primary w-full justify-center">
                    Enroll Now
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                  <Link to="/donate-us" className="btn-outline w-full justify-center mt-3">
                    Support Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Courses */}
      <section className="py-12 bg-dark-50">
        <div className="container-page">
          <h3 className="text-xl font-bold text-dark-800 mb-6">Other Courses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                to={`/courses/${c.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-dark-100 hover:shadow-lg transition-all"
              >
                <div className="h-32 overflow-hidden">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-dark-800 group-hover:text-primary-600 transition-colors">{c.title}</h4>
                  <p className="text-xs text-dark-400 mt-1">{c.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
