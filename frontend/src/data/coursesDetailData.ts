export interface CourseModuleItem {
  title: string;
  items: string[];
}

export interface CourseCenterItem {
  state: string;
  trainingName: string;
  address: string;
  googleLocationUrl: string;
}

export interface DetailedCourse {
  slug: string;
  title: string;
  language: string;
  duration: string;
  certification: string;
  image: string;
  wpImageFallback: string;
  description: string;
  moduleSections: CourseModuleItem[];
  eligibility: string;
  centers: CourseCenterItem[];
}

export const detailedCourses: Record<string, DetailedCourse> = {
  'ac-fridge-repair-course': {
    slug: 'ac-fridge-repair-course',
    title: 'AC & Fridge Repair Training',
    language: 'Hindi',
    duration: '2 Month',
    certification: 'KVIC',
    image: '/courses/ac-repair-course.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/AC-repair-course-1.jpg',
    description:
      'Become a certified technician with our industry-leading repairing course designed to equip you with practical skills and hands-on training. This program covers complete repairing and maintenance techniques for Air Conditioners (AC), Refrigerators, RO Water Purifiers, and Washing Machines.',
    moduleSections: [
      {
        title: 'Air Conditioner –',
        items: [
          'Introduction & Types of AC (Window, Split, Inverter)',
          'Mechanical Refrigeration Cycle & Thermodynamics',
          'Electrical Systems and Circuit Diagrams – AC wiring, relays, capacitors and thermostats',
          'Types of Refrigerants (R22, R410A, R32, etc.) & Safety Protocols',
          'Parts of Window AC and their Testing – compressor, condenser, evaporator, expansion valve, blower motor',
          'Parts of Split AC and their Testing – outdoor and indoor units, inverter technology',
          'Service of Window and Split AC – Dry & Wet Cleaning',
          'Leakage Testing & Copper Tube Brazing',
          'Swaging & Flaring Techniques',
          'Gas Charging & Vacuuming Process',
          'Installation & Uninstallation of Window & Split AC',
        ],
      },
      {
        title: 'Refrigerator –',
        items: [
          'Introduction of Refrigerator Principles',
          'Types of Refrigerator – Frost-Free & Direct Cool',
          'Mechanical Refrigeration Cycle for Domestic Refrigerators',
          'Parts of Refrigerator and Electrical Wiring',
          'Functioning and Testing of Parts – Compressor, condenser, evaporator, expansion valve, thermostat, and defrost timer/bimetal',
          'Gas Charging & Capillary Tube Flushing',
          'Troubleshooting and Diagnostics of Refrigerator Faults',
        ],
      },
      {
        title: 'Washing Machine –',
        items: [
          'Principle & Types of Washing Machine (Semi & Fully Automatic)',
          'Fully Automatic Washing Machine (Top & Front Load) Working',
          'Parts of FAW/M: Functioning, PCB Diagnostics and Testing',
          'Troubleshooting Faults in FAW/M (Water inlet valve, drain pump, door lock)',
          'Semi-Automatic Washing Machine Working Principles',
          'Parts of SAW/M: Motor, Gearbox, Pulsator & Spin Tub Testing',
          'Troubleshooting and Maintenance in SAW/M',
        ],
      },
      {
        title: 'RO – Water Purifier',
        items: [
          'Introduction to RO / Water Purifier Technology & Water TDS',
          'Components: Sediment Filter, Pre-Carbon, RO Membrane, Post-Carbon, UV & UF Stages',
          'Booster Pump, Solenoid Valve & Float Switch Testing',
          'Installation of Domestic & Commercial RO Units',
          'Service, Filter Replacement & Troubleshooting Low Pressure or TDS issues',
        ],
      },
    ],
    eligibility: '10th pass and above | Anyone willing to start a career in appliance repairing',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'AC/Refrigerator/RO',
        address: 'F-146, Old Seemapuri, Block -E, Dilshad Garden, Delhi-110095',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.6809709%2C77.3298666&z=17&hl=en',
      },
      {
        state: 'Delhi/UP',
        trainingName: 'AC/Refrigerator/RO',
        address:
          'House No – 128, Block – A, Sec – 1, Vandana Vihar, Thapar Gate Road, Khora Colony, Ghaziabad, UP – 201309 (Near Kalu Cement Agency)',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.612825%2C77.3449433&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'AC/Refrigerator/RO',
        address:
          'A-7, 3rd Floor, Okhla Industrial Area, Phase 1, Behind Crowne Plaza Hotel, Near Police Station, New Delhi-110020',
        googleLocationUrl: 'https://maps.app.goo.gl/tVNz89ZyLG4QDYfW8',
      },
      {
        state: 'Delhi',
        trainingName: 'AC/Refrigerator/RO',
        address: 'E 6-103, A, Sangam Vihar, New Delhi – 110080',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.5043009%2C77.2472056&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'AC/Refrigerator/RO',
        address: '854, Bhabhad Chowk, Bijwasan, Delhi – 110061',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.5329631%2C77.0529618&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'AC/Refrigerator/RO',
        address:
          'C-34, Nawada Housing Complex, Near Dwarka Mor Metro Station, Pillar No. 792, Vipin Garden, Uttam Nagar, New Delhi – 110059',
        googleLocationUrl: 'https://maps.app.goo.gl/CBvDqfZkNF2FUntw7',
      },
      {
        state: 'Delhi',
        trainingName: 'AC/Refrigerator/RO',
        address: 'A-Block, JJ Colony, Hastsal Road, Uttam Nagar, New Delhi – 110059',
        googleLocationUrl: 'https://maps.app.goo.gl/Ybk6uQXjiFbnYeDEA',
      },
      {
        state: 'Delhi',
        trainingName: 'AC/Refrigerator/RO',
        address: 'CJ No-03, Gate No 3, Tihar Jail, Delhi – 110064',
        googleLocationUrl: 'https://maps.app.goo.gl/4GXyMidAiqVomj3F8',
      },
      {
        state: 'Delhi',
        trainingName: 'AC/Refrigerator/RO',
        address:
          'Second Floor, 5 Old Market, Tilak Nagar, Delhi – 110018, Near Geeta Bhawan Temple, (Baldev Raj Arora Charitable Building)',
        googleLocationUrl: 'https://maps.app.goo.gl/bqjrhKXLwDpBTaQ8A',
      },
      {
        state: 'Delhi',
        trainingName: 'AC/Refrigerator/RO',
        address:
          'SOL Keshavpuram Campus – University of Delhi, Pocket C-2, Block C3, Tri Nagar, Near Keshav Puram Metro Station, Delhi-110035',
        googleLocationUrl: 'https://maps.app.goo.gl/QbMddxp2rjByw2vb7',
      },
      {
        state: 'Delhi',
        trainingName: 'AC/Refrigerator/RO',
        address:
          'Metro Station, Near Nirman Vihar, Ganesh Nagar Extn – 2, Shakarpur, New Delhi, Delhi, 110092',
        googleLocationUrl: 'https://maps.app.goo.gl/iEvxfGJHDueXTqDn8',
      },
      {
        state: 'Haryana',
        trainingName: 'AC/Refrigerator/RO',
        address: 'Hindu High School – Nuh Rural, Nuh, Haryana – 122107',
        googleLocationUrl: 'https://maps.app.goo.gl/u7HqCDqFxszmWfcU6',
      },
      {
        state: 'Maharashtra',
        trainingName: 'AC/Refrigerator/RO',
        address:
          'Joshi Engineering, Plot no 15, Panvel Industrial Co-op Estate Ltd, Mumbai-Pune Highway, Panvel, Raigad, Maharashtra – 410206',
        googleLocationUrl: 'https://maps.google.com/maps?q=18.9989867%2C73.1113137&z=17&hl=en',
      },
      {
        state: 'Rajasthan',
        trainingName: 'AC/Refrigerator/RO',
        address:
          'House No. 5, Basant Vihar, Bajri Mandi Road, Vaishali Marg West, Panchyawala, Jaipur, Rajasthan – 302034',
        googleLocationUrl: 'https://maps.app.goo.gl/74jP9Te22iqSzgv77',
      },
      {
        state: 'Uttar Pradesh',
        trainingName: 'AC/Refrigerator/RO',
        address:
          'Hindustan Agencies (Mitsubishi Showroom), Khargapur Rd, 3 Geeta Puri, Gomti Nagar, Lucknow, UP - 226010',
        googleLocationUrl: 'https://maps.google.com/maps?q=26.841959%2C81.0143525&z=17&hl=en',
      },
      {
        state: 'Uttar Pradesh',
        trainingName: 'AC/Refrigerator/RO',
        address:
          'Satya Devi Garg Saraswati Vidya Mandir Inter College, Kailash Nagar, Vrindavan, Mathura, UP – 281121',
        googleLocationUrl: 'https://maps.app.goo.gl/6QAENqiecYDxHAsV6',
      },
      {
        state: 'Uttar Pradesh',
        trainingName: 'AC/Refrigerator/RO',
        address:
          'Kanha Complex, Near Aura Chauri Crossing, Deoria-Betalpur Road, Block Betalpur, District Deoria, UP – 274201',
        googleLocationUrl: 'https://maps.app.goo.gl/gPE6hpJgw15qxyqA8',
      },
    ],
  },

  'beautician-course': {
    slug: 'beautician-course',
    title: 'Beautician Training Program',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'KVIC / NSDC',
    image: '/courses/beautician-training-course.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/Beautician-Training-Program.jpg',
    description:
      'Our Beautician Training Program is designed to equip aspiring beauty professionals with industry-standard skills in personal grooming, skincare, makeup artistry, and salon management. Train with professional products and master techniques to launch your own salon or work with top beauty brands.',
    moduleSections: [
      {
        title: 'Skin Care & Treatment Modules',
        items: [
          'Types of Skin – Skin Theory & Analysis',
          'Threading – Eyebrows, Upper Lip, Forehead (High Priority)',
          'Bleaching Techniques & Sensitivity Patch Tests',
          'Waxing – Beans Wax, Paraffin Wax, Rica Wax & Strip Waxing',
          'Manicure & Pedicure – Nail & Hand Care Protocols',
          'Facials – Clean-up, Fruit, Gold, Diamond & Anti-tan Facials',
          'Skin Peeling & Thermoherb Skin Treatment',
          'Ultrasonic, High Frequency & Galvanic Machine Operations',
        ],
      },
      {
        title: 'Hair Care & Hair Styling Modules',
        items: [
          'Types of Hair & Scalp Analysis – Head Massage',
          'Heena Application & Traditional Mehndi',
          'Hair Colouring, Highlights & Root Touch-up',
          'Rebonding & Smoothing Chemical Straightening',
          'Keratin Treatment & Hair Spa Protocols',
          'Hair Perming, Crimping & Curling Techniques',
          'Straightening & Hot Roller Hair Setting',
          'Hair Cuts – Basic, Layer, Feather, U, V & Bob Cuts',
        ],
      },
      {
        title: 'Makeup & Artistry Modules',
        items: [
          'Types of Makeup Products, Brushes & Tools',
          'Party Makeup & Day/Evening Looks',
          'Eye Makeup Techniques (Smokey Eyes, Cut Crease, Winged Liner)',
          'Bridal Makeup & Reception Looks',
          'HD Makeup & Airbrush Overview',
          'Saree Draping (Gujarati, Bengali, Maharashtrian, Modern)',
          'Dupatta Setting & Bridal Accessories',
          'Nail Art – Basic Extensions & Gel Polish',
          'Body Massage & Body Polishing Essentials',
        ],
      },
    ],
    eligibility: 'Literate (Open to women seeking financial independence and salon careers)',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'Beautician',
        address: 'F-146, Old Seemapuri, Block -E, Dilshad Garden, Delhi-110095',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.6809709%2C77.3298666&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'Beautician',
        address: 'B-Block, Street No 2, Brahmpuri, Shahdara, Delhi-110053',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.6754%2C77.2629&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'Beautician',
        address: 'C-Block, Tank Road, Karol Bagh, New Delhi – 110005',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.6534%2C77.1912&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'Beautician',
        address: 'INA Market Training Centre, Near INA Metro Station, New Delhi – 110023',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.5752%2C77.2089&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'Beautician',
        address: 'Chhawla Training Center, Chhawla Village, South West Delhi – 110071',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.5367%2C76.9942&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'Beautician',
        address: 'Raghubir Nagar Community Center, Tagore Garden, New Delhi – 110027',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.6542%2C77.1147&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'Beautician',
        address: 'Malviya Nagar Seva Bharti Center, New Delhi – 110017',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.5355%2C77.2066&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'Beautician',
        address: 'Lajpat Nagar 4, Near National Park, New Delhi – 110024',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.5677%2C77.2433&z=17&hl=en',
      },
    ],
  },

  'cutting-tailoring': {
    slug: 'cutting-tailoring',
    title: 'Cutting & Tailoring',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'KVIC / NSDC',
    image: '/courses/cutting-and-tailoring.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/cutting-and-tailoring.jpg',
    description:
      'A practical training program in cutting and tailoring that teaches participants the art of garment construction, from basic measurements to advanced stitching techniques. The course empowers individuals to start their own tailoring business or work in the garment industry.',
    moduleSections: [
      {
        title: 'Foundation & Machine Operation',
        items: [
          'Introduction to Tailoring Tools, Measuring Tapes, Shears & Equipment',
          'Sewing Machine (Manual & Motorized) Operation, Threading & Tension Adjustment',
          'Machine Care, Oiling & Preventive Maintenance',
          'Basic Hand Stitches: Hemming, Basting, Tucking, Overcasting',
        ],
      },
      {
        title: 'Measurements & Pattern Drafting',
        items: [
          'Anatomy of Garments & Accurate Body Measurements',
          'Drafting Paper Patterns for Standard Sizes (S, M, L, XL)',
          'Fabric Grain Lines, Biases, and Layout Optimization',
          'Precision Cutting for Cotton, Silk, Rayon, and Chiffon Fabrics',
        ],
      },
      {
        title: 'Garment Construction & Tailoring',
        items: [
          'Ladies Wear: Simple Kurti, Designer Kurti, Anarkali, A-line Suit',
          'Bottom Wear: Simple Salwar, Patiala Salwar, Churidar, Plazo, Pants',
          'Blouse Stitching: Plain Blouse, Princess Cut, Padded Blouse, Choli Cut',
          'Neck Design & Necklines: Boat Neck, Sweetheart, Collar, Piping & Borders',
          'Kids Wear: Baby Frocks, Shorts, Nightwear, School Uniforms',
          'Finishing Touches: Zippers, Hooks, Buttons, Eyelets & Interfacing',
          'Alterations, Fitting Corrections & Commercial Costing',
        ],
      },
    ],
    eligibility: 'The person should be literate (Open to youth and women seeking self-reliance)',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'Fashion Designing',
        address: 'HR-33, 60 Futa Road, Pul Pehladpur, New Delhi – 110044',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.4986936%2C77.2926088&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'Cutting & Tailoring',
        address: 'Sewa Bharti, Shivaji Sudhar Camp, Madrasi Camp, Kalkaji, South Delhi, Delhi – 110019',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.5398%2C77.2589&z=17&hl=en',
      },
      {
        state: 'Delhi',
        trainingName: 'Fashion Designing',
        address: 'Gali No. 4, Block D, Sangam Vihar, New Delhi – 110080',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.5043%2C77.2472&z=17&hl=en',
      },
      {
        state: 'Uttar Pradesh',
        trainingName: 'Fashion Designing',
        address: 'Saraswati Vidya Mandir, Sector 12, Pratap Vihar, Ghaziabad, UP – 201009',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.6477%2C77.4233&z=17&hl=en',
      },
    ],
  },

  'digital-marketing-course': {
    slug: 'digital-marketing-course',
    title: 'Digital Marketing Course',
    language: 'Hindi / English',
    duration: '1 Month',
    certification: 'Govt. Recognized Certification',
    image: '/courses/digital-marketing.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/digital-marketing.jpg',
    description:
      'A focused digital marketing course covering the essentials of online marketing, social media, SEO, and content strategy. Designed for aspiring marketers and small business owners to build a strong digital presence.',
    moduleSections: [
      {
        title: 'Module 1: Introduction to Digital Marketing',
        items: [
          'Overview of Digital Marketing – Concepts, History and Scope',
          'Differences between Digital Marketing and Traditional Marketing',
          'Benefits and ROI of Digital Channels',
          'Digital Marketing Ecosystem (SEO, SEM, SMM, Email, Affiliate)',
          'Setting SMART Goals for Digital Marketing Campaigns',
        ],
      },
      {
        title: 'Module 2: Website Planning & WordPress Development',
        items: [
          'Domain Names, DNS and Cloud Web Hosting',
          'Installing and Configuring WordPress CMS',
          'Designing Landing Pages with Elementor Page Builder',
          'Website User Experience (UX), Speed Optimization & Mobile Responsiveness',
        ],
      },
      {
        title: 'Module 3: Search Engine Optimization (SEO)',
        items: [
          'Search Engine Algorithms & How Google Indexes Pages',
          'Keyword Research & Competitive Analysis',
          'On-Page SEO: Title Tags, Meta Descriptions, Headers & URL Structure',
          'Off-Page SEO: Backlink Strategies, Domain Authority & Guest Posting',
          'Technical SEO & Google Search Console Integration',
        ],
      },
      {
        title: 'Module 4: Social Media & Paid Advertising (PPC)',
        items: [
          'Facebook & Instagram Marketing: Page Setup, Creator Studio & Content Strategy',
          'Meta Ads Manager: Audience Creation, Pixel Tracking & Campaign Setup',
          'Google Ads: Search Ads, Display Ads, Video Campaigns on YouTube',
          'Campaign Budget Optimization (CBO) & Conversion Tracking',
          'Google Analytics 4 (GA4): Traffic Channels, Bounce Rate & Performance Reporting',
        ],
      },
    ],
    eligibility: '10th pass / 12th pass / Graduate with basic computer familiarity',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'Digital Marketing',
        address: 'SOL Keshavpuram Campus – University of Delhi, Tri Nagar, Delhi-110035',
        googleLocationUrl: 'https://maps.app.goo.gl/QbMddxp2rjByw2vb7',
      },
      {
        state: 'Delhi',
        trainingName: 'Digital Marketing',
        address: 'CDC Center, DSEU Shakarpur Campus, Near Nirman Vihar Metro Station, Delhi-110092',
        googleLocationUrl: 'https://maps.app.goo.gl/iEvxfGJHDueXTqDn8',
      },
    ],
  },

  'bakery-course': {
    slug: 'bakery-course',
    title: 'Bakery Course',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'FSSAI / KVIC',
    image: '/courses/bakery-course.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/bakery-course.jpg',
    description:
      'A hands-on professional baking and confectionery course that teaches commercial bakery techniques from scratch. Master eggless baking, breads, artisanal cookies, cakes, and pastry preparation with real kitchen workshops.',
    moduleSections: [
      {
        title: 'Module 1: Basics of Baking & Cookery',
        items: [
          'Mode: Classroom + Practical Workshops',
          'Baking Science: Flours, Leaveners, Fats, Sweeteners & Dairy',
          'Commercial Oven Operations, Temperatures & Baking Times',
          'Hygiene, Sanitization & FSSAI Food Safety Standards',
        ],
      },
      {
        title: 'Module 2: Cookies, Biscuits & Artisanal Breads',
        items: [
          'Eggless Cookie Making: Choco-chip, Butter, Nankhatai',
          'Healthy Millet Baking: Ragi, Oats and Multigrain Biscuits',
          'Bread Making: Multigrain Bread, Atta Bread, Milk Bread',
          'Specialty Breads: Garlic Bread, Focaccia & Dinner Rolls',
          'Commercial Pizza Base and Gourmet Pizza Making',
          'Crispy Rusk and Paape Production',
        ],
      },
      {
        title: 'Module 3: Cakes, Frosting & Confectionery',
        items: [
          'Basics of Cake Baking – Eggless Sponge (Vanilla, Chocolate, Pineapple)',
          'Layering, Sugar Soaking & Whipped Cream Frosting',
          'Fondant Basics & Cake Decoration Techniques',
          'Eggless Chocolate Fudge Brownies & Muffins',
          'Cheesecake (No-Bake & Baked Variants)',
          'Packaging, Shelf-Life Extension & Home Bakery Business Launch',
        ],
      },
    ],
    eligibility: 'Eligible: 8th pass and above | Passionate about commercial baking & entrepreneurship',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'Bakery',
        address: 'Samarth Bharat Skill Center, Mangolpuri Industrial Area, Phase 1, Delhi – 110083',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.6923%2C77.0867&z=17&hl=en',
      },
      {
        state: 'Uttar Pradesh',
        trainingName: 'Bakery',
        address: 'Bhaorao Deoras Seva Nyas Vocational Centre, Noida Sector 62, UP – 201309',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.6280%2C77.3649&z=17&hl=en',
      },
    ],
  },

  'truck-repairing-course': {
    slug: 'truck-repairing-course',
    title: 'Truck Repairing Course',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'KVIC / NSDC',
    image: '/courses/ac-repair-course.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/truck-repair.jpg',
    description:
      'A hands-on professional commercial vehicle repair course that prepares trainees for careers in truck maintenance, diesel engine repair, pneumatic brake systems, and transmission diagnostics.',
    moduleSections: [
      {
        title: 'Engine & Mechanical Systems',
        items: [
          'Commercial Diesel Engine Principles & Fuel Injection',
          'Heavy Transmission, Clutch & Gearbox Maintenance',
          'Pneumatic Air Brakes & Valve Testing',
          'Suspension, Steering Geometry & Wheel Alignment',
          'Fault Code Diagnostics & On-Board Diagnostics (OBD)',
        ],
      },
    ],
    eligibility: '10th pass or ITI in Motor Mechanic',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'Truck Repairing',
        address: 'Sanjay Gandhi Transport Nagar, GT Karnal Road, Delhi – 110042',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.7521%2C77.1357&z=17&hl=en',
      },
    ],
  },

  'general-duty-assistant': {
    slug: 'general-duty-assistant',
    title: 'General Duty Assistant (GDA)',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'HSSC / NSDC',
    image: '/courses/ac-repair-course.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/gda-healthcare.jpg',
    description:
      'General Duty Assistant (GDA) training program prepares healthcare aides to support hospital wards, elder care facilities, and diagnostic centers with patient care, vitals monitoring, and first aid.',
    moduleSections: [
      {
        title: 'Clinical Care & Hospital Procedures',
        items: [
          'Fundamentals of Patient Care & Bedside Manners',
          'Vital Signs Monitoring: BP, Pulse, Temperature, Oxygen SpO2',
          'Infection Control, Hygiene & Biomedical Waste Management',
          'First Aid Protocols & Emergency Response (CPR)',
          'Patient Mobility, Nutrition & Medication Support',
        ],
      },
    ],
    eligibility: '10th Class Pass',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'GDA',
        address: 'Vishram Sadan, AIIMS Campus, Ansari Nagar, New Delhi – 110029',
        googleLocationUrl: 'https://maps.google.com/maps?q=28.5672%2C77.2100&z=17&hl=en',
      },
    ],
  },
  'video-editing-course': {
    slug: 'video-editing-course',
    title: 'Video Editing Course',
    language: 'English',
    duration: '60 Hrs',
    certification: 'Yes',
    image: '/courses/video-editing.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/SB-Video-Editing-Course-2.jpg',
    description:
      'Are you passionate about creating impactful videos? Join our 60 hour professional Video Editing Course and turn your creativity into a career. Designed for beginners as well as aspiring professionals, this course provides hands-on training with industry-standard tools to help you master the art of video editing.',
    moduleSections: [
      {
        title: 'Video Editing Foundations & Tools',
        items: [
          'Introduction to Video Editing & Industry Workflows',
          'Premiere Pro & DaVinci Resolve Interface & Navigation',
          'Timeline Management, Trimming, Cutting and Pacing',
          'Audio Synchronization, Sound Effects & Foley Integration',
          'Color Correction, Lumetri Color & Cinematic Grading',
          'Motion Graphics, Title Animation & Subtitle Creation',
          'Export Settings for YouTube, Reels, TV and Web',
        ],
      },
    ],
    eligibility: '10th / 12th Pass / College Students',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'CDC Hub',
        address: 'Career Development Centre, University of Delhi, North Campus, Delhi – 110007',
        googleLocationUrl: 'https://maps.google.com/?q=University+of+Delhi',
      },
    ],
  },
  'ai-prompt-engineering': {
    slug: 'ai-prompt-engineering',
    title: 'AI - Prompt Engineering',
    language: 'English',
    duration: '40 Hrs',
    certification: 'Yes',
    image: '/courses/ai-prompt-engineering.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/AI-promp-engineering.jpg',
    description:
      'Master the future of Artificial Intelligence with our intensive AI Prompt Engineering Course. Learn how to design, optimize, and implement powerful prompts using Python and advanced AI tools to create real-world solutions. This program is perfect for students, professionals, and entrepreneurs looking to build in-demand AI skills for career growth.',
    moduleSections: [
      {
        title: 'Generative AI & Prompt Engineering Modules',
        items: [
          'Foundations of LLMs, Neural Networks and Attention Mechanisms',
          'Prompt Engineering Architectures: Zero-Shot, Few-Shot, CoT',
          'System Prompt Optimization, Guardrails and Security',
          'Vector Databases, Embeddings & RAG Implementation',
          'Python API Integration with OpenAI, Anthropic, and Gemini',
          'Building Custom Autonomous AI Agents for Enterprise Automation',
        ],
      },
    ],
    eligibility: 'College Students / Graduates / Professionals',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'CDC Hub',
        address: 'Career Development Centre, University of Delhi, North Campus, Delhi – 110007',
        googleLocationUrl: 'https://maps.google.com/?q=University+of+Delhi',
      },
    ],
  },
  'flutter-app-development': {
    slug: 'flutter-app-development',
    title: 'Flutter App Development',
    language: 'English',
    duration: '40 Hrs',
    certification: 'Yes',
    image: '/courses/flutter-app.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/Aldenaire-Partners.jpg',
    description:
      'Unlock your potential in mobile app development with our Flutter App Development course. Designed for students and aspiring developers, this course offers a hands-on introduction to building cross-platform apps using Flutter and Dart. Learn to design beautiful, responsive user interfaces and bring your ideas to life with real-world projects.',
    moduleSections: [
      {
        title: 'Cross-Platform Mobile Development Modules',
        items: [
          'Introduction to Dart Language and Object-Oriented Programming',
          'Flutter Framework Architecture & Widget Lifecycle',
          'Responsive UI Design for Android and iOS devices',
          'State Management with Provider and Bloc Pattern',
          'Connecting REST APIs & Handling JSON Data',
          'Local Storage, SQLite, and Push Notifications',
          'Publishing Apps to Google Play Store & Apple App Store',
        ],
      },
    ],
    eligibility: 'Basic Computer Knowledge / College Students',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'CDC Hub',
        address: 'Career Development Centre, University of Delhi, North Campus, Delhi – 110007',
        googleLocationUrl: 'https://maps.google.com/?q=University+of+Delhi',
      },
    ],
  },
  'nail-art-course': {
    slug: 'nail-art-course',
    title: 'Nail Art Course',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/nail-art.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/Nail-Art-Course.jpg',
    description:
      'Step into the world of creativity and style with our Professional Nail Art Course. This course is designed for beginners as well as aspiring professionals who want to master the art of nail care and decoration. Learn trendy designs, techniques, and the latest tools to become a skilled nail artist and build a career in the growing beauty industry.',
    moduleSections: [
      {
        title: 'Nail Art & Extensions Syllabus',
        items: [
          'Introduction to Nail Anatomy, Hygiene & Salon Sanitation',
          'Natural Nail Prep, Cuticle Care & Buffing Techniques',
          'Gel Polish Application, UV/LED Curing & Safe Removal',
          'Freehand Art, Ombre, Chrome, Foil and 3D Embellishments',
          'Acrylic & Polygel Nail Tip Extensions',
          'Client Consultation, Pricing & Salon Business Strategy',
        ],
      },
    ],
    eligibility: 'Open to All / Minimum 8th Pass',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'Beauty Hub',
        address: 'Samarth Bharat Skill Development Center, New Delhi',
        googleLocationUrl: 'https://maps.google.com/?q=New+Delhi',
      },
    ],
  },
  'ro-repairing-course': {
    slug: 'ro-repairing-course',
    title: 'RO Repairing Course',
    language: 'Hindi',
    duration: '1 Month',
    certification: 'Yes',
    image: '/courses/ro-repairing.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/RO-Repairin-Course.jpg',
    description:
      'Start a career in the rapidly growing water purifier industry with our RO Repairing & Maintenance Course. This course is designed to provide complete practical training in installation, servicing, and repairing of RO water purifiers and filtration systems. With expert guidance, you will gain the technical knowledge and hands-on experience to become a skilled RO technician.',
    moduleSections: [
      {
        title: 'Water Purification & RO Systems Curriculum',
        items: [
          'Introduction to RO Purification & Membrane Chemistry',
          'Study of Essential RO Components (Pump, SMPS, SV Valve, Float Valve)',
          'Sediment, Carbon, Post-Carbon & Alkaline Filter Replacement',
          'Complete Wiring & Electrical Diagnostic Troubleshooting',
          'TDS Meter & pH Level Water Quality Testing Protocols',
          'Installation, Descaling, Servicing and Field Repairing',
        ],
      },
    ],
    eligibility: '8th / 10th Pass',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'Technical Hub',
        address: 'Samarth Bharat Vocational Training Center, Delhi NCR',
        googleLocationUrl: 'https://maps.google.com/?q=Delhi',
      },
    ],
  },
  'carpenter-training': {
    slug: 'carpenter-training',
    title: 'Carpenter Training',
    language: 'Hindi',
    duration: '3 Month',
    certification: 'Yes',
    image: '/courses/carpenter-training.jpg',
    wpImageFallback: 'https://samarthbharat.net/wp-content/uploads/2025/05/Carpenter-Training-SB.jpg',
    description:
      'Master the woodworking trade with Samarth Bharat’s comprehensive Carpenter Training Course. Gain hands-on practical skills in timber selection, power tools usage, joinery, modular furniture assembly, and precision finishing for lucrative employment and self-employment.',
    moduleSections: [
      {
        title: 'Carpentry & Woodworking Curriculum',
        items: [
          'Safety Protocols, Hand Tools & Power Machine Operation',
          'Timber Types, Seasoning, Plywood, MDF & Veneer Selection',
          'Precision Measuring, Marking, Cutting & Edge Banding',
          'Wood Joinery: Mortise-Tenon, Dovetail, Lap & Dowel Joints',
          'Modular Kitchen Cabinetry, Door & Window Frame Fabrication',
          'Hardware Fitting (Hinges, Locks, Telescopic Drawer Channels)',
          'Sanding, Primer Application, PU Polishing & Laminate Pasting',
        ],
      },
    ],
    eligibility: 'Minimum 8th Pass / Open to Youth Seeking Livelihoods',
    centers: [
      {
        state: 'Delhi',
        trainingName: 'Technical Hub',
        address: 'Samarth Bharat Vocational Training Center, Delhi NCR',
        googleLocationUrl: 'https://maps.google.com/?q=Delhi',
      },
    ],
  },
};

