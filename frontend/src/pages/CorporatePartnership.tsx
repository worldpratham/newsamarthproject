import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CorporatePartnership() {
  useEffect(() => {
    document.title = 'Corporate Partnership - Samarth Bharat';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#111111]">
      {/* ============================================================== */}
      {/* SECTION 1: CSR Partnerships Hero (Full Width Split 50/50)      */}
      {/* ============================================================== */}
      <section className="w-full bg-white p-0 m-0 overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row items-stretch">
          {/* Left Column: Hero Image */}
          <div className="w-full lg:w-1/2 p-0 m-0 flex items-center justify-center bg-gray-50">
            <img
              src="/csr-hero.jpg"
              alt="CSR Partnerships"
              className="w-full h-auto object-cover block"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://samarthbharat.net/wp-content/uploads/2026/07/6.jpg';
              }}
            />
          </div>

          {/* Right Column: Headings & Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-[7%] xl:px-[9%] py-10 sm:py-12 lg:py-16">
            {/* Eyebrow */}
            <p className="font-['Montserrat',sans-serif] text-[#F87902] text-[15px] sm:text-[17px] font-medium uppercase tracking-[0.5px] mb-2 sm:mb-3">
              SAMARTH BHARAT · BHAORAO DEORAS SEVA NYAS
            </p>

            {/* Main Heading */}
            <h1 className="font-serif text-[#001C5C] text-[30px] sm:text-[36px] md:text-[40px] font-extrabold leading-[1.2] mb-6">
              CSR Partnerships
            </h1>

            {/* Paragraphs */}
            <div className="font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[1.9] sm:leading-[2.0] text-justify space-y-5">
              <p>
                Under Section 135 of the Companies Act, 2013, skilling and livelihoods (Schedule VII, item ii) is one of the most measurable ways to put CSR funds to work. We make that simple — and we take it to the young people and neighborhoods that mainstream programs most often miss.
              </p>
              <p className="italic text-gray-700">
                Who we are, how we work, our registrations and our partners are set out in [About Us]
                {/* <Link to="/about-us" className="underline font-bold text-[#045cb4] hover:text-[#001C5C]"> */}
                  {/* [About Us] */}
                {/* </Link> */}
                . This page covers how a CSR partnership works.

              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: Why partner with us (Sky Blue Boxed Section)        */}
      {/* ============================================================== */}
      <section className="w-full bg-[#D9ECFF] py-10 sm:py-12 md:py-14">
        <div className="max-w-[1450px] mx-auto px-6 sm:px-10 lg:px-16">
          <h2 className="font-serif text-[#001C5C] text-[26px] sm:text-[30px] md:text-[32px] font-extrabold leading-[1.25] mb-5">
            Why partner with us
          </h2>
          <ul className="list-disc pl-5 sm:pl-6 space-y-3 font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[1.9] sm:leading-[2.0]">
            <li>
              <strong>Your CSR lands where you choose.</strong> You pick the district or state — near your plants, offices or supply chain — and the program is built for that place.
            </li>
            <li>
              <strong>You can put outcomes in your annual report.</strong> We follow every trainee from enrolment into work and report the income they earn against where they started.
            </li>
            <li>
              <strong>Reach that most programs miss.</strong> Urban settlements and rural clusters, with a deliberate focus on women and first-generation earners.
            </li>
          </ul>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: Ways to partner (Full Width Split 50/50: Text Left) */}
      {/* ============================================================== */}
      <section className="w-full bg-white p-0 m-0 overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row items-stretch">
          {/* Left Column: Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-[7%] xl:px-[9%] py-10 sm:py-12 lg:py-16">
            <h2 className="font-serif text-[#001C5C] text-[30px] sm:text-[36px] md:text-[40px] font-extrabold leading-[1.2] mb-6">
              Ways to partner
            </h2>

            <ul className="list-disc pl-5 sm:pl-6 space-y-3.5 font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[1.9] sm:leading-[2.0]">
              <li>
                <strong>Sponsor a batch</strong> — one complete cohort through a certified course, with placement support.
              </li>
              <li>
                <strong>Equip a lab</strong> — a fully fitted Beauty and Wellness, Refrigeration and Air Conditioning, Electrical, Healthcare or Bakery lab inside an existing center.
              </li>
              <li>
                <strong>Establish a center</strong> — a new community skill development center or campus Career Development Centre, with set-up and a full year of operations.
              </li>
              <li>
                <strong>Strategic partnership</strong> — a multi-year, multi-location program across your operational footprint, co-designed with you and carrying your name.
              </li>
            </ul>
          </div>

          {/* Right Column: Classroom / Laboratory Image */}
          <div className="w-full lg:w-1/2 p-0 m-0 flex items-center justify-center bg-gray-50">
            <img
              src="/csr-ways.jpg"
              alt="Ways to partner"
              className="w-full h-full object-cover block min-h-[350px] lg:min-h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://samarthbharat.net/wp-content/uploads/2026/07/4.jpg';
              }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: How an engagement works (Navy Blue Boxed Section)   */}
      {/* ============================================================== */}
      <section className="w-full bg-[#001C5C] text-white py-10 sm:py-12 md:py-14">
        <div className="max-w-[1450px] mx-auto px-6 sm:px-10 lg:px-16">
          <h2 className="font-serif text-white text-[26px] sm:text-[30px] md:text-[32px] font-extrabold leading-[1.25] mb-5">
            How an engagement works
          </h2>

          <ol className="list-decimal pl-5 sm:pl-6 space-y-3 font-['Montserrat',sans-serif] text-white text-[15px] sm:text-[16px] leading-[1.9] sm:leading-[2.0]">
            <li>
              <strong>Detailed Need Analysis</strong> in the district or state of your choice
            </li>
            <li>
              <strong>Proposal and budget</strong>, built on that study and agreed with your CSR team
            </li>
            <li>
              <strong>Launch</strong> — community mobilization, enrolment and trainer deployment
            </li>
            <li>
              <strong>Training, certification and placement</strong>
            </li>
            <li>
              <strong>Follow-through</strong> — tracking at three, six and twelve months after the course
            </li>
          </ol>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: Governance / Alignment / Start a conversation       */}
      {/* ============================================================== */}
      <section className="w-full bg-white py-10 sm:py-12 md:py-14">
        <div className="max-w-[1450px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Subsection A: Governance and reporting */}
          <div className="mb-10 sm:mb-12">
            <h2 className="font-serif text-[#001C5C] text-[26px] sm:text-[30px] md:text-[32px] font-extrabold leading-[1.25] mb-5">
              Governance and reporting
            </h2>

            {/* Icon List with Orange Dot-Circle SVGs */}
            <ul className="space-y-3 mb-5 font-['Montserrat',sans-serif]">
              <li className="flex items-center gap-3">
                <svg
                  aria-hidden="true"
                  className="w-[15px] h-[15px] text-[#F87902] fill-[#F87902] shrink-0"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z" />
                </svg>
                <span className="text-[#111111] text-[16px] sm:text-[17.5px] font-medium leading-[1.6]">
                  Earmarked accounts and utilization certificates
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  aria-hidden="true"
                  className="w-[15px] h-[15px] text-[#F87902] fill-[#F87902] shrink-0"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z" />
                </svg>
                <span className="text-[#111111] text-[16px] sm:text-[17.5px] font-medium leading-[1.6]">
                  Independent statutory audit
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  aria-hidden="true"
                  className="w-[15px] h-[15px] text-[#F87902] fill-[#F87902] shrink-0"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z" />
                </svg>
                <span className="text-[#111111] text-[16px] sm:text-[17.5px] font-medium leading-[1.6]">
                  Monthly internal reviews and quarterly impact reports to you
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  aria-hidden="true"
                  className="w-[15px] h-[15px] text-[#F87902] fill-[#F87902] shrink-0"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z" />
                </svg>
                <span className="text-[#111111] text-[16px] sm:text-[17.5px] font-medium leading-[1.6]">
                  An annual independent third-party end-line assessment
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  aria-hidden="true"
                  className="w-[15px] h-[15px] text-[#F87902] fill-[#F87902] shrink-0"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm80 248c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80z" />
                </svg>
                <span className="text-[#111111] text-[16px] sm:text-[17.5px] font-medium leading-[1.6]">
                  Biometric attendance and beneficiary verification
                </span>
              </li>
            </ul>

            <p className="font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[2.0]">
              We report on enrolment, attendance and completion; certification; placement and self-employment; retention; income uplift; and the participation of women and underserved communities.
            </p>
          </div>

          {/* Subsection B: Alignment */}
          <div className="mb-10 sm:mb-12">
            <h2 className="font-serif text-[#001C5C] text-[26px] sm:text-[30px] md:text-[32px] font-extrabold leading-[1.25] mb-4">
              Alignment
            </h2>
            <ul className="list-disc pl-5 sm:pl-6 space-y-3 font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[1.9] sm:leading-[2.0]">
              <li>
                <strong>Schedule VII (ii)</strong> — employment-enhancing vocational skills
              </li>
              <li>
                <strong>Sustainable Development Goals 1, 4, 5, 8 and 10</strong> — no poverty, quality education, gender equality, decent work and reduced inequalities
              </li>
              <li>
                The <strong>social</strong> and <strong>governance</strong> pillars of your ESG reporting
              </li>
            </ul>
          </div>

          {/* Subsection C: Start a conversation */}
          <div>
            <h2 className="font-serif text-[#001C5C] text-[26px] sm:text-[30px] md:text-[32px] font-extrabold leading-[1.25] mb-4">
              Start a conversation
            </h2>
            <div className="font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[2.0] space-y-3">
              <p>
                Tell us where your company operates and what you want your CSR to achieve, and we will come back with a proposal built for that place.
              </p>
              <p className="text-[15.5px] sm:text-[16.5px]">
                <strong>Shonal Gupta, Convenor</strong> &nbsp;·&nbsp;{' '}
                <a href="tel:+919811190016" className="font-bold text-[#045cb4] hover:underline">
                  +91 98111 90016
                </a>{' '}
                &nbsp;·&nbsp;{' '}
                <a href="mailto:contact@samarthbharat.net" className="font-bold text-[#045cb4] hover:underline">
                  contact@samarthbharat.net
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
