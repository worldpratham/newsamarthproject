import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  useEffect(() => {
    document.title = 'About Us - Samarth Bharat';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#111111]">
      {/* ============================================================== */}
      {/* SECTION 1: Where we come from (Full width split 50/50)         */}
      {/* ============================================================== */}
      <section className="w-full bg-white p-0 m-0 overflow-hidden">
        <div className="w-full flex flex-col lg:flex-row items-stretch">
          {/* Left Column: Image Collage flush to the edge */}
          <div className="w-full lg:w-1/2 p-0 m-0 flex items-center justify-center bg-gray-50">
            <img
              src="/SB-Skill-Courses.png"
              alt="About Samarth Bharat Skill Courses"
              className="w-full h-auto object-cover block"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://samarthbharat.net/wp-content/uploads/2025/05/SB-Skill-Courses.png';
              }}
            />
          </div>

          {/* Right Column: Headings & Introduction Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-[7%] xl:px-[9%] py-10 sm:py-12 lg:py-16">
            {/* Eyebrow */}
            <p className="font-['Montserrat',sans-serif] text-[#F87902] text-[16px] sm:text-[18px] font-medium uppercase tracking-[0.5px] mb-2 sm:mb-3">
              About Samarth Bharat
            </p>

            {/* Main Heading */}
            <h1 className="font-serif text-[#001C5C] text-[30px] sm:text-[36px] md:text-[40px] font-extrabold leading-[1.2] mb-6">
              Where we come from
            </h1>

            {/* Paragraphs */}
            <div className="font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[1.9] sm:leading-[2.0] text-justify space-y-5">
              <p>
                Samarth Bharat is the skilling initiative of Bhaorao Deoras Seva Nyas, a charitable trust that has served Bharat’s most underserved communities since 1993, inspired by the life and vision of Shradheya Bhaorao Deoras Ji. For more than three decades the trust has worked across health, education and livelihoods — its six Vishram Sadans beside major hospitals have sheltered more than 15.8 lakh patient families.
              </p>
              <p>
                Samarth Bharat began in 2021, in the aftermath of the pandemic, when families around us had lost their income almost overnight. The question we asked was a simple one: what puts a steady income back into a household, and keeps it there? Our answer was a skill — taught properly, certified, and carried all the way to paid work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 2: What we believe (Sky Blue Boxed Section)            */}
      {/* ============================================================== */}
      <section className="w-full bg-[#D9ECFF] py-10 sm:py-12 md:py-14">
        <div className="max-w-[1450px] mx-auto px-6 sm:px-10 lg:px-16">
          <h2 className="font-serif text-[#001C5C] text-[26px] sm:text-[30px] md:text-[32px] font-extrabold leading-[1.25] mb-5">
            What we believe
          </h2>
          <div className="font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[1.9] sm:leading-[2.0] text-left space-y-4">
            <p>
              A young person’s ability is rarely the problem. Access is. Most of the young people we meet are capable, willing and ready to work. What they have never had is a good place to learn, a trainer who takes them seriously, or somebody to open the first door to a job. That is what we set out to give them.
            </p>
            <p>
              We also believe a livelihood is built on character as much as skill. Punctuality, pride in one’s work, honesty with a customer — these are taught inside every course, not beside it.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 3: How we work (Gradient 50/50 Section)               */}
      {/* ============================================================== */}
      <section
        className="w-full overflow-hidden text-white"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="w-full flex flex-col lg:flex-row items-stretch">
          {/* Left Column: Classroom / Workshop Image */}
          <div className="w-full lg:w-1/2 p-0 m-0 flex items-center justify-center">
            <img
              src="/about-sb3.jpg"
              alt="Samarth Bharat Practical Training"
              className="w-full h-full object-cover block min-h-[350px] lg:min-h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://samarthbharat.net/wp-content/uploads/2025/05/about-sb3-1024x731.jpg';
              }}
            />
          </div>

          {/* Right Column: Engine Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-[5%] xl:px-[6%] py-10 sm:py-12 lg:py-14">
            <h2 className="font-serif text-white text-[30px] sm:text-[36px] md:text-[40px] font-extrabold leading-[1.2] mb-5">
              How we work
            </h2>

            <p className="font-['Montserrat',sans-serif] text-white text-[15px] sm:text-[16px] mb-4">
              We work through two connected engines:
            </p>

            {/* Bullet list */}
            <ul className="list-disc pl-5 sm:pl-6 space-y-3 font-['Montserrat',sans-serif] text-white text-[14.5px] sm:text-[15.5px] leading-[1.8] mb-5">
              <li>
                <strong>Community skill development centers</strong> in the neighborhoods that need them most, teaching hands-on skills from air conditioning and electrical work to tailoring, beauty therapy and care for the elderly. A local partner provides the premises and the standing in the community; we bring the tools, the trainer, the curriculum and the link to work.
              </li>
              <li>
                <strong>Career Development Centers</strong> inside University of Delhi and DSEU colleges, with growing work at the University of Lucknow and the University of Jammu — offering artificial intelligence, coding, digital marketing and employability training to students before they enter the job market.
              </li>
            </ul>

            {/* Trailing paragraphs */}
            <div className="font-['Montserrat',sans-serif] text-white text-[14.5px] sm:text-[15.5px] leading-[1.8] space-y-4">
              <p>
                Every program begins with a Detailed Need Analysis. Before a single batch is enrolled, we map what the district needs, what learners aspire to, and where the jobs are. All training is NSQF-aligned and certified with KVIC and ASDC.
              </p>
              <p>
                When a course ends, every trainee has a clear next step: a job with a local employer; their own enterprise, supported by schemes such as PM Vishwakarma, MUDRA, PMEGP and Stand-Up India; or, in healthcare, eldercare, hospitality and technical skills, a pathway to work abroad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 4: Where we are today / Who stands with us / Governed   */}
      {/* ============================================================== */}
      <section className="w-full bg-white py-10 sm:py-12 md:py-14">
        <div className="max-w-[1450px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Part A: Where we are today */}
          <div className="mb-10 sm:mb-12">
            <h2 className="font-serif text-[#001C5C] text-[26px] sm:text-[30px] md:text-[32px] font-extrabold leading-[1.25] mb-5">
              Where we are today
            </h2>

            {/* Stats List with Dot Circle Icon */}
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
                  99+ skill development centers and Career Development Centers across 7 states
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
                  More than 11,800 young people trained
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
                  2,937 trainees are now running a business of their own
                </span>
              </li>
            </ul>

            <p className="font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[2.0]">
              Behind each number is a person — and a family that now has a steady income. You can meet some of them in our{' '}
              <Link to="/success-stories" className="underline font-bold text-[#045cb4] hover:text-[#001C5C]">
                Success Stories
              </Link>{' '}
              section.
            </p>
          </div>

          {/* Part B: Who stands with us */}
          <div className="mb-10 sm:mb-12">
            <h2 className="font-serif text-[#001C5C] text-[26px] sm:text-[30px] md:text-[32px] font-extrabold leading-[1.25] mb-4">
              Who stands with us
            </h2>
            <p className="font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[2.0]">
              Our work is supported by Sopra Steria India Foundation, TBO Group, Eicher Group Foundation, The Hans Foundation, RailTel and Crystal Crop Protection, and was recognized by the University of Delhi with its Potential for Excellence Award 2024.
            </p>
          </div>

          {/* Part C: How we are governed */}
          <div>
            <h2 className="font-serif text-[#001C5C] text-[26px] sm:text-[30px] md:text-[32px] font-extrabold leading-[1.25] mb-4">
              How we are governed
            </h2>
            <p className="font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[2.0]">
              Bhaorao Deoras Seva Nyas is a 12AA-registered charitable trust, CSR-1 approved and FCRA accredited.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 5: Where are we going (Sky Blue Boxed Section)         */}
      {/* ============================================================== */}
      <section className="w-full bg-[#D9ECFF] py-10 sm:py-12 md:py-14">
        <div className="max-w-[1450px] mx-auto px-6 sm:px-10 lg:px-16">
          <h2 className="font-serif text-[#001C5C] text-[26px] sm:text-[30px] md:text-[32px] font-extrabold leading-[1.25] mb-4">
            Where are we going
          </h2>
          <p className="font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[2.0] text-left">
            From this base we are working towards 1 lakh young people — and a skilled, self-reliant Viksit Bharat. That means more university partnerships and reaching into Tier-2 and Tier-3 towns where mainstream program rarely go.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SECTION 6: CSR Partnerships Link Box                          */}
      {/* ============================================================== */}
      <section className="w-full bg-white py-8 sm:py-10 md:py-12">
        <div className="max-w-[1450px] mx-auto px-6 sm:px-10 lg:px-16">
          <p className="font-['Montserrat',sans-serif] text-[#111111] text-[15px] sm:text-[16px] leading-[2.0]">
            <strong>Partnering through CSR?</strong> Ways to partner, how an engagement works and how we report →{' '}
            <Link to="/corporate-partnership" className="underline font-bold text-[#045cb4] hover:text-[#001C5C]">
              CSR Partnerships
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
