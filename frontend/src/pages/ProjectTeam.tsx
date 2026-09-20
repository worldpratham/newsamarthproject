import { useEffect } from 'react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: React.ReactNode;
}

const teamMembers: TeamMember[] = [
  {
    id: 'rahul-singh',
    name: 'Mr. Rahul Singh',
    role: 'Secretary - Bhaorao Deoras Seva Nyas',
    image: '/Rahul-Ji.jpg',
    description: (
      <>
        <p>
          Rahul is Entrepreneurial at heart and has worked in various start-up assignments, even operating in different large companies. He has a knack for discovering and implementing applications of technology in new ways.
        </p>
        <p>
          He is a Managing Director at GAPL, a manufacturer-exporter of high-performance cables and wires (QPL Listed – MIL Qualified), which have a use in Aerospace and Defence. GAPL cables, power, and controls a lot of Indian weapon systems and rockets.
        </p>
        <p>
          He is Non-Executive Director in Jigserv Digital and Navyug Infosolutions Pvt Ltd. He was on the advisory board of Loylty Rewardz, a consumer loyalty company that was sold to BillDesk for more than 200 Crores. He is functioning on the governing board of IIIT Allahabad.
        </p>
        <p>
          On a personal front, children’s education is the closest thing to his heart. He is Managing trustee and Secretary of Bhaorao Deoras Seva Nyas, which works in education and medical area and assists more than two lakhs patients and their attendants every year. He is joint Secretary of Vardan Sewa Sansthan, which runs a 150-bed multi-specialty hospital, an eye hospital, and a Retina center. He is a member of a Charitable Society that runs more than 60 schools and Hospitals in Uttarakhand. He also works in the Executive Committee of Gram Bharti, a not for profit institution which works in the area of Rural Education and runs skill development centre and school in Hapur. He is the treasurer of Jyoti Sewa Nyas, which runs a hostel for rural students from class 7th till class 12th for free in Ghaziabad.
        </p>
        <p>
          He is an avid reader with an interest in business & technology history, biography, political history, and organization of civilization and societies. He believes the dictum, “Don’t tell me how educated you are, tell me how much you have traveled” and has traveled to 39 countries and 26 states of India. Rahul is a B. Tech (IIT K) and an MBA (ISB) who lives in Delhi with his wife Richa, son Tejas and daughter Chaarvi.
        </p>
      </>
    ),
  },
  {
    id: 'shonal-gupta',
    name: 'Dr. Shonal Gupta',
    role: 'Project Head',
    image: '/Dr-Shonal-Gupta.jpeg',
    description: (
      <>
        <p>
          Dr. Gupta is a skill-development and workforce-transformation leader who has spent more than three decades building the bridge between India’s boardrooms and its grassroots. He began inside some of the world’s most demanding organisations — Cisco, COLT, BlackRock, Bank of America, Convergys, and RBS — where he built enterprise learning functions from the ground up and developed talent for hundreds of professionals. He holds a Ph.D. in Skill Development and an MBA in Human Resources.
        </p>
        <p>
          But what truly sets him apart is what he chose to do with that corporate rigour. As Project Head of Samarth Bharat, he has built one of India’s largest skill-to-startup ecosystems — 42 community skilling centres and 54 university career-development centres — that has empowered more than 10,000 young Indians. Through the Universal Health Foundation he founded, his COVID-19 response reached over 25,000 people. His original frameworks in skilling, employability, and AI-enabled learning are now used across universities and communities nationwide.
        </p>
      </>
    ),
  },
  {
    id: 'rakesh-kumar-gupta',
    name: 'Mr Rakesh Kumar Gupta',
    role: 'Head of Operations',
    image: '/Rakesh-Kumar.jpg',
    description: (
      <>
        <p>
          He has dedicated himself to the service of society for the last 40 years. In his early twenties he committed himself to full-time service of the nation as Pracharak of the Rashtriya Swayamsevak Sangh (RSS). After devoting 22 years of his life as a full-time social-worker, he entered family life but his passion for the upliftment of society stayed as strong as ever. He has worked on wide-ranging social aspects while being associated with various organisations. From 1995 till 2006 he worked full-time with Sewa Bharti first as Delhi Organising Secretary (1995-1999) and then as North India Organising Secretary (1999-2006) – during this period he was Trustee of ‘Sewa Samarpan’ magazine also. Since 2007, he is the National Secretary of SumVikas Charitable Trust.
        </p>
        <p className="font-bold text-gray-900 mt-3">
          Some of the special projects executed by him in his various capacities are:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Adult Literacy Campaign, 2005:</strong> Imparted literacy to 10,000 unlettered women in Delhi – 1,000 volunteers were motivated to work in this campaign.
          </li>
          <li>
            <strong>West Midnapur (West Bengal), 2006:</strong> Constituted and headed a 7-member team to study starvation reports from West Midnapur district.
          </li>
          <li>
            <strong>Uttarakhand Floods, 2013:</strong> Constituted and headed a four-member team to study the flood-devastated region. Four projects were launched in Guptkashi, Lvara, Phata, and Ukhimath in district Rudraprayag, imparting education to 100 students and skills training to over 400 women.
          </li>
        </ul>
        <p className="font-bold text-gray-900 mt-3">Expertise:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Launching new skills training centres/projects</li>
          <li>Developing public relations with volunteers and workers alike</li>
          <li>Keeping the teams motivated and productive, with focus on developing a result-oriented work environ</li>
          <li>Conceptualising and executing new projects</li>
          <li>Impressive orator/public speaker</li>
        </ul>
      </>
    ),
  },
  {
    id: 'naveen-senger',
    name: 'Mr. Naveen Senger',
    role: 'Lead - Trainings',
    image: '/Naveen_Ji.png',
    description: (
      <>
        <p>
          Mr. Naveen Sengar has done his B-Tech (ECE) from Dr. APJ Abdul Kalam Technical University, MBA (HR & Marketing) from Jiwaji University. He is Working as a Team Leader in Samarth Bharat mainly focusing on New Center Establishment, Co-ordinating with Govt. Training Partners, Training of Trainers, Finalizing Training Content, Etc.
        </p>
        <p>
          His past Experiences is Institute for Industrial Development (MSME Incubator) – Worked as a Sr. Business Development Manager. ACE Engineering India Pvt Ltd – Worked as a Marketing Manager, HCL – Worked as a Sr. Product Support Engineer, Wipro Ltd. – Worked as a Technical Support Engineer, Total 10+ yrs of experience in various capacity. He has good Communication skill, Hard working and Honest.
        </p>
      </>
    ),
  },
  {
    id: 'anantdeep-bharadwaj',
    name: 'Mr. Anantdeep Bharadwaj',
    role: 'Lead - Back Office',
    image: '/anant-deep-2.jpg',
    description: (
      <>
        <p>
          Mr. Anantdeep Bhardwaj is postgraduate From Madhya Pradesh. He is working with Surya Foundation since last 12 years. During his association with Surya foundation, he has been involved in various social development projects run by Surya Foundation across the country. He was also a part of Surya Eklavya Sainik School Gujarat.
        </p>
        <p>
          He has been working with the country’s policy makers, so he has a good understanding about the bureaucratic system and know-hows of implementing policies at grass root level. He and his team worker have a good connect with the youths.
        </p>
      </>
    ),
  },
  {
    id: 'sandeep-gupta',
    name: 'Mr. Sandeep Gupta',
    role: 'Admin. Incharge - Bhaorao Deoras Seva Nyas',
    image: '/Sandeep-Ji.jpg',
    description: (
      <>
        <p>
          Mr. Sandeep Gupta is currently working as Office In-charge, Central Office, Delhi of Bhaorao Deoras Seva Nyas, since November 2019.
        </p>
        <p>
          Before joining BDSN, he had his business in the education sector. He has a rich work experience and a critical mindset to deliver quality projects. He is also involved with various social development initiatives and always ready to work for causes to support human beings.
        </p>
      </>
    ),
  },
];

export default function ProjectTeam() {
  useEffect(() => {
    document.title = 'Project Team - Samarth Bharat';
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Banner with exact purple-blue gradient matching WordPress */}
      <section
        className="py-14 sm:py-16 md:py-20 text-center text-white"
        style={{
          backgroundImage: 'linear-gradient(130deg, #004AAD 10%, #CB6CE6 95%)',
        }}
      >
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10">
          <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-[42px] font-extrabold leading-tight mb-3">
            Project Team
          </h1>
          <p className="font-['Montserrat',sans-serif] text-white/95 text-sm sm:text-base md:text-[17px] max-w-3xl mx-auto font-normal">
            Our team works passionately to turn ideas into action and vision into reality.
          </p>
        </div>
      </section>

      {/* Team Members List */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="space-y-12">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col md:flex-row items-start gap-6 lg:gap-8 pb-10 border-b border-gray-100 last:border-b-0"
              >
                {/* Member Photo */}
                <div className="w-full sm:w-48 md:w-44 lg:w-48 shrink-0 flex justify-center md:justify-start">
                  <div className="w-40 sm:w-44 lg:w-48 aspect-square rounded-[10%] overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://samarthbharat.net/wp-content/uploads/2025/05/Rahul-Ji.jpg';
                      }}
                    />
                  </div>
                </div>

                {/* Member Details */}
                <div className="flex-1">
                  {/* Name */}
                  <h2 className="font-serif text-[#001C5C] text-2xl sm:text-[26px] font-bold leading-tight mb-1">
                    {member.name}
                  </h2>

                  {/* Role / Designation */}
                  <p className="font-['Montserrat',sans-serif] text-[#F87902] font-semibold text-[14px] sm:text-[15px] mb-3">
                    {member.role}
                  </p>

                  {/* Bio / Description */}
                  <div className="font-['Montserrat',sans-serif] text-[#555555] text-[13.5px] sm:text-[14px] leading-[1.8] text-left sm:text-justify space-y-2.5">
                    {member.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
