import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  QrCode,
  Copy,
  ExternalLink,
} from 'lucide-react';

const DONOR_SLIDES = [
  {
    img: 'https://samarthbharat.net/wp-content/uploads/2025/07/TTTTTTTTTTTTT.png',
    title: 'Donor Appreciation Certificate',
    driveUrl: 'https://drive.google.com/file/d/1v5GTFk9jCHslUQyJlhstVdQ21U9ROAyn/view?usp=drive_link',
  },
  {
    img: 'https://samarthbharat.net/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-06-at-23.05.32.jpeg',
    title: 'Community Training Contribution',
    driveUrl: 'https://drive.google.com/file/d/1v4uLn3OcFAL2x8-o9GyXlubsdEeSY29t/view?usp=drive_link',
  },
  {
    img: 'https://samarthbharat.net/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-06-at-23.04.25.jpeg',
    title: 'Samarth Bharat Supporter',
    driveUrl: 'https://drive.google.com/file/d/1v4pjPHvwGH97-WPDQHFsQOoY2nrGzLDE/view?usp=drive_link',
  },
  {
    img: 'https://samarthbharat.net/wp-content/uploads/2025/07/oooooooooo.png',
    title: 'Skills Development Partner',
    driveUrl: 'https://drive.google.com/file/d/1v5eiBIJOfskvcaydrVC7W5F73vFaySCX/view?usp=drive_link',
  },
  {
    img: 'https://samarthbharat.net/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-06-at-23.11.20-1.jpeg',
    title: 'Empowerment Awardee',
    driveUrl: 'https://drive.google.com/file/d/1v6g9ytcUfwsVAtio1-TDa2EWBBt9iiwO/view?usp=drive_link',
  },
  {
    img: 'https://samarthbharat.net/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-06-at-23.17.45.jpeg',
    title: 'Donor Felicitation',
    driveUrl: 'https://drive.google.com/file/d/1v4rYyac9Dssu4om7gvq9JxRAsvYLOQKi/view?usp=drive_link',
  },
  {
    img: 'https://samarthbharat.net/wp-content/uploads/2025/07/9oo.png',
    title: 'Certificate of Support',
    driveUrl: 'https://drive.google.com/file/d/1v5iaUjpDzWhcqJ8-yIc0-YiKx_SRAcjo/view?usp=drive_link',
  },
  {
    img: 'https://samarthbharat.net/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-06-at-23.18.28.jpeg',
    title: 'BDSN Partner in Service',
    driveUrl: 'https://drive.google.com/file/d/1v654CAOIfZxX8iUzTbgrt-vC8of1CSrg/view?usp=drive_link',
  },
];

export default function DonateUs() {
  // Modal Popup state (Popup 955)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Form Fields matching Elementor form c4b49c6
  const [formFields, setFormFields] = useState({
    name: '',
    phone: '',
    email: '',
    amount: '',
    company: '',
    address: '',
    pan: '',
    message: '',
  });

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Lightbox for donors carousel
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % DONOR_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? DONOR_SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % DONOR_SLIDES.length);
  };

  // Open modal
  const handleOpenPopup = () => {
    setErrorMsg(null);
    setSubmittedData(null);
    setIsPopupOpen(true);
  };

  // Phone input: strictly numbers only, max 10 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormFields((prev) => ({ ...prev, phone: digitsOnly }));
    if (errorMsg) setErrorMsg(null);
  };

  // PAN input: alphanumeric uppercase, max 10 characters
  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanPan = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    setFormFields((prev) => ({ ...prev, pan: cleanPan }));
    if (errorMsg) setErrorMsg(null);
  };

  // Amount input: numbers only
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanAmt = e.target.value.replace(/\D/g, '');
    setFormFields((prev) => ({ ...prev, amount: cleanAmt }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg(null);
  };

  // Form submission via API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Validate Phone
    const phoneClean = formFields.phone.trim();
    if (!phoneClean || phoneClean.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    // 2. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formFields.email && !emailRegex.test(formFields.email.trim())) {
      setErrorMsg('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    // 3. Validate Amount
    const amtNum = Number(formFields.amount);
    if (!amtNum || isNaN(amtNum) || amtNum <= 0) {
      setErrorMsg('Please specify a valid donation amount.');
      return;
    }

    // 4. Validate PAN
    const panClean = formFields.pan.trim().toUpperCase();
    if (!panClean || panClean.length !== 10) {
      setErrorMsg('A valid 10-character PAN Card Number is required for 80G tax deduction.');
      return;
    }

    // 5. Validate Address
    if (!formFields.address.trim()) {
      setErrorMsg('Please enter your Address with PIN code.');
      return;
    }

    const payload = {
      fullName: formFields.name.trim(),
      phone: phoneClean,
      email: formFields.email.trim().toLowerCase(),
      amount: amtNum,
      panNumber: panClean,
      addressWithPin: formFields.address.trim(),
      companyOrOrg: formFields.company.trim(),
      message: formFields.message.trim(),
    };

    try {
      setSubmitting(true);
      const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
      const primaryUrl = `${baseUrl}/api/donations`;

      let response: Response;
      try {
        response = await fetch(primaryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Fallback for local development
        response = await fetch('http://localhost:5000/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Server error while submitting donation details');
      }

      setSubmittedData(data.data || payload);
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to submit details. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied ${label} to clipboard!`);
  };

  return (
    <div className="bg-white font-['Montserrat',sans-serif] text-[#333333] selection:bg-[#F87902] selection:text-white">
      {/* =========================================================================
          SECTION 1: TOP HERO BANNER (elementor-element-40ab46f)
          Gradient: linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)
          Min-height: 200px
          ========================================================================= */}
      <section
        className="w-full flex items-center justify-center py-12 md:py-16 px-4"
        style={{
          background: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
          minHeight: '220px',
        }}
      >
        <div className="max-w-[1450px] w-full text-center text-white">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 800,
            }}
          >
            Donate Us
          </h2>
          <h5 className="text-sm sm:text-base md:text-lg font-normal text-white/95 tracking-wide max-w-2xl mx-auto">
            Empower Dreams, Uplift Lives – Your Donation Makes It Possible!
          </h5>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INVEST IN PEOPLE SECTION (elementor-element-4ce04d5)
          Image on Left, Heading + Text + "DONATE NOW" Button on Right
          ========================================================================= */}
      <section className="w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left Column: Image */}
          <div className="w-full overflow-hidden shadow-sm">
            <img
              src="https://samarthbharat.net/wp-content/uploads/2025/07/87a3e7eb-4d35-424d-a57a-c4fa24f7b120.jpg"
              alt="Invest In People"
              className="w-full h-auto object-cover block"
              loading="eager"
            />
          </div>

          {/* Right Column: Content */}
          <div className="space-y-5 lg:pl-4">
            <h2
              className="text-2xl sm:text-3xl md:text-[38px] leading-[1.25] text-[#001C5C]"
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontWeight: 800,
              }}
            >
              Invest In People Fuel Their Journey From Learning To Livelihood
            </h2>

            <p className="text-[#555555] text-sm sm:text-[15.5px] leading-relaxed font-normal">
              Every individual deserves the opportunity to grow , work with dignity , and support their
              family. Your donation helps provide skill-based training and employment pathways to
              hardworking individuas striving for a better future. With your support , we equip them
              with the tools, guidance they need to stand on their feet.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleOpenPopup}
                className="inline-block bg-[#F87902] hover:bg-[#e06c00] text-white text-[15px] font-medium uppercase px-7 py-3 transition-transform active:scale-95 cursor-pointer shadow-sm"
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  borderRadius: '0px',
                }}
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PARALLAX BACKGROUND BANNER (elementor-element-f63b25f)
          Background Image: SB-About-img.jpg (fixed parallax), overlay: #001C5C at 50%
          Heading: "Our Door Are Always Open To More People Who Want To Support Each Others!"
          ========================================================================= */}
      <section
        className="relative w-full py-20 md:py-28 px-4 flex items-center justify-center bg-fixed bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://samarthbharat.net/wp-content/uploads/2025/05/SB-About-img.jpg')",
          minHeight: '460px',
        }}
      >
        {/* Dark Navy Blue Overlay (opacity .5) */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ backgroundColor: '#001C5C', opacity: 0.55 }}
        />

        <div className="relative z-10 max-w-[900px] mx-auto text-center text-white px-4">
          <h2
            className="text-2xl sm:text-3xl md:text-[40px] leading-tight text-white mb-8"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 800,
            }}
          >
            Our Door Are Always Open To More People Who Want To Support Each Others!
          </h2>

          <button
            type="button"
            onClick={handleOpenPopup}
            className="inline-block bg-[#F87902] hover:bg-[#e06c00] text-white text-[15px] font-medium uppercase px-8 py-3.5 transition-transform active:scale-95 cursor-pointer shadow-md"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              borderRadius: '0px',
            }}
          >
            Donate Now
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: OUR OPTIMISTIC DONORS (elementor-element-f4b1ae2)
          Media Carousel with Swiper slides
          ========================================================================= */}
      <section className="w-full py-14 md:py-20 px-4 bg-white">
        <div className="max-w-[1350px] mx-auto">
          <h2
            className="text-center text-2xl sm:text-3xl md:text-[32px] font-bold text-[#001C5C] mb-10"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 700,
            }}
          >
            Our Optimistic Donors
          </h2>

          {/* Carousel Slider */}
          <div
            className="relative overflow-hidden group"
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            {/* Desktop View: Multi-card view */}
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, offset) => {
                const itemIndex = (currentSlide + offset) % DONOR_SLIDES.length;
                const slide = DONOR_SLIDES[itemIndex];
                return (
                  <div
                    key={itemIndex}
                    onClick={() => setLightboxImg(slide.img)}
                    className="cursor-pointer bg-slate-50 border border-slate-200 rounded-sm overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                      <img
                        src={slide.img}
                        alt={slide.title}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 bg-white border-t border-slate-100 text-center">
                      <p className="text-xs font-semibold text-slate-800 truncate">{slide.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile View: Single card */}
            <div className="sm:hidden">
              <div
                onClick={() => setLightboxImg(DONOR_SLIDES[currentSlide].img)}
                className="cursor-pointer bg-slate-50 border border-slate-200 rounded-sm overflow-hidden shadow-sm"
              >
                <div className="aspect-[4/3] w-full bg-slate-100 flex items-center justify-center">
                  <img
                    src={DONOR_SLIDES[currentSlide].img}
                    alt={DONOR_SLIDES[currentSlide].title}
                    className="w-full h-full object-contain p-3"
                  />
                </div>
                <div className="p-3 bg-white text-center">
                  <p className="text-xs font-semibold text-slate-800">{DONOR_SLIDES[currentSlide].title}</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrevSlide}
              aria-label="Previous Slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              aria-label="Next Slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
            >
              <ChevronRight size={22} />
            </button>

            {/* Pagination Indicators */}
            <div className="flex justify-center items-center gap-1.5 mt-6">
              {DONOR_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlide === i ? 'w-6 bg-[#F87902]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          POPUP 955 MODAL (Elementor Popup Template 955: "Please fill the information below")
          Triggered by clicking "Donate Now" anywhere on the page
          ========================================================================= */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div
            className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl text-white"
            style={{
              backgroundColor: '#001C5C',
              borderRadius: '6px',
            }}
          >
            {/* Close 'X' Button */}
            <button
              type="button"
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-1 transition-colors cursor-pointer z-20"
              aria-label="Close dialog"
            >
              <X size={24} />
            </button>

            {/* Popup Header with Logo & Headings matching Elementor Popup */}
            <div className="px-6 pt-7 pb-4 border-b border-white/15 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-28 sm:w-32 shrink-0">
                <img
                  src="https://samarthbharat.net/wp-content/uploads/2025/06/SB-White-logo.png"
                  alt="Samarth Bharat Logo"
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo-white.png';
                  }}
                />
              </div>
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-white leading-tight"
                  style={{ fontFamily: '"Times New Roman", Times, serif', fontWeight: 800 }}
                >
                  Please fill the information below
                </h2>
                <h5 className="text-xs sm:text-sm text-white/85 font-normal mt-1">
                  About yourself and your Company/Organisation
                </h5>
              </div>
            </div>

            {/* Popup Content */}
            <div className="p-6 sm:p-8">
              {submittedData ? (
                /* Post-Submission: QR Code & Bank Transfer Information */
                <div className="text-center space-y-5 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-500/30">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3
                      className="text-2xl font-bold text-white"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      Information Submitted Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 mt-1">
                      Thank you, <strong className="text-white">{submittedData.fullName}</strong>. Please scan the QR code below or use the bank account details to complete your donation of{' '}
                      <span className="text-[#F87902] font-bold">
                        ₹{Number(submittedData.amount).toLocaleString('en-IN')}
                      </span>
                      .
                    </p>
                  </div>

                  {/* UPI QR Code & Bank Box */}
                  <div className="bg-white text-[#001C5C] p-5 rounded-lg text-left shadow-md space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-slate-200 pb-4">
                      {/* Dynamic UPI QR code */}
                      <div className="w-36 h-36 bg-slate-50 border border-slate-300 p-1 rounded-sm shrink-0 flex items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=50200062498712@hdfcbank%26pn=Bhaorao%20Deoras%20Seva%20Nyas%26am=${submittedData.amount}%26cu=INR`}
                          alt="Donation UPI QR Code"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="text-xs space-y-1 text-center sm:text-left">
                        <div className="font-bold text-sm text-[#001C5C] flex items-center gap-1.5 justify-center sm:justify-start">
                          <QrCode size={16} className="text-[#F87902]" />
                          <span>Scan with Any UPI App</span>
                        </div>
                        <p className="text-slate-500">
                          Google Pay, PhonePe, Paytm, BHIM, or any Banking App
                        </p>
                        <div className="pt-2">
                          <span className="text-[11px] text-slate-500 block">UPI ID / VPA:</span>
                          <span className="font-mono font-bold text-xs text-slate-900 bg-slate-100 px-2 py-1 rounded inline-flex items-center gap-1">
                            50200062498712@hdfcbank
                            <button
                              type="button"
                              onClick={() => handleCopyText('50200062498712@hdfcbank', 'UPI ID')}
                              className="text-blue-600 hover:text-blue-800"
                              title="Copy UPI ID"
                            >
                              <Copy size={12} />
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bank Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 block">Account Name:</span>
                        <span className="font-bold text-slate-900">Bhaorao Deoras Seva Nyas</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Bank Name:</span>
                        <span className="font-medium text-slate-800">HDFC Bank</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Account Number:</span>
                        <span className="font-mono font-bold text-slate-900">50200062498712</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">IFSC Code:</span>
                        <span className="font-mono font-bold text-slate-900">HDFC0000240</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-800">
                      ℹ️ Your 80G Tax Exemption Certificate will be sent to{' '}
                      <strong>{submittedData.email || submittedData.phone}</strong> after payment verification.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedData(null);
                      setIsPopupOpen(false);
                    }}
                    className="px-6 py-2.5 bg-white text-[#001C5C] hover:bg-slate-100 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                /* The Elementor Form (Form c4b49c6) */
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {errorMsg && (
                    <div className="p-3 rounded bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-start gap-2">
                      <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name (col-100) */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formFields.name}
                      onChange={handleTextChange}
                      placeholder="Name"
                      className="w-full px-3.5 py-2.5 bg-white text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902] placeholder-gray-500"
                      style={{ borderRadius: '0px' }}
                    />
                  </div>

                  {/* Phone & Email (col-50 & col-50) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        name="phone"
                        required
                        value={formFields.phone}
                        onChange={handlePhoneChange}
                        placeholder="Phone Number (10 Digits Only)"
                        className="w-full px-3.5 py-2.5 bg-white text-[#333333] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F87902] placeholder-gray-500"
                        style={{ borderRadius: '0px' }}
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formFields.email}
                        onChange={handleTextChange}
                        placeholder="Email"
                        className="w-full px-3.5 py-2.5 bg-white text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902] placeholder-gray-500"
                        style={{ borderRadius: '0px' }}
                      />
                    </div>
                  </div>

                  {/* Amount (col-100) */}
                  <div>
                    <input
                      type="text"
                      inputMode="numeric"
                      name="amount"
                      required
                      value={formFields.amount}
                      onChange={handleAmountChange}
                      placeholder="Amount (in INR)"
                      className="w-full px-3.5 py-2.5 bg-white text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902] placeholder-gray-500"
                      style={{ borderRadius: '0px' }}
                    />
                  </div>

                  {/* Company / Organisation (col-100) */}
                  <div>
                    <input
                      type="text"
                      name="company"
                      value={formFields.company}
                      onChange={handleTextChange}
                      placeholder="Name of the Company/Organisation"
                      className="w-full px-3.5 py-2.5 bg-white text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902] placeholder-gray-500"
                      style={{ borderRadius: '0px' }}
                    />
                  </div>

                  {/* Address with PIN (col-100) */}
                  <div>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formFields.address}
                      onChange={handleTextChange}
                      placeholder="Address with PIN"
                      className="w-full px-3.5 py-2.5 bg-white text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902] placeholder-gray-500"
                      style={{ borderRadius: '0px' }}
                    />
                  </div>

                  {/* Pan No. (col-100) */}
                  <div>
                    <input
                      type="text"
                      maxLength={10}
                      name="pan"
                      required
                      value={formFields.pan}
                      onChange={handlePanChange}
                      placeholder="Pan No. (Personal / Company)"
                      className="w-full px-3.5 py-2.5 bg-white text-[#333333] text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#F87902] placeholder-gray-500"
                      style={{ borderRadius: '0px' }}
                    />
                  </div>

                  {/* Message (col-100) */}
                  <div>
                    <textarea
                      name="message"
                      rows={3}
                      value={formFields.message}
                      onChange={handleTextChange}
                      placeholder="Message"
                      className="w-full px-3.5 py-2.5 bg-white text-[#333333] text-sm focus:outline-none focus:ring-2 focus:ring-[#F87902] placeholder-gray-500 resize-none"
                      style={{ borderRadius: '0px' }}
                    />
                  </div>

                  {/* Submit Button ("Scan QR code") */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-6 bg-[#F87902] hover:bg-[#e06c00] text-white text-sm font-medium uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                      style={{
                        fontFamily: '"Montserrat", sans-serif',
                        borderRadius: '0px',
                      }}
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Scan QR code</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Preview for Carousel */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 cursor-pointer animate-fade-in"
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white p-2 rounded shadow-2xl">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 p-1"
            >
              <X size={28} />
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged Certificate"
              className="max-h-[80vh] w-auto object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
