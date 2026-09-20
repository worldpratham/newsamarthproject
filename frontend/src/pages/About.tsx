import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    document.title = 'Bhaorao Deoras Seva Nyas - Samarth Bharat';
  }, []);

  return (
    <div className="bg-white min-h-[70vh] py-8 sm:py-10 md:py-14">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top 2-Column Section */}
        <div className="flex flex-col md:flex-row items-start gap-8 lg:gap-12">
          {/* Left Column - Portrait Image */}
          <div className="w-full md:w-[35%] lg:w-[30%] shrink-0 flex justify-center md:justify-start">
            <img
              src="/bhaorao_deoras.jpg"
              alt="Bhaorao Deoras Seva Nyas"
              className="w-full max-w-[390px] h-auto object-contain shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-gray-100"
              onError={(e) => {
                // Fallback to WordPress live CDN if local image fails
                (e.target as HTMLImageElement).src =
                  'https://samarthbharat.net/wp-content/uploads/2025/05/bhaorao_deoras.jpg';
              }}
            />
          </div>

          {/* Right Column - Text & Know More Button */}
          <div className="w-full md:w-[65%] lg:w-[70%] flex flex-col justify-start">
            {/* Subheading / Eyebrow */}
            <p className="font-['Montserrat',sans-serif] text-[#F87902] text-[15px] sm:text-base font-semibold uppercase tracking-wider mb-2">
              About Us
            </p>

            {/* Main Heading */}
            <h1 className="font-serif text-[#001C5C] text-2xl sm:text-3xl md:text-[36px] lg:text-[40px] font-extrabold leading-tight mb-5">
              Bhaorao Deoras Seva Nyas
            </h1>

            {/* First Paragraph */}
            <p className="font-['Montserrat',sans-serif] text-[#555555] text-[14px] sm:text-[15px] leading-[1.8] text-justify mb-4">
              Bhaorao Deoras Seva Nyas is a non-profit charitable trust (Under section 12 AA registered 1993) working for the 360-degree development of the economically and socially deprived class for more than 26 years across the country. Our Trust is also successfully maintaining the Vishram Sadans near AIIMS New Delhi, at SGPGI Lucknow and at IGIMS Patna.
            </p>

            {/* Second Paragraph */}
            <p className="font-['Montserrat',sans-serif] text-[#555555] text-[14px] sm:text-[15px] leading-[1.8] text-justify mb-6">
              The vision of our trust is to make the socially and economically weaker section of the society, self-sufficient and to enable them live with pride. To fulfil this vision, Bhaorao Deoras Seva Nyas (BDSN) has planned to provide Skill Development Training to the unemployed youth (the severity of which has further intensified during the current pandemic of COVID-19) to help them break away from poverty, by leveraging the training/hand holding to work their way up the social and economic ladder with dignity and pride.
            </p>

            {/* Know More Button */}
            <div className="pt-1">
              <a
                href="https://bhaoraonyas.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#F87902] hover:bg-[#e06c00] text-white font-['Montserrat',sans-serif] font-medium text-[14px] uppercase tracking-wider px-7 py-3 rounded-none transition-all duration-200 shadow hover:shadow-md active:scale-95"
              >
                Know More
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Paragraph */}
        <div className="mt-8 md:mt-10 pt-2">
          <p className="font-['Montserrat',sans-serif] text-[#555555] text-[14px] sm:text-[15px] leading-[1.8] text-justify">
            The Nyas is conducting the trainings under the banner – <strong className="font-bold text-gray-900">Samarth Bharat</strong>. BDSN will provide pathways for re-skilling and up-skilling youth in the pre-identified sectors. The idea is to either enable them to transit into formal sector employment post training through the developed network of quality instructors or to help the enthusiastic and capable candidates to begin an entrepreneurial journey in their field of training. We are primarily focusing on hand skill based works such as: Electrician; AC, Washing Machine Technician; Beautician, Hair Stylist; Smartphones Repair Technician, CCTV technician etc.
          </p>
        </div>
      </div>
    </div>
  );
}
