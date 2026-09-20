import { useEffect } from 'react';
export default function SamarthBharatIntro() {
  useEffect(() => {
    document.title = 'Samarth Bharat Intro - Samarth Bharat';
  }, []);

  return (
    <div className="bg-white">
      {/* Section 1: Top Hero / About Samarth Bharat Section (Full Width flush to left edge) */}
      <section className="w-full bg-white p-0 m-0 overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row items-stretch">
          {/* Left Column: Image collage flush to the screen's left edge */}
          <div className="w-full lg:w-1/2 p-0 m-0 flex items-center justify-start">
            <img
              src="/SB-Skill-Courses.png"
              alt="Samarth Bharat Skill Courses"
              className="w-full h-auto object-cover block"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://samarthbharat.net/wp-content/uploads/2025/05/SB-Skill-Courses.png';
              }}
            />
          </div>

          {/* Right Column: Headings & Introduction Content (Vertically centered with generous padding) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-14 xl:px-20 py-8 lg:py-12">
            {/* Eyebrow */}
            <p className="font-['Montserrat',sans-serif] text-[#F87902] text-[14px] sm:text-[15px] font-semibold uppercase tracking-wider mb-2 sm:mb-3">
              ABOUT SAMARTH BHARAT
            </p>

            {/* Main Heading (2-line heading matching WordPress site) */}
            <h1 className="font-serif text-[#001C5C] text-2xl sm:text-3xl md:text-[32px] lg:text-[34px] xl:text-[38px] font-extrabold leading-[1.25] mb-5">
              Empowering Lives Through Skills, Dignity,
              <br className="hidden sm:inline" /> and Opportunity
            </h1>

            {/* Paragraph 1 */}
            <p className="font-['Montserrat',sans-serif] text-[#555555] text-[13.5px] sm:text-[14.5px] leading-[1.75] text-left sm:text-justify mb-4">
              The vision of BDSN is to make the socially and economically weaker section of the society, self-sufficient and to enable them live with pride. To fulfil this vision, BDSN has planned to provide Skill Development Training to the unemployed youth (the severity of which has further intensified during the current pandemic of COVID-19) to help them break away from poverty, by leveraging the training / hand holding to work their way up the social and economic ladder with dignity and pride.
            </p>

            {/* Paragraph 2 */}
            <p className="font-['Montserrat',sans-serif] text-[#555555] text-[13.5px] sm:text-[14.5px] leading-[1.75] text-left sm:text-justify">
              The Nyas is conducting the trainings under the banner – Samarth Bharat . BDSN will provide pathways for re-skilling and up-skilling youth in the pre-identified sectors. The idea is to either enable them to transit into formal sector employment post training through the developed network of quality instructors or to help the enthusiastic and capable candidates to begin an entrepreneurial journey in their field of training. We are primarily focusing on hand skill based works such as: Electrician; AC, Washing Machine Technician; Beautician, Hair Stylist, Smartphones Repair Technician, CCTV technician etc.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Gradient Section (Our Mission & Our Aim) */}
      <section
        className="w-full py-12 sm:py-16 md:py-20 text-white"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10">
          {/* Our Mission Part */}
          <div className="mb-12 md:mb-16">
            <h2 className="font-serif text-white text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] font-extrabold leading-tight mb-6">
              Our mission
            </h2>

            <div className="space-y-5 font-['Montserrat',sans-serif] text-white/95 text-[14px] sm:text-[15px] leading-[1.85] text-left sm:text-justify">
              <p>
                Our aim is to reach out to weaker and unprivileged persons of the society and to propagate aspirational values among youth.
              </p>
              <p>
                In our mission, we will rapidly expand skill development efforts in India by creating an end-to-end, outcome-focused implementation framework, which aligns the demands of the employers for a well-trained, skilled workforce with the aspirations of Indian citizens for sustainable livelihoods. Our website will create an end-to-end implementation framework for skill development, which provides opportunities for life-long learning and opportunities for quality long and short-term skill training that meets the aspirations of trainees. Outcome focused training will align employer/industry demand and workforce productivity with trainees for sustainable livelihoods. We will help the workers in organized and un-organized sectors to gain formal sector employment.
              </p>
              <p>
                And, build capacity for skill development in organized and un-organized sectors, and provide pathways for re-skilling and up-skilling workers in these identified sectors, to enable them to transit into formal sector employment through a developed network of quality instructors. In turn, we will establish this ecosystem through high-quality teacher training institutions and leveraging existing public infrastructure and industry facilities.
              </p>
            </div>
          </div>

          {/* Inner 2-Column: Event Image + Our Aim */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 pt-4">
            {/* Left Inner Column: Certificate Distribution Photo */}
            <div className="w-full lg:w-[48%] flex justify-center">
              <div className="rounded-lg overflow-hidden shadow-2xl border border-white/20">
                <img
                  src="/about-sb3.jpg"
                  alt="Samarth Bharat Certificate Distribution"
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://samarthbharat.net/wp-content/uploads/2025/05/about-sb3-1024x731.jpg';
                  }}
                />
              </div>
            </div>

            {/* Right Inner Column: Our Aim */}
            <div className="w-full lg:w-[52%] lg:pl-4">
              <h2 className="font-serif text-white text-2xl sm:text-3xl md:text-[38px] lg:text-[42px] font-extrabold leading-tight mb-6">
                Our Aim
              </h2>

              <p className="font-['Montserrat',sans-serif] text-white/95 text-[14px] sm:text-[15px] leading-[1.85] text-left sm:text-justify">
                As our Hon’ble Prime Minister said, “Corona crisis has also taught us the importance of local supply chains, local markets have stepped in to help us. Time has taught us that we need to start thinking about local and buying local. Many global brands once started locally. With the passage of time, and public demand and marketing, these brands became global. We need to be vocal about our local products by not only buying but also publicising them.” Quoting from Vedas, PM explained the importance of self-reliance,” Sarvam Aatmam Vasham Sukham. That which is in your control gives you happiness. We have to move ahead with new energy. Only we can make India self-reliant.”
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
