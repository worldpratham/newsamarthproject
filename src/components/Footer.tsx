import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ChevronRight,
} from 'lucide-react';
import { reports } from '@/data/content';

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-dark-300">
      {/* Main Footer */}
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold text-lg shrink-0">
                SB
              </div>
              <div>
                <h3 className="font-sans font-bold text-lg text-white">Samarth Bharat</h3>
                <p className="text-xs text-dark-400">Building the Next Growth Story</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Samarth Bharat is an organization which gives free training to the privileged and unprivileged Indians to promote skill-development, so that they can become confident and self-reliant.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/samarthbharatofficial" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://www.instagram.com/samarthbharatofficial/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://www.linkedin.com/company/samarthbharatofficial" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="https://www.youtube.com/@samarthbharatofficial" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-semibold text-white text-base mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Home</Link></li>
              <li><Link to="/about" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> About Us</Link></li>
              <li><Link to="/courses" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Courses</Link></li>
              <li><Link to="/events" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Events</Link></li>
              <li><Link to="/success-stories" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Success Stories</Link></li>
              <li><Link to="/donate-us" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Donate Us</Link></li>
              <li><Link to="/contact-us" className="flex items-center gap-2 hover:text-primary-400 transition-colors"><ChevronRight size={14} /> Contact Us</Link></li>
            </ul>
          </div>

          {/* Reports */}
          <div>
            <h4 className="font-sans font-semibold text-white text-base mb-4">Reports</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-dark-400 uppercase mb-2">Yearly Reports</p>
                <ul className="space-y-1.5 text-sm">
                  {reports.yearly.map((r) => (
                    <li key={r.label}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                        <ChevronRight size={14} /> {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-dark-400 uppercase mb-2">Monthly Reports</p>
                <ul className="space-y-1.5 text-sm max-h-32 overflow-y-auto pr-2">
                  {reports.monthly.slice(0, 8).map((r) => (
                    <li key={r.label}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                        <ChevronRight size={14} /> {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-white text-base mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:8595887700" className="flex items-start gap-3 hover:text-primary-400 transition-colors">
                  <Phone size={16} className="mt-0.5 shrink-0 text-primary-500" />
                  <div>
                    <p className="font-medium text-white">Help Line</p>
                    <p>8595887700</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:contact@samarthbharat.net" className="flex items-start gap-3 hover:text-primary-400 transition-colors">
                  <Mail size={16} className="mt-0.5 shrink-0 text-primary-500" />
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p>contact@samarthbharat.net</p>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary-500" />
                <div>
                  <p className="font-medium text-white">Lucknow Head Office</p>
                  <p>C-91, Nirala Nagar, Lucknow, U.P.-226020</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary-500" />
                <div>
                  <p className="font-medium text-white">Delhi Office</p>
                  <p>Office No. 415-416, Fourth Floor, Tower A, Plot No. 4B, District Center, Mayur Vihar Phase 1 Extension, New Delhi, 110091</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-800">
        <div className="container-page py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-dark-400">
          <p>&copy; {new Date().getFullYear()} Samarth Bharat. All Rights Reserved.</p>
          <p>Building the Next Growth Story for India</p>
        </div>
      </div>
    </footer>
  );
}
