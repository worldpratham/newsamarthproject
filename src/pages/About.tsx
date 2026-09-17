import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Award, Briefcase, Target, Eye, Users, Heart } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

export default function About() {
  return (
    <div>
      <PageBanner
        title="About Us"
        subtitle="Building the Next Growth Story for India"
        bgImage="https://images.pexels.com/photos/34212681/pexels-photo-34212681.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Intro Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/33925031/pexels-photo-33925031.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Skill training"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="section-title text-left">What is Samarth Bharat?</h2>
              <p className="text-dark-500 leading-relaxed mb-4">
                Samarth Bharat is an organization which gives free training to the privileged and unprivileged Indians to promote skill-development among them, so that they can become confident and self-reliant. This can help them getting jobs and will ultimately lead to employment generation in the country.
              </p>
              <p className="text-dark-500 leading-relaxed mb-4">
                Our aim is to reach out to weaker and unprivileged persons of the society and to propagate aspirational values among youth to build capacity for skill development across formal and informal sectors.
              </p>
              <p className="text-dark-500 leading-relaxed">
                Samarth Bharat embodies a diverse approach to national development through various Skill Development Programs and Career Development Centers (CDCs). The Skill Development Program aims to empower vulnerable and marginalized communities by providing them with essential skills needed for active workforce participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-20 bg-dark-50">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-dark-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white mb-5">
                <Target size={26} />
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">Our Mission</h3>
              <p className="text-dark-500 leading-relaxed text-sm">
                To reach out to weaker and unprivileged persons of the society and to propagate aspirational values among youth to build capacity for skill development across formal and informal sectors. We aim to empower vulnerable and marginalized communities by providing them with essential skills needed for active workforce participation.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-dark-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center text-white mb-5">
                <Eye size={26} />
              </div>
              <h3 className="text-xl font-bold text-dark-800 mb-3">Our Vision</h3>
              <p className="text-dark-500 leading-relaxed text-sm">
                To build a self-sufficient and resilient workforce under the vision of Atmanirbhar Bharat. We envision a nation where every individual has the skills, confidence, and opportunity to earn a dignified livelihood and contribute to India's growth story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: GraduationCap, title: 'Skill Development', description: 'Industry-relevant training programs with practical knowledge and hands-on experience.' },
              { icon: Award, title: 'Certification', description: 'Recognized certificates that validate skills and boost career prospects.' },
              { icon: Briefcase, title: 'Livelihood', description: 'Sustainable income avenues through employment, self-employment and entrepreneurship.' },
              { icon: Users, title: 'Community Empowerment', description: 'Empowering vulnerable and marginalized communities for active workforce participation.' },
              { icon: Heart, title: 'Free Training', description: 'Free training to privileged and unprivileged Indians to promote self-reliance.' },
              { icon: Target, title: 'Market-Driven', description: 'A market-driven approach to build a self-sufficient and resilient workforce.' },
            ].map((value, i) => (
              <div key={i} className="group bg-dark-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-dark-100">
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <value.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-dark-800 mb-2">{value.title}</h3>
                <p className="text-dark-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white text-center">
        <div className="container-page">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Be a part of the change. Support skill development and help transform lives across India.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/donate-us" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary-600 font-semibold rounded-lg hover:bg-dark-50 transition-all duration-300 hover:shadow-xl">
              Donate Now
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact-us" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
