export interface CTPCourseItem {
  id: number;
  title: string;
  language: string;
  duration: string;
  certification: string;
  image: string;
  wpImage: string;
  slug: string;
}

export interface CTPCenterItem {
  sNo: number;
  state: string;
  trainingName: string;
  address: string;
  googleLocationUrl: string;
  contactPhone?: string;
}

export const ctpBanner = {
  title: 'Community\nTraining Programs',
  singleLineTitle: 'Community Training Programs',
  subtitle: 'Samarth Bharat empowers youth with 14 skill-based courses across 53+ centers to reduce unemployment and bridge skill gaps.',
  bannerImage: '/community-training-banner.jpeg',
  wpBannerImage: 'https://samarthbharat.net/wp-content/uploads/2025/08/community-training-pics-scaled.jpeg',
};

export const ctpIntro = {
  heading: 'Community\nTraining Programs',
  singleLineHeading: 'Community Training Programs',
  paragraphs: [
    'Samarth Bharat’s Community Training Program has played a vital role in addressing unemployment and reducing skill gaps among underserved youth and communities. Operating across 53+ centers, the program offers 14 industry-aligned training modules, including Air Conditioning (AC) and refrigerator installation and repair, Basic computer literacy, Beautician training, Bakery, Carpentry, Cutting & tailoring, Digital marketing, Electrician, Fashion designing, General Duty Assistant (GDA), Hair styling, Home appliance repair, Nail art, RO installation and repair, Plumbing, Bike Repairing and Truck maintenance.',
    'By providing hands-on, employment-focused training, the program has enabled thousands of individuals to pursue gainful employment or launch their own micro-enterprises. Each training center emphasizes not only technical skill-building but also career readiness and long-term support, ensuring participants are equipped for sustainable livelihoods.',
    'Our trainers are professionally certified and regularly upskilled to maintain high instructional quality. They combine industry experience with a learner-centered approach, contributing significantly to program outcomes.',
    'To ensure quality and credibility, Samarth Bharat works in partnership with recognized institutions such as the Khadi and Village Industries Commission (KVIC) and the Automotive Skills Development Council (ASDC). These collaborations ensure alignment with national standards and offer certifications that enhance employability and recognition in the workforce.',
  ],
};

export const ctpCoursesList: CTPCourseItem[] = [
  {
    id: 1,
    title: 'AC & Fridge Repair Training',
    language: 'Hindi',
    duration: '2 Month',
    certification: 'Yes',
    image: '/courses/ac-repair-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/AC-repair-course.jpg',
    slug: '/ac-fridge-repair-course',
  },
  {
    id: 2,
    title: 'Bakery Course',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/bakery-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/Untitled-design-3.jpg',
    slug: '/bakery-course',
  },
  {
    id: 3,
    title: 'Beautician Training Program',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/beautician-training-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/beautician-training-course.jpg',
    slug: '/beautician-course',
  },
  {
    id: 4,
    title: 'Digital Marketing',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/digital-marketing.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/Untitled-design-2.jpg',
    slug: '/digital-marketing-course',
  },
  {
    id: 5,
    title: 'Nail Art Course',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/nail-art.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/Nail-Art-Course.jpg',
    slug: '/nail-art-course',
  },
  {
    id: 6,
    title: 'RO Repairing Course',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/ro-repairing.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/RO-Repairin-Course.jpg',
    slug: '/ro-repairing-course',
  },
  {
    id: 7,
    title: 'Truck Repairing',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/truck-repairing-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/truck-repairing-course.jpg',
    slug: '/truck-repairing-course',
  },
  {
    id: 8,
    title: 'Carpenter Training',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/carpenter-training.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/05/Carpenter-Training-SB.jpg',
    slug: '/carpenter-training',
  },
  {
    id: 9,
    title: 'GDA (General Duty Assistant) Training',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/gda-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/08/GDA-course.jpg',
    slug: '/general-duty-assistant',
  },
  {
    id: 10,
    title: 'Cutting & Tailoring',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/cutting-tailoring-course.jpg',
    wpImage: 'https://samarthbharat.net/wp-content/uploads/2025/08/Cutting-Tailoring-Course.jpg',
    slug: '/cutting-tailoring',
  },
];
