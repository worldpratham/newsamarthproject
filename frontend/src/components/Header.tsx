import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Clock,
  Mail,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Home,
} from 'lucide-react';

const aboutDropdownLinks = [
  { label: 'Bhaorao Deoras Seva Nyas', path: '/bhaorao-deoras-seva-nyas' },
  { label: 'Samarth Bharat Introduction', path: '/samarth-bharat-intro' },
  { label: 'Project Team', path: '/project-team' },
];

const successDropdownLinks = [
  { label: 'Success Stories', path: '/success-stories' },
  { label: 'Gallery', path: '/gallery' },
];

interface NavLinkItem {
  label: string;
  path: string;
  dropdown?: { label: string; path: string }[];
  isExternal?: boolean;
}

const navLinks: NavLinkItem[] = [
  { label: 'About Us', path: '/about', dropdown: aboutDropdownLinks },
  { label: 'Success Stories', path: '/success-stories', dropdown: successDropdownLinks },
  { label: 'Career Development Center', path: '/career-development-center' },
  { label: 'Community Training Programs', path: '/community-training-programs' },
  { label: 'Centres Details', path: '/centres-details' },
  { label: 'Training Center detail', path: '/training-center-detail' },
  { label: 'Events & Activities', path: '/events' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Bar (Dark Blue matching WordPress #001C5C) */}
      <div className="bg-[#001C5C] text-white text-xs hidden lg:block">
        <div className="container-page flex items-center justify-between py-2">
          {/* Left Info */}
          <div className="flex items-center gap-5">
            <Link to="/" className="text-white/80 hover:text-white transition-colors" title="Home">
              <Home size={14} />
            </Link>
            <a href="tel:8595887700" className="flex items-center gap-1.5 hover:text-orange-300 transition-colors">
              <Phone size={13} className="text-white/80" />
              <span>Help Line: 8595887700</span>
            </a>
            <span className="flex items-center gap-1.5 text-white/80">
              <Clock size={13} />
              <span>9:00 AM - 7:00 PM</span>
            </span>
            <a href="mailto:contact@samarthbharat.net" className="flex items-center gap-1.5 hover:text-orange-300 transition-colors">
              <Mail size={13} className="text-white/80" />
              <span>contact@samarthbharat.net</span>
            </a>
          </div>

          {/* Center Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/donate-us"
              className="bg-[#F87902] hover:bg-[#e06c00] text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-sm transition-colors shadow-sm"
            >
              DONATE US
            </Link>
            <Link
              to="/contact-us"
              className="bg-[#F87902] hover:bg-[#e06c00] text-white font-bold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-sm transition-colors shadow-sm"
            >
              CONTACT US
            </Link>
          </div>

          {/* Right Social Icons */}
          <div className="flex items-center gap-3 text-white/90">
            <a href="https://www.facebook.com/samarthbharatofficial" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="Facebook">
              <Facebook size={14} />
            </a>
            <a href="https://www.instagram.com/samarthbharatofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="Instagram">
              <Instagram size={14} />
            </a>
            <a href="https://www.linkedin.com/company/samarthbharatofficial" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="LinkedIn">
              <Linkedin size={14} />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=8595887700&text=Hello,%20" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="WhatsApp">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@samarthbharatofficial" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="YouTube">
              <Youtube size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
        <div className="container-page">
          <div className="flex items-center justify-between py-2 md:py-3">
            {/* Logo Image */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/logo.png"
                alt="Samarth Bharat - Bhaorao Deoras Seva Nyas"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain"
                onError={(e) => {
                  // Fallback if local image fails
                  (e.target as HTMLImageElement).src = 'https://samarthbharat.net/wp-content/uploads/2025/05/cropped-SB-Nyas-logo.png';
                }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                >
                  {link.isExternal ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 text-dark-700 hover:text-primary-600 text-[13.5px] font-medium transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : link.dropdown ? (
                    <button
                      type="button"
                      onClick={() => setActiveDropdown((prev) => (prev === link.label ? null : link.label))}
                      className={`flex items-center gap-1 px-3 py-2 text-[13.5px] font-medium transition-colors cursor-pointer ${
                        link.dropdown.some((d) => isActive(d.path)) || isActive(link.path)
                          ? 'text-primary-600'
                          : 'text-dark-700 hover:text-primary-600'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        className={`mt-0.5 opacity-70 transition-transform duration-200 ${
                          activeDropdown === link.label ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 px-3 py-2 text-[13.5px] font-medium transition-colors ${
                        isActive(link.path)
                          ? 'text-primary-600'
                          : 'text-dark-700 hover:text-primary-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-0 w-60 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-up">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.path}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-2.5 text-xs text-dark-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-dark-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 animate-fade-in shadow-xl max-h-[calc(100vh-72px)] overflow-y-auto">
            <nav className="container-page py-3 flex flex-col gap-1">
              {/* Mobile Quick Contact Strip */}
              <div className="bg-[#001C5C] text-white p-3 rounded-lg mb-2 flex items-center justify-between text-xs">
                <a
                  href="tel:8595887700"
                  className="flex items-center gap-1.5 hover:text-orange-300 transition-colors font-medium"
                >
                  <Phone size={13} className="text-[#F87902]" />
                  <span>8595887700</span>
                </a>
                <a
                  href="mailto:contact@samarthbharat.net"
                  className="flex items-center gap-1.5 hover:text-orange-300 transition-colors"
                >
                  <Mail size={13} className="text-[#F87902]" />
                  <span className="truncate max-w-[130px] sm:max-w-none">contact@samarthbharat.net</span>
                </a>
              </div>

              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-gray-50 last:border-b-0 pb-0.5">
                  {link.isExternal ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3.5 py-2.5 rounded-lg text-[14.5px] font-medium text-dark-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3.5 py-2.5 rounded-lg text-[14.5px] font-medium transition-colors ${
                        isActive(link.path)
                          ? 'text-[#F87902] bg-orange-50 font-semibold'
                          : 'text-dark-700 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                  {link.dropdown && (
                    <div className="ml-4 pl-3 border-l-2 border-orange-200 flex flex-col gap-1 my-1">
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-2.5 py-2 text-[13px] text-dark-600 hover:text-[#F87902] transition-colors rounded"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-gray-100 mt-2">
                <Link
                  to="/donate-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 bg-[#F87902] hover:bg-[#e06c00] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors"
                >
                  DONATE US
                </Link>
                <Link
                  to="/contact-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 bg-[#001C5C] hover:bg-[#001547] text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs transition-colors"
                >
                  CONTACT US
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
