export interface Course {
  slug: string;
  title: string;
  language: string;
  duration: string;
  certification: string;
  image: string;
  description: string;
  modules: string[];
  eligibility: string;
  careerOpportunities: string[];
}

export const courses: Course[] = [
  {
    slug: 'ac-fridge-repair-course',
    title: 'AC & Fridge Repair Training',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/ac-repair-course.jpg',
    description: 'A comprehensive training program that equips individuals with the practical skills needed to repair and maintain air conditioners and refrigerators. The course covers both fundamental and advanced concepts of refrigeration, electrical systems, and hands-on troubleshooting techniques.',
    modules: [
      'Introduction to Refrigeration & Air Conditioning',
      'Basic Electrical Concepts & Safety',
      'Compressor Types and Working Principles',
      'Refrigerant Gases and Their Properties',
      'Evaporator and Condenser Systems',
      'Capillary Tubes and Expansion Valves',
      'Troubleshooting Common AC Problems',
      'Refrigerator Repair and Maintenance',
      'Inverter AC Technology',
      'Field Training and Real-World Repair Practice',
    ],
    eligibility: '8th Class Pass',
    careerOpportunities: ['AC Technician', 'Refrigerator Repair Specialist', 'Service Engineer', 'Self-Employed Repair Business'],
  },
  {
    slug: 'beautician-course',
    title: 'Beautician Training Program',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/beautician-training-course.jpg',
    description: 'A professional beautician training program designed to empower women with skills in beauty, makeup, skincare, and personal care. The course provides hands-on training and industry-recognized certification to help participants start their own beauty parlour or secure jobs in the beauty industry.',
    modules: [
      'Introduction to Beauty Industry',
      'Skin Analysis and Skin Care',
      'Facial Treatments and Techniques',
      'Manicure and Pedicure',
      'Hair Cutting and Styling',
      'Bridal and Party Makeup',
      'Mehndi Application',
      'Nail Art and Extensions',
      'Threading and Waxing',
      'Salon Management and Client Handling',
    ],
    eligibility: '10th Class Pass',
    careerOpportunities: ['Beauty Parlour Owner', 'Bridal Makeup Artist', 'Salon Professional', 'Freelance Beautician'],
  },
  {
    slug: 'cutting-tailoring',
    title: 'Cutting & Tailoring',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/cutting-and-tailoring.jpg',
    description: 'A practical training program in cutting and tailoring that teaches participants the art of garment construction, from basic measurements to advanced stitching techniques. The course empowers individuals to start their own tailoring business or work in the garment industry.',
    modules: [
      'Introduction to Tailoring Tools and Materials',
      'Body Measurements and Sizing',
      'Pattern Making and Drafting',
      'Basic Cutting Techniques',
      'Stitching Methods (Hand & Machine)',
      'Garment Construction - Ladies Wear',
      'Garment Construction - Kids Wear',
      'Embellishments and Finishing',
      'Alterations and Fitting',
      'Business Basics for Tailoring',
    ],
    eligibility: '8th Class Pass',
    careerOpportunities: ['Tailoring Shop Owner', 'Garment Industry Worker', 'Fashion Designer Assistant', 'Freelance Tailor'],
  },
  {
    slug: 'digital-marketing-course',
    title: 'Digital Marketing',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/digital-marketing.jpg',
    description: 'A focused digital marketing course covering the essentials of online marketing, social media, SEO, and content strategy. Designed for aspiring marketers and small business owners to build a strong digital presence.',
    modules: [
      'Introduction to Digital Marketing',
      'Website Basics and WordPress',
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Google Ads and PPC',
      'Content Marketing',
      'Email Marketing',
      'Analytics and Reporting',
    ],
    eligibility: '10th Class Pass',
    careerOpportunities: ['Digital Marketing Executive', 'Social Media Manager', 'SEO Specialist', 'Freelance Marketer'],
  },
  {
    slug: 'bakery-course',
    title: 'Bakery Course',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/bakery-course.jpg',
    description: 'A hands-on bakery course that teaches the art and science of baking, from bread and cookies to cakes and pastries. Participants learn professional baking techniques and business skills to start their own bakery.',
    modules: [
      'Introduction to Baking Ingredients',
      'Bread Making Techniques',
      'Cookie and Biscuit Production',
      'Cake Baking and Decorating',
      'Pastry Making',
      'Hygiene and Food Safety',
      'Packaging and Presentation',
      'Bakery Business Basics',
    ],
    eligibility: '8th Class Pass',
    careerOpportunities: ['Bakery Owner', 'Pastry Chef', 'Bakery Production Worker', 'Home Bakery Business'],
  },
];

export interface SuccessStory {
  name: string;
  role: string;
  image: string;
  shortDescription: string;
  fullStory: string;
}

export interface CourseAnnouncement {
  title: string;
  link: string;
}

export const courseAnnouncements: CourseAnnouncement[] = [
  { title: 'Beautician and Nail Art Course', link: '/beautician-course' },
  { title: 'RACW Course', link: '/ac-fridge-repair-course' },
  { title: 'Bakery Course', link: '/bakery-course' },
  { title: 'GDA (General Duty Assistant Course', link: '/general-duty-assistant' },
  { title: 'Cutting & Tailoring Course', link: '/cutting-tailoring' },
  { title: 'Truck Repairing Course', link: '/truck-repairing-course' },
];

export const successStories: SuccessStory[] = [
  {
    name: 'Shubhash',
    role: 'Technician (Bluestar India)',
    image: 'https://samarthbharat.net/wp-content/uploads/2025/05/subhash-ac-technician.jpg',
    shortDescription: 'Once working long hours as a driver, Shubhash, a devoted husband and father of two, sought a better life closer to home.',
    fullStory: 'Once working long hours as a driver, Shubhash, a devoted husband and father of two, sought a better life closer to home. With guidance from his brother, he joined the AC & Refrigeration course at SOL Keshav Puram, under Samarth Bharat\'s CDC Program in collaboration with DU colleges and Udhmodya Foundation. Through dedication and hands-on training, he quickly built strong technical skills. After completing the course, Shubhash secured placement with Bluestar India in Panipat, earning ₹10,000/month — but more importantly, he now lives with his family. Today, he supports his loved ones and is saving to open his own AC service shop, proving that with the right skills and support, true transformation is possible.',
  },
  {
    name: 'Usha',
    role: 'Owner,Beauty Parlor',
    image: 'https://samarthbharat.net/wp-content/uploads/2025/05/usha-beautician.jpg',
    shortDescription: 'Usha – From Homemaker to Proud Parlour Owner, She is living in Paharganj with her family of six, Usha struggled to manage household expenses on her husband\'s single income.',
    fullStory: 'Usha – From Homemaker to Proud Parlour Owner. She is living in Paharganj with her family of six, Usha struggled to manage household expenses on her husband\'s single income. Determined to support her family, she enrolled in Samarth Bharat\'s Beautician Course at Tank Road, Karol Bagh. With hands-on training and expert guidance, she gained the skills and confidence needed to enter the beauty industry. After working in parlours to learn business operations, Usha eventually opened her own venture — New Shine Beauty Parlour. Today, she earns a steady income, runs a successful business, and inspires her daughters to become self-reliant. Her journey is a true example of how skill and determination can transform lives.',
  },
  {
    name: 'Kavita',
    role: 'Owner,Beauty Parlour',
    image: 'https://samarthbharat.net/wp-content/uploads/2025/05/kavita-beautician.jpg',
    shortDescription: 'After years of financial struggle and limited income from a small parlour, a mother of two children\'s from Karol Bagh found new direction through Samarth Bharat\'s Beautician & Nail Art Course at Tank Road Center.',
    fullStory: 'After years of financial struggle and limited income from a small parlour, a mother of two children from Karol Bagh found new direction through Samarth Bharat\'s Beautician & Nail Art Course at Tank Road Center. With updated skills and renewed confidence, she rebranded her parlour as "The Makeover Place" and now earns around ₹30,000/month. Beyond her success, she has also trained 7 other women, proving that upskilling not only transforms lives — it empowers communities.',
  },
  {
    name: 'Hari Om',
    role: 'Technician - LG Company',
    image: 'https://samarthbharat.net/wp-content/uploads/2025/05/Hari-om-technician.jpg',
    shortDescription: 'Once working as a Zomato delivery rider in Chirag Delhi, Hari Om chose not to give up on his dreams. With limited resources but strong determination, he enrolled in a 2-month AC & Fridge Repair course at Samarth Bharat\'s Malviya Nagar Center.',
    fullStory: 'Once working as a Zomato delivery rider in Chirag Delhi, Hari Om chose not to give up on his dreams. With limited resources but strong determination, he enrolled in a 2-month AC & Fridge Repair course at Samarth Bharat\'s Malviya Nagar Center. His dedication paid off — today, he is proudly employed at LG, one of India\'s leading companies. Hari Om\'s journey reflects the core belief of Samarth Bharat: with the right skills and guidance, transformation is possible. We are proud to be a part of his success and wish him a bright future ahead.',
  },
  {
    name: 'Khushboo',
    role: 'Technician (AC & RO)',
    image: 'https://samarthbharat.net/wp-content/uploads/2025/05/khushboo.jpg',
    shortDescription: 'Khushboo, a resident of Sangam Vihar, Delhi, chose a path that few women take — working in the AC and RO repair field. She completed her training from Samarth Bharat\'s Sangam Vihar Center, where she learned both technical skills and hands-on fieldwork.',
    fullStory: 'Khushboo, a resident of Sangam Vihar, Delhi, chose a path that few women take — working in the AC and RO repair field. She completed her training from Samarth Bharat\'s Sangam Vihar Center, where she learned both technical skills and hands-on fieldwork. In the beginning, people questioned her decision, but Khushboo stayed focused and turned every challenge into an opportunity. With support from her trainers and her own dedication, she became a skilled and confident technician. Today, Khushboo works independently and earns ₹18,000 per month. Her customers trust her and regularly call her for service. She is not only financially independent but also a role model for other women who want to do something different.',
  },
  {
    name: 'Badli Devi',
    role: 'Owner,Beauty Parlor',
    image: 'https://samarthbharat.net/wp-content/uploads/2025/05/badli-devi.jpg',
    shortDescription: 'After completing the Beautician Course at Samarth Bharat\'s Chhawla Training Center (Jan–June 2024), Mrs. Badli Devi transformed her life through skill, confidence, and determination.',
    fullStory: 'After completing the Beautician Course at Samarth Bharat\'s Chhawla Training Center (Jan–June 2024), Mrs. Badli Devi transformed her life through skill, confidence, and determination. Despite limited resources, she showed unwavering dedication throughout her training. Today, she successfully runs her own beauty parlour, earning around ₹16,000 per month. Her journey reflects the power of skill-based empowerment, and she now serves as an inspiration to many other women seeking self-reliance.',
  },
  {
    name: 'Neelam',
    role: 'Beautician',
    image: 'https://images.pexels.com/photos/4584590/pexels-photo-4584590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    shortDescription: 'Neelam\'s inspiring journey began with Batch 3 of the Beautician Course from Samarth Bharat in collaboration with Seva Bharti in Brahmpuri.',
    fullStory: 'Neelam\'s inspiring journey began with Batch 3 of the Beautician Course from Samarth Bharat in collaboration with Seva Bharti in Brahmpuri. Guided by her dedicated trainer, Ms. Kanchan, Neelam gained the professional skills and confidence needed to turn her passion into a livelihood. Today, she proudly runs her own beauty parlour and has taken on the role of a trainer herself, empowering other women by sharing the same knowledge that once changed her life. Her journey from a student to a mentor reflects the transformative power of skill development and community support.',
  },
  {
    name: 'Roopa Sharma',
    role: 'Beautician',
    image: 'https://images.pexels.com/photos/19119330/pexels-photo-19119330.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    shortDescription: 'Roopa Sharma successfully completed a 3-month Beautician Course from Samarth Bharat in collaboration with Seva Bharti, where she gained essential skills in beauty and personal care.',
    fullStory: 'Roopa Sharma successfully completed a 3-month Beautician Course from Samarth Bharat in collaboration with Seva Bharti, where she gained essential skills in beauty and personal care. With her dedication and the guidance she received during training, Roopa secured a job in the beauty sector, where she now earns around ₹9,000–₹10,000 per month. Her journey is a powerful example of how focused skill training can open the door to employment and self-reliance. Roopa\'s success continues to inspire other women to take their first step toward a better future.',
  },
  {
    name: 'Jyoti',
    role: 'Beautician',
    image: 'https://images.pexels.com/photos/5177992/pexels-photo-5177992.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    shortDescription: 'Jyoti, a young woman with dreams but limited means, joined the 3-month Beautician Course from Samarth Bharat in collaboration with Seva Bharti hoping to build a better future.',
    fullStory: 'Jyoti, a young woman with dreams but limited means, joined the 3-month Beautician Course from Samarth Bharat in collaboration with Seva Bharti hoping to build a better future. Despite facing personal and financial challenges, she remained committed to learning every day. Through the support of the trainers and her own dedication, Jyoti mastered the art of beauty and makeup. After completing the course, she secured a job earning ₹3,200 per month—a proud first step towards independence.',
  },
  {
    name: 'Mangal Singh',
    role: 'Shop Owner',
    image: 'https://images.pexels.com/photos/5254594/pexels-photo-5254594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    shortDescription: 'Mangal Singh, a resident of Trilokpuri, ran a small shop called Tanishka Electricals. After COVID-19 hit, he enrolled in the AC & Refrigeration Course at New Ashok Nagar Training Centre.',
    fullStory: 'Mangal Singh, a resident of Trilokpuri, ran a small shop called Tanishka Electricals, where he handled basic electrical repair work. Though the income was modest, it was enough to sustain his family. But then, like millions of others, he was hit hard by the COVID-19 pandemic. His shop came to a standstill, and work opportunities disappeared almost overnight. During this period of uncertainty and financial distress, Mangal heard about Samarth Bharat and the one-month AC and Refrigeration Course being offered at the New Ashok Nagar Training Centre. Wanting to strengthen his skills in his own field, he enrolled in the course from 6th December 2021 to 5th January 2022. After completing the course, Mangal began offering AC and refrigerator repair services at his shop and directly at clients\' homes. Slowly but surely, his network of customers began to grow. As demand increased, he decided to expand and brought on board three of his fellow trainees—Tejpal, Deepak, and Anil—to work with him across different areas. Today, Mangal earns between ₹30,000 to ₹40,000 per month, and each of his team members also earns ₹20,000 to ₹25,000 monthly.',
  },
  {
    name: 'Devaraj Singh',
    role: 'Technician - Urban Company',
    image: 'https://images.pexels.com/photos/27670390/pexels-photo-27670390.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    shortDescription: 'Devaraj Singh, once a small business owner, saw his life turn upside down during the COVID-19 pandemic. He enrolled in the AC and Refrigeration Course at New Ashok Nagar Training Centre.',
    fullStory: 'Devaraj Singh, once a small business owner, saw his life turn upside down during the COVID-19 pandemic. His business came to a halt, and with it, the financial stability of his family crumbled. Just when things seemed hopeless, a friend told him about Samarth Bharat and the vocational courses offered at their centers. Motivated to rebuild his life, Devaraj enrolled in the AC and Refrigeration Course at the New Ashok Nagar Training Centre on 6th December 2021. The training lasted only one month, but it was intense and highly practical. With renewed hope and skills in hand, Devaraj applied for a technician position at UrbanClap (now Urban Company). To his great relief, he was selected in the very first interview. Today, Devaraj is not just employed—he\'s thriving. He earns ₹50,000 to ₹60,000 per month, allowing him to support his family with pride and stability.',
  },
  {
    name: 'Sonu',
    role: 'Job - Perfect Finance Company',
    image: 'https://images.pexels.com/photos/12310724/pexels-photo-12310724.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    shortDescription: 'Sonu had always dreamed of working in the finance sector, but without proper training or experience, that dream felt distant. He enrolled in the Tally and GST Course offered by Samarth Bharat.',
    fullStory: 'Sonu had always dreamed of working in the finance sector, but without proper training or experience, that dream felt distant. Coming from a modest background, he knew he needed the right skills to make a breakthrough. His turning point came when he enrolled in the Tally and GST Course offered by Samarth Bharat. Determined to create a better future, Sonu committed himself fully to learning—grasping everything from accounting basics to practical GST applications. The course didn\'t just give him technical knowledge; it gave him confidence. After completing the training, Sonu was selected for a job at Perfect Finance Company in Green Park—his very first step into the professional world.',
  },
];

export interface EventItem {
  slug: string;
  title: string;
  date: string;
  dateFormatted: string;
  image: string;
  excerpt: string;
  fullContent: string;
}

export const events: EventItem[] = [
  {
    slug: 'foundation-of-innovation-workshop',
    title: 'Foundation of Innovation Workshop (16–18 February 2026)',
    date: '2026-03-07',
    dateFormatted: 'March 7, 2026',
    image: 'https://images.pexels.com/photos/7413911/pexels-photo-7413911.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    excerpt: 'A three-day workshop titled "Foundation of Innovation" was organized from 16 to 18 February 2026 under the aegis of the Career Development Centre. The workshop aimed to develop entrepreneurial thinking, innovation capabilities, and problem-solving skills among participants.',
    fullContent: 'A three-day workshop titled "Foundation of Innovation" was organized from 16 to 18 February 2026 under the aegis of the Career Development Centre. The workshop aimed to develop entrepreneurial thinking, innovation capabilities, and problem-solving skills among participants. Through expert sessions, discussions, and practical activities, participants were introduced to the fundamentals of entrepreneurship, innovation processes, design thinking, and business model development. The workshop emphasized transforming ideas into practical solutions that create both social and economic value.\n\nDay 1: Entrepreneurial Mindset, Innovation, and Opportunity Recognition\nThe first day of the workshop focused on cultivating an entrepreneurial mindset and helping participants recognize opportunities in their surroundings. Expert speakers shared insights on how innovation drives business success and social impact.\n\nDay 2: Design Thinking and Problem Solving\nThe second day dove into design thinking methodologies, guiding participants through the process of identifying problems, brainstorming solutions, and prototyping ideas.\n\nDay 3: Business Model Development and Pitching\nThe final day centered on building sustainable business models and developing effective pitching skills. Participants presented their ideas to a panel of experts and received valuable feedback.',
  },
  {
    slug: 'samarth-bharat-vichar-goshti-2026',
    title: 'Samarth Bharat Vichar Goshti 2026',
    date: '2026-01-15',
    dateFormatted: 'January 15, 2026',
    image: 'https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    excerpt: 'Date: 15 January 2026 | Venue: NDMC Convention Centre, Sansad Marg, New Delhi | Theme: "Skilled Youth for a Capable India; Capable Youth for a Developed India"',
    fullContent: 'On 15 January 2026, Samarth Bharat successfully organized the Samarth Bharat Seminar 2026 at the prestigious NDMC Convention Centre, Sansad Marg, New Delhi, bringing together distinguished leaders, industry experts, policymakers, educators, and aspiring youth under the inspiring theme, "Skilled Youth for a Capable India; Capable Youth for a Developed India."\n\nThe seminar served as a powerful platform to promote the vision of a skilled, self-reliant, and empowered India. Distinguished leaders shared their perspectives on the critical role of skill development in nation-building. Industry experts highlighted emerging trends and the growing demand for skilled professionals across sectors.\n\nThe event featured panel discussions, keynote addresses, and interactive sessions that inspired young participants to pursue skill-based careers and entrepreneurial ventures. The seminar reinforced Samarth Bharat\'s commitment to building a skilled workforce that contributes meaningfully to India\'s growth story.',
  },
  {
    slug: 'dseu-signs-mou',
    title: 'DSEU Signs MoU with Samarth Bharat and Sewa Bharti to Promote Skill Development and Social Upliftment',
    date: '2025-10-17',
    dateFormatted: 'October 17, 2025',
    image: 'https://images.pexels.com/photos/26202153/pexels-photo-26202153.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    excerpt: 'New Delhi, October 17, 2025: Delhi Skill and Entrepreneurship University (DSEU) signed Memorandums of Understanding (MoUs) with Samarth Bharat and Sewa Bharti on 17 October 2025, to collaboratively strengthen skill development, social empowerment, and community engagement initiatives.',
    fullContent: 'New Delhi, October 17, 2025: Delhi Skill and Entrepreneurship University (DSEU) signed Memorandums of Understanding (MoUs) with Samarth Bharat and Sewa Bharti on 17 October 2025, to collaboratively strengthen skill development, social empowerment, and community engagement initiatives in alignment with the vision of Viksit Bharat 2047.\n\nThe ceremony began with a warm welcome address by Dr. Pankaj Lathar, Joint Director (Public Relations) and Campus Director, DSEU Dwarka, who extended greetings to all dignitaries and partners present, including Dr. Shonal Gupta (Coordinator), Sh. Nikhil Bansal (Patron), Sh. Rakesh Kumar Gupta (Co-coordinator), Prof. faculty members, and students.\n\nThe MoUs outline a framework for collaboration in areas including joint skill development programs, entrepreneurship incubation, industry-academia partnerships, community outreach, and research initiatives. This partnership marks a significant milestone in advancing the shared mission of empowering youth through education and skill development.',
  },
  {
    slug: 'seed-fund-accelerator-pitching',
    title: 'Seed Fund Accelerator Pitching Competition',
    date: '2025-09-24',
    dateFormatted: 'September 24, 2025',
    image: 'https://images.pexels.com/photos/7413911/pexels-photo-7413911.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    excerpt: 'In pursuit of nurturing innovation and entrepreneurial spirit, the Udhmodya Committee of Shivaji College organized the Seed Fund Accelerator Pitching Competition on September 24, 2025, at the college premises in Raja Garden, New Delhi.',
    fullContent: 'In pursuit of nurturing innovation and entrepreneurial spirit, the Udhmodya Committee of Shivaji College organized the Seed Fund Accelerator Pitching Competition on September 24, 2025, at the college premises in Raja Garden, New Delhi. The event provided a vibrant platform for budding entrepreneurs to showcase their early-stage startups, with the aim of turning their innovative ideas into reality through expert mentorship and essential financial support.\n\nThe competition witnessed enthusiastic participation from young innovators, whose passion and creativity created an atmosphere of dynamism and collaboration. The presence of esteemed dignitaries added immense value to the program. Participants pitched their ideas across diverse domains including technology, social impact, sustainability, and consumer services.\n\nThe jury panel, comprising industry veterans and investment experts, evaluated each pitch on criteria including innovation, feasibility, market potential, and social impact. Winners received seed funding and mentorship support to take their ventures forward.',
  },
  {
    slug: 'my-career-my-choice',
    title: 'My Career, My Choice – A Step Towards Clarity in Career Building',
    date: '2025-09-17',
    dateFormatted: 'September 17, 2025',
    image: 'https://images.pexels.com/photos/36772957/pexels-photo-36772957.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    excerpt: 'The Career Development Cell (Samarth Bharat), under the Innovation and Incubation Cell (Udhmodya Foundation) of Mata Sundri College for Women, organised an insightful workshop on "My Career, My Choice" on 17th September 2025.',
    fullContent: 'The Career Development Cell (Samarth Bharat), under the Innovation and Incubation Cell (Udhmodya Foundation) of Mata Sundri College for Women, organised an insightful workshop on "My Career, My Choice" on 17th September 2025 at Bebe Nanki Hall. The session was graced by the guest speaker Mr. Shonal Gupta, Convenor – Samarth Bharat, and witnessed the participation of over 80+ enthusiastic students from across courses and years.\n\nThe workshop began with an interactive activity, where students were invited to share their career status through two engaging boards – "Career Wall" and "Aspiration Board". This activity set the tone for an open and reflective session where students explored their career interests, strengths, and aspirations.\n\nMr. Shonal Gupta shared valuable insights on career planning, the importance of skill development, and how students can align their passions with professional opportunities. The session concluded with a Q&A segment where students actively participated and sought personalized guidance.',
  },
  {
    slug: 'training-to-self-employment-success-story',
    title: 'Success Story Program of Self Employed Trainees at Shaheed Bhagat Singh College, New Delhi',
    date: '2025-06-03',
    dateFormatted: 'June 3, 2025',
    image: 'https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    excerpt: 'Date: 3 June 2025 | Location: Shaheed Bhagat Singh College, New Delhi. The Training to Self-Employment Success Story Program was a celebration of individuals who transformed their lives through the skill training provided by Samarth Bharat Training Centers.',
    fullContent: 'Date: 3 June 2025 | Location: Shaheed Bhagat Singh College, New Delhi. The Training to Self-Employment Success Story Program at Shaheed Bhagat Singh College, was a celebration of individuals who transformed their lives through the skill training provided by Samarth Bharat Training Centers. These centers, established in various urban and semi-urban settlements, have empowered hundreds to become self-reliant and financially independent.\n\nWhat began as a simple skill-training initiative is now producing extraordinary results. Several individuals who completed the training are now earning ₹1 lakh or more per month, while many others have secured stable employment or started their own ventures. The event featured inspiring talks by successful trainees who shared their journeys from hardship to self-reliance.\n\nThe program also highlighted the impact of Samarth Bharat\'s training centers across Delhi-NCR, showcasing how skill development creates pathways to dignified livelihoods and economic independence. Dignitaries and guests praised the organization\'s commitment to grassroots empowerment.',
  },
];

export const reports = {
  yearly: [
    { label: 'SB Report 2024-2025', url: 'https://drive.google.com/file/d/1Wy3ZfhG_EXhe30yxx9igdKjtGUkfas9T/view?usp=sharing' },
    { label: 'SB Report 2023-2024', url: 'https://samarthbharat.net/wp-content/uploads/2025/08/SB-Report-2023-2024.pdf' },
  ],
  monthly: [
    { label: 'SB Report July-2026', url: 'https://drive.google.com/file/d/154Y2HHrS3X2EGtsv2F_VmJGnTuPHCGrO/view?usp=sharing' },
    { label: 'SB Report June-2026', url: 'https://drive.google.com/file/d/1jkugIR-DHru9ChsTr1PJDjyej2rsc7Br/view?usp=sharing' },
    { label: 'SB Report May-2026', url: 'https://drive.google.com/file/d/1nFPB8RLfTP4zDSLoLRDdAf-Bx_jftfmF/view?usp=sharing' },
    { label: 'SB Report April-2026', url: 'https://drive.google.com/file/d/16JMHsJ57UiZo-6HhJekSaf6MJ_0Kv4x5/view?usp=sharing' },
    { label: 'SB Report Mar-2026', url: 'https://drive.google.com/file/d/170qzJg1raDDwfN3Q-1coUepVPoE3K-3Y/view?usp=sharing' },
    { label: 'SB Report Feb-2026', url: 'https://drive.google.com/file/d/1UFlzZOd3dD3m2fLkmH8LDDOQEOEdI-il/view?usp=sharing' },
    { label: 'SB Report Jan-2026', url: 'https://drive.google.com/file/d/1FTtYnO25zOZidqpVl6YEXzRN0ndBnruw/view?usp=sharing' },
    { label: 'SB Report Dec-2025', url: 'https://drive.google.com/file/d/137mXoajT3P3qs75kHnQhtzrRfg5MM0nW/view?usp=sharing' },
    { label: 'SB Report Nov-2025', url: 'https://drive.google.com/file/d/1S3ghSnhWulJt-VGGY3TwHc5QMUqEmMzu/view?usp=sharing' },
    { label: 'SB Report Oct-2025', url: 'https://drive.google.com/file/d/1M_MmW06Wk3jFiEEj4Hb4u-5pHKPQAA6T/view' },
    { label: 'SB Report Sep-2025', url: 'https://samarthbharat.net/wp-content/uploads/2025/10/September-2025-Samarth-Gatha.pdf' },
    { label: 'SB Report Aug-2025', url: 'https://samarthbharat.net/wp-content/uploads/2025/09/Samarth-Bharat-August-2025-Report.pdf' },
    { label: 'SB Report July-2025', url: 'https://samarthbharat.net/wp-content/uploads/2025/08/July-2025-Samarth-Gatha.pdf' },
    { label: 'SB Report June-2025', url: 'https://samarthbharat.net/wp-content/uploads/2025/08/Samarth-Bharat-June-2025-Report.pdf' },
    { label: 'SB Report May-2025', url: 'https://samarthbharat.net/wp-content/uploads/2025/08/Samarth-Bharat-May-2025-Report.pdf' },
    { label: 'SB Report April-2025', url: 'https://samarthbharat.net/wp-content/uploads/2025/08/Samarth-Bharat-April-2025-Report.pdf' },
    { label: 'SB Report Mar-2025', url: 'https://samarthbharat.net/wp-content/uploads/2025/08/Samarth-Bharat-March-2025-Report.pdf' },
    { label: 'SB Report Feb-2025', url: 'https://samarthbharat.net/wp-content/uploads/2025/08/Samarth-Bharat-February-2025-Report.pdf' },
    { label: 'SB Report Jan-2025', url: 'https://samarthbharat.net/wp-content/uploads/2025/08/Samarth-Bharat-January-2025-Report.pdf' },
    { label: 'SB Report Dec-2024', url: 'https://samarthbharat.net/wp-content/uploads/2025/08/Samarth-Bharat-December-2024-Report.pdf' },
    { label: 'SB Report Nov-2024', url: 'https://samarthbharat.net/wp-content/uploads/2025/08/Samarth-Bharat-October-2024-Report.pdf' },
    { label: 'SB Report Oct-2024', url: 'https://samarthbharat.net/wp-content/uploads/2025/08/Samarth-Bharat-October-2024-Report.pdf' },
  ],
};

export const announcements = [
  'Samarth Bharat Vichar Goshti 2026 - 15 January 2026 at NDMC Convention Centre, New Delhi',
  'Foundation of Innovation Workshop - 16-18 February 2026 at Career Development Centre',
  'DSEU Signs MoU with Samarth Bharat and Sewa Bharti - October 17, 2025',
  'Seed Fund Accelerator Pitching Competition - September 24, 2025 at Shivaji College',
  'New Batch Starting: AC & Fridge Repair Training - Enroll Now!',
  'Beautician Training Program - New Batch Starting Soon at Multiple Centers',
];

export interface Supporter {
  name: string;
  logo: string;
}

export const supporters: Supporter[] = [
  { name: 'Agarwal Packers and Movers', logo: '/supporters/Agarwal-Packers-and-Movers.png' },
  { name: 'ASDC', logo: '/supporters/ASDC.png' },
  { name: 'Crystal Crop', logo: '/supporters/Crystal-Crop.png' },
  { name: 'Delhi University', logo: '/supporters/Delhi-University.png' },
  { name: 'Eicher', logo: '/supporters/Eicher.png' },
  { name: 'Jan Samar Foundation', logo: '/supporters/jan-samar.png' },
  { name: 'Khadi India', logo: '/supporters/Khadi-India.png' },
  { name: 'KVIC', logo: '/supporters/KVIC.png' },
  { name: 'Laghu Udyog', logo: '/supporters/laghu-udyog.png' },
  { name: 'Nextra Developers', logo: '/supporters/Nextra-Developers.png' },
  { name: 'Railtel', logo: '/supporters/Railtel.png' },
  { name: 'Worko', logo: '/supporters/worko.png' },
];

