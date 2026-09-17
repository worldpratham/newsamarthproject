import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <PageBanner
        title="Contact Us"
        subtitle="Start Your Future at Samarth Bharat"
        bgImage="https://images.pexels.com/photos/5499557/pexels-photo-5499557.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Join Us Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">Join Us</h2>
            <p className="text-dark-500 leading-relaxed">
              At Samarth Bharat, we recognize that people are the cornerstone of our success and that their contributions, intellect and creative ability make us what we are. We provide a supportive and responsive work environment that promotes initiative, hard work, team-spirit and a passion for excellence.
            </p>
            <p className="text-dark-500 leading-relaxed mt-4">
              If you seek challenges and inspiration, and share our goals and vision, you would find ample opportunities of career growth with us. To explore career opportunities at SB, email your detailed resume to us at{' '}
              <a href="mailto:contact@samarthbharat.net" className="text-primary-600 font-medium hover:underline">contact@samarthbharat.net</a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-16 bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-dark-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center mx-auto mb-4">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-dark-800 mb-1">Help Line</h3>
              <a href="tel:8595887700" className="text-primary-600 font-medium hover:underline">8595887700</a>
            </div>
            <div className="bg-dark-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-secondary-500 text-white flex items-center justify-center mx-auto mb-4">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-dark-800 mb-1">Email</h3>
              <a href="mailto:contact@samarthbharat.net" className="text-primary-600 font-medium hover:underline break-all">contact@samarthbharat.net</a>
            </div>
            <div className="bg-dark-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-accent-600 text-white flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-dark-800 mb-1">Lucknow Head Office</h3>
              <p className="text-dark-500 text-sm">C-91, Nirala Nagar, Lucknow, U.P.-226020</p>
            </div>
            <div className="bg-dark-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-success-600 text-white flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-dark-800 mb-1">Delhi Office</h3>
              <p className="text-dark-500 text-sm">Office No. 415-416, Fourth Floor, Tower A, Plot No. 4B, District Center, Mayur Vihar Phase 1 Extension, New Delhi, 110091</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-dark-50">
        <div className="container-page">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-dark-100">
            <h2 className="text-2xl font-bold text-dark-800 mb-2 text-center">Send Us a Message</h2>
            <p className="text-dark-500 text-sm text-center mb-8">We'd love to hear from you. Fill out the form below and we'll get back to you soon.</p>

            {submitted && (
              <div className="mb-6 bg-success-50 border border-success-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
                <CheckCircle2 size={24} className="text-success-600 shrink-0" />
                <p className="text-success-700 text-sm font-medium">Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-1.5">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark-700 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark-700 mb-1.5">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                    placeholder="Subject"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-700 mb-1.5">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full justify-center"
              >
                <Send size={18} className="mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
