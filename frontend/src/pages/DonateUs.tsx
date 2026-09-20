import { useState } from 'react';
import { HandHeart, CheckCircle2, Send, Phone, Mail } from 'lucide-react';
import PageBanner from '@/components/PageBanner';

export default function DonateUs() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    amount: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', organization: '', amount: '', message: '' });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <PageBanner
        title="Donate Us"
        subtitle="Empower Dreams, Uplift Lives – Your Donation Makes It Possible!"
        bgImage="https://images.pexels.com/photos/7345444/pexels-photo-7345444.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
      />

      {/* Intro Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-6">
              <HandHeart size={32} />
            </div>
            <h2 className="section-title">Invest In People, Fuel Their Journey From Learning To Livelihood</h2>
            <p className="text-dark-500 leading-relaxed mb-4">
              Every individual deserves the opportunity to grow, work with dignity, and support their family. Your donation helps provide skill-based training and employment pathways to hardworking individuals striving for a better future.
            </p>
            <p className="text-dark-500 leading-relaxed">
              With your support, we equip them with the tools and guidance they need to stand on their feet. Our doors are always open to more people who want to support each other!
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '12,000+', label: 'Lives Transformed' },
              { value: '27+', label: 'Training Centers' },
              { value: '12+', label: 'Courses Offered' },
              { value: '15+', label: 'Corporate Partners' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-secondary-400 mb-1">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-16 md:py-20 bg-dark-50">
        <div className="container-page">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-5 sm:p-8 shadow-lg border border-dark-100">
            <h2 className="text-2xl font-bold text-dark-800 mb-2 text-center">Please Fill the Information Below</h2>
            <p className="text-dark-500 text-sm text-center mb-8">About yourself and your Company/Organisation</p>

            {submitted && (
              <div className="mb-6 bg-success-50 border border-success-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
                <CheckCircle2 size={24} className="text-success-600 shrink-0" />
                <p className="text-success-700 text-sm font-medium">Thank you for your interest! We will contact you soon.</p>
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
                  <label htmlFor="phone" className="block text-sm font-medium text-dark-700 mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-base sm:text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-dark-700 mb-1.5">Company/Organisation</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-base sm:text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                    placeholder="Company/Organisation name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-dark-700 mb-1.5">Donation Amount (INR)</label>
                <select
                  id="amount"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-base sm:text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all bg-white"
                >
                  <option value="">Select amount</option>
                  <option value="1000">₹1,000</option>
                  <option value="5000">₹5,000</option>
                  <option value="10000">₹10,000</option>
                  <option value="25000">₹25,000</option>
                  <option value="50000">₹50,000</option>
                  <option value="custom">Custom Amount</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark-700 mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-dark-200 text-dark-800 text-base sm:text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                  placeholder="Any message you'd like to share..."
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                <Send size={18} className="mr-2" />
                Submit Donation Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-white">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-dark-800 mb-4">Get In Touch</h3>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="tel:8595887700" className="flex items-center gap-2 text-dark-600 hover:text-primary-600 transition-colors">
                <Phone size={18} className="text-primary-500" />
                <span className="font-medium">Help Line:</span> 8595887700
              </a>
              <a href="mailto:contact@samarthbharat.net" className="flex items-center gap-2 text-dark-600 hover:text-primary-600 transition-colors">
                <Mail size={18} className="text-primary-500" />
                contact@samarthbharat.net
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
