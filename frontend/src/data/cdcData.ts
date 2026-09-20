export interface CDCOffer {
  id: number;
  title: string;
  desc: string;
  image: string;
  wpImage: string;
}

export interface CDCCourse {
  id: number;
  title: string;
  language: string;
  duration: string;
  certification: string;
  image: string;
  wpImage: string;
  slug: string;
}

export interface PartnerCollege {
  sno: number;
  name: string;
}

export const cdcBanner = {
  title: 'Career Development Centre (CDC)',
  bannerImage: '/cdc/banner.png',
  wpBannerImage: 'https://samarthbharat.net/wp-content/uploads/2025/07/CDC-career-development-centers.png',
};

export const cdcIntro = {
  heading: 'Career Development Centre (CDC)',
  paragraphs: [
    'Samarth Bharat in collaboration with the University of Delhi has embarked on an innovative venture to establish CDCs across various colleges of University of Delhi, aiming to equip students with the necessary tools and insights to navigate the complexities of entrepreneurship and the startup world.',
    'CDC initiative took a major step forward on February 7th, 2023, with a launch program held at the University of Delhi. This program marked the official launch of the CDCs. The event brought together distinguished guests, featuring unicorn startup founders, Venture Capitalists (VCs) and university officials. This diverse group alongside a vibrant student community, created a dynamic atmosphere for exploring multiple career possibilities.',
    'The program was informative and inspirational. Success stories from prominent figures in the entrepreneurial and professional landscape were showcased, offering valuable insights and emphasizing potential pathways for future generations. The CDC launch signifies a commitment to bridging the gap between academia and industry.',
    'In a significant move to formalize this initiative, a Memorandum of Understanding (MoU) was signed between University of Delhi, the University’s School of Open Learning (SOL), Samarth Bharat and 20 colleges affiliated with the University. The number of MoUs with colleges has now increased to 47. This collaboration underscores the effort and commitment towards nurturing a supportive ecosystem for student development and entrepreneurial advancement.',
  ],
};

export const cdcOffers: CDCOffer[] = [
  {
    id: 1,
    title: 'Mentorship That Matters',
    desc: 'Connect with industry experts, startup founders, and inspiring alumni.',
    image: '/cdc/offers/Mentorship-That-Matters.png',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/07/Mentorship-That-Matters.png',
  },
  {
    id: 2,
    title: 'Startup Launchpad',
    desc: 'In-house incubation supports idea development and testing.',
    image: '/cdc/offers/Startup-Launchpad.png',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/07/Startup-Launchpad.png',
  },
  {
    id: 3,
    title: 'Access to Investment',
    desc: 'Networking events link students to venture capitalists and angel investors.',
    image: '/cdc/offers/Access-to-Investment.png',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/07/Access-to-Investment.png',
  },
  {
    id: 4,
    title: 'Entrepreneurial Learning',
    desc: 'Structured programs with hands-on content and expert guidance.',
    image: '/cdc/offers/Entrepreneurial-Learning.png',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/07/Entrepreneurial-Learning.png',
  },
  {
    id: 5,
    title: 'Skill-Building & Readiness',
    desc: 'Career counselling, personality development, and employability training.',
    image: '/cdc/offers/Skill-Building-Readiness.png',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/07/Skill-Building-Readiness.png',
  },
];

export const cdcSideImage = {
  image: '/cdc/workshop-side.jpg',
  wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/03/77ffed27-9e0b-4220-b6cf-60876a9b7be0-3-1024x768.jpg',
  alt: 'CDC Workshop and Innovation Lab',
};

export const partnerCollegesList: PartnerCollege[] = [
  { sno: 1, name: 'Acharya Narendra Dev College' },
  { sno: 2, name: 'Aditi Mahavidyalaya' },
  { sno: 3, name: 'Aryabhatta College' },
  { sno: 4, name: 'Atma Ram Sanatan Dharma College' },
  { sno: 5, name: 'Bhagini Nivedita College' },
  { sno: 6, name: 'Bharti College' },
  { sno: 7, name: 'Bhaskaracharya College of Applied Sciences' },
  { sno: 8, name: 'College of Vocational Studies' },
  { sno: 9, name: 'Daulat Ram College' },
  { sno: 10, name: 'Dyal Singh College (Morning)' },
  { sno: 11, name: 'Dyal Singh College (Evening)' },
  { sno: 12, name: 'Deen Dayal Upadhyay College' },
  { sno: 13, name: 'Delhi College of Arts and Commerce' },
  { sno: 14, name: 'Deshbandhu College' },
  { sno: 15, name: 'Hansraj College' },
  { sno: 16, name: 'Indraprastha College for Women' },
  { sno: 17, name: 'Kamala Nehru College' },
  { sno: 18, name: 'Kirori Mal College' },
  { sno: 19, name: 'Lakshmibai College' },
  { sno: 20, name: 'Maharaja Agrasen College' },
  { sno: 21, name: 'Maitreyi College' },
  { sno: 22, name: 'Mata Sundari College for Women' },
  { sno: 23, name: 'P.G.D.A.V. College (Morning)' },
  { sno: 24, name: 'P.G.D.A.V. College (Evening)' },
  { sno: 25, name: 'Ramanujan College' },
  { sno: 26, name: 'Ramjas College' },
  { sno: 27, name: 'School of Open Learning (DU SOL)' },
  { sno: 28, name: 'Shaheed Bhagat Singh College (Evening)' },
  { sno: 29, name: 'Shaheed Bhagat Singh College (Morning)' },
  { sno: 30, name: 'Shivaji College' },
  { sno: 31, name: 'Sri Aurobindo College (Morning)' },
  { sno: 32, name: 'Sri Aurobindo College (Evening)' },
  { sno: 33, name: 'Sri Guru Tegh Bahadur Khalsa College' },
  { sno: 34, name: 'Zakir Husain Delhi College' },
];

export const partnerCollegeLogos = [
  { name: 'Acharya Narendra Dev College', file: 'Acharya-Narendra-Dev-College.png' },
  { name: 'Aditi Mahavidyalaya', file: 'Aditi-mahavidyalay.png' },
  { name: 'Aryabhatta College', file: 'aryabhatta-college.png' },
  { name: 'Atma Ram Sanatan Dharma College', file: 'atma-ram-santan-dharm-college.png' },
  { name: 'Bhagini Nivedita College', file: 'bhagini-nivedita-college.png' },
  { name: 'Bharati College', file: 'bharati-college.png' },
  { name: 'College of Vocational Studies', file: 'College-of-Vocational-Studies.png' },
  { name: 'Daulat Ram College', file: 'Daulat-ram-college.png' },
  { name: 'Deen Dayal Upadhyay College', file: 'deen-dyal-upadhyay-collge.png' },
  { name: 'Delhi College of Arts and Commerce', file: 'Delhi-college-of-arts-and-commerce.png' },
  { name: 'Deshbandhu College', file: 'deshbandhu-college.png' },
  { name: 'Dyal Singh College', file: 'dyal-singh-college.png' },
  { name: 'Hansraj College', file: 'hansraj-College.png' },
  { name: 'Indraprastha College for Women', file: 'Indraprastha-College-for-Women.png' },
  { name: 'Kamala Nehru College', file: 'kamala-nehru-college.png' },
  { name: 'Kirori Mal College', file: 'kirori-mal-college.png' },
  { name: 'Maharaja Agrasen College', file: 'maharaja-agarsen-college.png' },
  { name: 'Mata Sundari College', file: 'Mata-Sundari-College.png' },
  { name: 'Maitreyi College', file: 'metry-college.png' },
  { name: 'PGDAV College', file: 'PGDAV-College.png' },
  { name: 'Ramanujan College', file: 'ramanujan-college.png' },
  { name: 'Ramjas College', file: 'ramjas-college.png' },
  { name: 'Shaheed Bhagat Singh College', file: 'shaheed-bhagat-singh-college.png' },
  { name: 'Shivaji College', file: 'shivaji-college.png' },
  { name: 'Shri Guru Tegh Bahadur Khalsa College', file: 'shri-guru-tegh-bahadur-khalsa-college.png' },
  { name: 'DU SOL', file: 'sol-college.png' },
  { name: 'Sri Aurobindo College', file: 'sri-aurobindo-college.png' },
  { name: 'Zakir Husain Delhi College', file: 'Zakir-husain-college.png' },
];

export const cdcCourses: CDCCourse[] = [
  {
    id: 1,
    title: 'Video Editing Course',
    language: 'English',
    duration: '60 Hrs',
    certification: 'Yes',
    image: '/courses/video-editing.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/SB-Video-Editing-Course-2.jpg',
    slug: '/video-editing-course',
  },
  {
    id: 2,
    title: 'AI - Prompt Engineering',
    language: 'English',
    duration: '40 Hrs',
    certification: 'Yes',
    image: '/courses/ai-prompt-engineering.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/AI-promp-engineering.jpg',
    slug: '/ai-prompt-engineering',
  },
  {
    id: 3,
    title: 'Flutter App Development',
    language: 'English',
    duration: '40 Hrs',
    certification: 'Yes',
    image: '/courses/flutter-app.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/Aldenaire-Partners.jpg',
    slug: '/flutter-app-development',
  },
  {
    id: 4,
    title: 'Digital Marketing',
    language: 'English',
    duration: '40 Hrs',
    certification: 'Yes',
    image: '/courses/digital-marketing.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/Untitled-design-2.jpg',
    slug: '/digital-marketing-course',
  },
  {
    id: 5,
    title: 'Bakery Course',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/bakery-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/Untitled-design-3.jpg',
    slug: '/bakery-course',
  },
  {
    id: 6,
    title: 'AC & Fridge Repair Training',
    language: 'Hindi',
    duration: '2 Months',
    certification: 'Yes',
    image: '/courses/ac-repair-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/AC-repair-course.jpg',
    slug: '/ac-fridge-repair-course',
  },
  {
    id: 7,
    title: 'Beautician Training Program',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/beautician-training-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/beautician-training-course.jpg',
    slug: '/beautician-course',
  },
  {
    id: 8,
    title: 'Nail Art Course',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/nail-art.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/Nail-Art-Course.jpg',
    slug: '/nail-art-course',
  },
  {
    id: 9,
    title: 'RO Repairing Course',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/ro-repairing.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/RO-Repairin-Course.jpg',
    slug: '/ro-repairing-course',
  },
];

export const featuredSliderCourses: CDCCourse[] = [
  {
    id: 101,
    title: 'AC & Fridge Repair Training',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/ac-repair-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/AC-repair-course.jpg',
    slug: '/ac-fridge-repair-course',
  },
  {
    id: 102,
    title: 'Beautician Training Program',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/beautician-training-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/beautician-training-course.jpg',
    slug: '/beautician-course',
  },
  {
    id: 103,
    title: 'Cutting & Tailoring',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/cutting-and-tailoring.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/cutting-and-tailoring.jpg',
    slug: '/cutting-tailoring',
  },
  {
    id: 104,
    title: 'Digital Marketing',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/digital-marketing.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/Untitled-design-2.jpg',
    slug: '/digital-marketing-course',
  },
  {
    id: 105,
    title: 'Bakery Course',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/bakery-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/Untitled-design-3.jpg',
    slug: '/bakery-course',
  },
];
