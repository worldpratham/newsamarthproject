import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#001C5C] text-white overflow-hidden">
      {/* World Map Background Watermark */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage: "url('/world-map.jpg')",
        }}
      />

      {/* Main Footer Content */}
      <div className="container-page relative z-10 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Column 1: Logo, Description & Follow Us */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="mb-4 inline-block">
              <img
                src="/logo-white.png"
                alt="Samarth Bharat"
                className="h-16 sm:h-20 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://samarthbharat.net/wp-content/uploads/2025/05/SB-whiteLogo-e1747049459165.png';
                }}
              />
            </Link>

            <p className="text-white/85 text-xs sm:text-[13.5px] leading-relaxed mb-6 font-normal">
              SamarthBharat playing an instrumental role – bringing together all stakeholders – industry, labour and academia together to ensure that industry is served with skilled and efficient workforce
            </p>

            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-3">
                Follow Us
              </h3>
              <div className="flex items-center gap-4 text-white/90">
                <a
                  href="https://www.facebook.com/samarthbharatofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F87902] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.instagram.com/samarthbharatofficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F87902] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/company/samarthbharatofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F87902] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=8595887700&text=Hello,%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F87902] transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@samarthbharatofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F87902] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13.5px]">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Blogs', path: '/events' },
                { label: 'Contact Us', path: '/contact-us' },
                { label: 'Help & Support', path: '/contact-us' },
                { label: 'Refund & Cancellation Policy', path: '/about' },
                { label: 'Privacy Policy', path: '/about' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-white/90 hover:text-[#F87902] transition-colors group"
                  >
                    <span className="text-white/80 group-hover:text-[#F87902] font-bold text-sm select-none">
                      ›
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support us */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-4">
              Support Us
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-[13.5px] mb-6 w-full">
              {[
                { label: 'Contribute Online', path: '/donate-us' },
                { label: 'Corporate Partnership (CSR)', path: '/corporate-partnership' },
                { label: 'Volunteer', path: '/contact-us' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-white/90 hover:text-[#F87902] transition-colors group"
                  >
                    <span className="text-white/80 group-hover:text-[#F87902] font-bold text-sm select-none">
                      ›
                    </span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* <Link
              to="/donate-us"
              className="bg-[#F87902] hover:bg-[#e06c00] text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-none transition-colors shadow-sm inline-block"
            >
              DONATE US
            </Link> */}
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-4">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-4">
              Contact Us
            </h3>
            <div className="space-y-4 text-xs sm:text-[13.5px]">
              {/* Help Line */}
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#F87902] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white text-sm sm:text-[15px]">
                    Help Line
                  </h4>
                  <a
                    href="tel:8595887700"
                    className="text-white/90 hover:text-[#F87902] transition-colors font-sans tracking-wide"
                  >
                    8595887700
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#F87902] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white text-sm sm:text-[15px]">
                    Email
                  </h4>
                  <a
                    href="mailto:contact@samarthbharat.net"
                    className="text-white/90 hover:text-[#F87902] transition-colors"
                  >
                    contact@samarthbharat.net
                  </a>
                </div>
              </div>

              {/* Lucknow Head Office */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#F87902] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white text-sm sm:text-[15px]">
                    Lucknow Head Office
                  </h4>
                  <p className="text-white/80 leading-relaxed text-xs sm:text-[13px]">
                    C-91, Nirala Nagar, Lucknow, U.P.-226020
                  </p>
                </div>
              </div>

              {/* Delhi Office */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#F87902] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-white text-sm sm:text-[15px]">
                    Delhi Office
                  </h4>
                  <p className="text-white/80 leading-relaxed text-xs sm:text-[13px]">
                    Office No. 415-416, Fourth Floor, Tower A, Plot No. 4B, District Center, Mayur Vihar Phase 1 Extension, New Delhi, 110091
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Footer with Admin Portal link */}
      <div className="relative z-10 border-t border-white/10 bg-black/25 py-4 text-xs text-white/60">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Samarth Bharat (Bhaorao Deoras Seva Nyas). All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/contact-us" className="hover:text-[#F87902] transition-colors">Contact Support</Link>
            <span>•</span>
            <Link to="/admin/login" className="text-white/40 hover:text-amber-400 transition-colors inline-flex items-center gap-1">
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
