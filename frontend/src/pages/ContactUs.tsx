import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  // Phone: strictly numbers only, max 10 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm((prev) => ({ ...prev, phone: onlyDigits }));
    if (error) setError(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate phone number: must be 10 digits
    if (!form.phone || form.phone.length !== 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email.trim())) {
      setError('Please provide a valid email address (e.g., name@domain.com).');
      return;
    }

    try {
      setLoading(true);
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
      const primaryUrl = `${baseUrl}/api/contacts`;

      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      };

      let response: Response;
      try {
        response = await fetch(primaryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        response = await fetch('http://localhost:5000/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Server error while submitting message');
      }

      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 6000);
    } catch (err: any) {
      setError(err.message || 'Unable to send message. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
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
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-5 sm:p-8 shadow-lg border border-dark-100">
            <h2 className="text-2xl font-bold text-dark-800 mb-2 text-center">Send Us a Message</h2>
            <p className="text-dark-500 text-sm text-center mb-8">We'd love to hear from you. Fill out the form below and we'll get back to you soon.</p>

            {submitted && (
              <div className="mb-6 bg-success-50 border border-success-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
                <CheckCircle2 size={24} className="text-success-600 shrink-0" />
                <p className="text-success-700 text-sm font-medium">Thank you! Your message has been sent successfully. Our team will contact you shortly.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                <span>{error}</span>
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
                    className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-base sm:text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
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
                    className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-base sm:text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dark-700 mb-1.5">
                    Phone (10 Digits Only) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      id="phone"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-base sm:text-sm font-mono focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                      placeholder="9876543210"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Only numbers allowed</span>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark-700 mb-1.5">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-base sm:text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                    placeholder="e.g. Course Inquiry / Partnership"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-700 mb-1.5">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-base sm:text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
