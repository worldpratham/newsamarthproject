const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/HP/.gemini/antigravity-ide/brain/309fecaf-ae13-4b0b-9667-1653466fc4c0/.system_generated';
const pagesRaw = fs.readFileSync(path.join(brainDir, 'steps/36/content.md'), 'utf8');
const pages = JSON.parse(pagesRaw.slice(pagesRaw.indexOf('[')));

// 1. Extract 73 Centers
const cdPage = pages.find(p => p.slug === 'centres-details');
const centers = [];
if (cdPage) {
  const html = cdPage.content.rendered;
  const rows = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  rows.slice(1).forEach(r => {
    const cells = (r.match(/<td[\s\S]*?<\/td>/gi) || []).map(c => c.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    const linkMatch = r.match(/href="([^"]+)"/i);
    const googleLocationUrl = linkMatch ? linkMatch[1] : '';

    if (cells.length >= 4 && cells[0]) {
      centers.push({
        state: cells[0],
        trainingName: cells[1],
        address: cells[2],
        googleLocationUrl: googleLocationUrl || `https://maps.google.com/?q=${encodeURIComponent(cells[2])}`,
        contactPhone: '8595887700',
        isActive: true
      });
    }
  });
}
fs.writeFileSync(path.join(__dirname, 'centersData.json'), JSON.stringify(centers, null, 2));
console.log(`Generated centersData.json: ${centers.length} records`);

// 2. Extract 34 DU Colleges
const cdcPage = pages.find(p => p.slug === 'career-development-centre');
const colleges = [];
if (cdcPage) {
  const html = cdcPage.content.rendered;
  const rows = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  rows.slice(1).forEach(r => {
    const cells = (r.match(/<td[\s\S]*?<\/td>/gi) || []).map(c => c.replace(/<[^>]+>/g, '').trim());
    if (cells.length >= 2 && !isNaN(parseInt(cells[0]))) {
      colleges.push({
        sNo: parseInt(cells[0]),
        collegeName: cells[1],
        university: 'University of Delhi (DU)',
        isActive: true
      });
    }
  });
}
fs.writeFileSync(path.join(__dirname, 'collegesData.json'), JSON.stringify(colleges, null, 2));
console.log(`Generated collegesData.json: ${colleges.length} records`);

// 3. 13 Courses Data
const courses = [
  {
    title: 'AC & Fridge Repair Course',
    slug: 'ac-fridge-repair-course',
    category: 'Technical',
    duration: '2 Months',
    language: 'Hindi',
    certification: 'KVIC',
    overview: 'Become a certified technician with our industry-leading repairing course designed to equip you with practical skills and hands-on training. This program covers complete repairing and maintenance techniques for Air Conditioners (AC), Refrigerators, RO Water Purifiers, and Washing Machines.',
    eligibility: 'Minimum 8th pass, open to unemployed youth seeking technical employment or self-employment',
    modules: [
      { moduleNumber: 1, title: 'Air Conditioner (Split & Window)', description: 'Installation, gas charging, leak testing, compressor troubleshooting, inverter AC PCB diagnosis' },
      { moduleNumber: 2, title: 'Refrigerator (Single & Double Door)', description: 'Cooling cycle, thermostat testing, defrost timer, relay replacement, gas refill' },
      { moduleNumber: 3, title: 'Washing Machine (Semi & Fully Automatic)', description: 'Motor wiring, gearbox, timer, drain pump repair, digital control board troubleshooting' },
      { moduleNumber: 4, title: 'RO Water Purifier', description: 'Filter replacement, membrane fitting, booster pump repair, electrical circuits, TDS adjustment' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/ac-repairing-course.jpg'
  },
  {
    title: 'Beautician Course',
    slug: 'beautician-course',
    category: 'Vocational',
    duration: '3 Months',
    language: 'Hindi',
    certification: 'KVIC',
    overview: 'Build a rewarding career in the beauty and wellness industry with our Professional Beautician Course. Designed for beginners as well as aspiring professionals, this course provides hands-on training in makeup, skincare, hair styling, and grooming techniques.',
    eligibility: 'Open to women and girls passionate about the beauty industry and self-employment',
    modules: [
      { moduleNumber: 1, title: 'Skin Care & Hygiene', description: 'Skin analysis, facial treatments, cleanup, bleach, and massage techniques' },
      { moduleNumber: 2, title: 'Hair Styling & Treatments', description: 'Hair cuts, hair spa, straightening, coloring, and traditional hair styling' },
      { moduleNumber: 3, title: 'Professional Makeup & Grooming', description: 'Bridal makeup, party makeup, saree draping, and client consultation' },
      { moduleNumber: 4, title: 'Parlour Management & Salon Setup', description: 'Client records, equipment hygiene, pricing, and business management' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/beautician-training-course.jpg'
  },
  {
    title: 'Bakery Course',
    slug: 'bakery-course',
    category: 'Vocational',
    duration: '1 Month',
    language: 'Hindi',
    certification: 'KVIC',
    overview: 'Turn your passion for baking into a rewarding career with our Professional Bakery Course. Learn the art and science of baking through hands-on training and expert guidance. From cakes, pastries, breads, cookies, and desserts to advanced decoration techniques.',
    eligibility: 'Basic interest in culinary arts and baking; no prior technical knowledge required',
    modules: [
      { moduleNumber: 1, title: 'Baking Fundamentals & Oven Management', description: 'Ingredients science, temperature control, dough kneading, baking tools' },
      { moduleNumber: 2, title: 'Cakes & Pastries', description: 'Sponge making, cream icing, fondant decorations, cupcakes, and layer cakes' },
      { moduleNumber: 3, title: 'Breads & Buns', description: 'Yeast fermentation, sandwich bread, dinner rolls, pizza bases, garlic breads' },
      { moduleNumber: 4, title: 'Cookies & Savory Snacks', description: 'Butter cookies, puffs, patties, muffins, chocolate tempering' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/Untitled-design-3.jpg'
  },
  {
    title: 'Cutting & Tailoring',
    slug: 'cutting-tailoring',
    category: 'Vocational',
    duration: '3 Months',
    language: 'Hindi',
    certification: 'BDSN',
    overview: 'Turn your creativity into a profession with our Cutting and Tailoring Training Course. This program provides practical skills in stitching, designing, and garment finishing, preparing you to build a career in the ever-growing fashion and tailoring industry.',
    eligibility: 'Open to youth, homemakers, and aspiring fashion entrepreneurs',
    modules: [
      { moduleNumber: 1, title: 'Machine Handling & Stitching Basics', description: 'Sewing machine maintenance, needle selection, basic straight & zigzag stitches' },
      { moduleNumber: 2, title: 'Measurement & Drafting Patterns', description: 'Body measurement, paper pattern drafting, fabric estimation' },
      { moduleNumber: 3, title: 'Traditional Attire Tailoring', description: 'Salwar, Kurta, Blouse, Petticoat, Churidar cutting and stitching' },
      { moduleNumber: 4, title: 'Modern Fashion & Finishing', description: 'Western dresses, piping, zipper insertion, hooks, buttons, quality inspection' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/cutting-and-tailoring.jpg'
  },
  {
    title: 'Digital Marketing Course',
    slug: 'digital-marketing-course',
    category: 'Career Development Centre (CDC)',
    duration: '40 Hours',
    language: 'English',
    certification: 'BDSN',
    overview: 'Gain in-demand skills with our Digital Marketing course, designed to equip students with the knowledge and tools needed to thrive in the online world. Learn the fundamentals of SEO, social media marketing, content creation, email campaigns, and data analytics.',
    eligibility: 'College students, graduates, and aspiring digital professionals',
    modules: [
      { moduleNumber: 1, title: 'Introduction to Digital Marketing', description: 'Digital landscape overview, buyer personas, customer journeys' },
      { moduleNumber: 2, title: 'Search Engine Optimization (SEO)', description: 'On-page SEO, off-page backlinks, keyword research, technical SEO' },
      { moduleNumber: 3, title: 'Search Engine Marketing (SEM / Google Ads)', description: 'PPC campaigns, ad auctions, bidding strategies, conversion tracking' },
      { moduleNumber: 4, title: 'Social Media Marketing', description: 'Meta Ads, Instagram growth, LinkedIn B2B strategies, content calendars' },
      { moduleNumber: 5, title: 'Content Marketing', description: 'Blogging, storytelling, viral content, copywriting fundamentals' },
      { moduleNumber: 6, title: 'Email Marketing', description: 'Lead magnets, drip campaigns, automated sequences, CTR optimization' },
      { moduleNumber: 7, title: 'Digital Advertising & Remarketing', description: 'Display networks, video ads, retargeting pixels' },
      { moduleNumber: 8, title: 'Analytics & Data-Driven Marketing', description: 'Google Analytics 4, KPI reporting, conversion rate optimization (CRO)' },
      { moduleNumber: 9, title: 'Mobile & Influencer Marketing', description: 'App store optimization, WhatsApp marketing, influencer outreach' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/Untitled-design-2.jpg'
  },
  {
    title: 'Carpenter Training',
    slug: 'carpenter-training',
    category: 'Technical',
    duration: '2 Months',
    language: 'Hindi',
    certification: 'BDSN',
    overview: 'Shape your future with our Professional Carpenter Training Course, designed to equip learners with practical skills in modern and traditional carpentry. From furniture making to interior woodwork, this course covers every aspect of woodworking with expert guidance.',
    eligibility: 'Open to youth interested in craftsmanship and woodwork',
    modules: [
      { moduleNumber: 1, title: 'Induction & Workshop Safety', description: 'Woodworking safety protocols, hand tools, measuring instruments' },
      { moduleNumber: 2, title: 'Wood Types & Seasoning', description: 'Timber classification, plywood, MDF, particle board characteristics' },
      { moduleNumber: 3, title: 'Joinery & Woodpecking Techniques', description: 'Mortise and tenon, dovetail, tongue and groove joints' },
      { moduleNumber: 4, title: 'Furniture Fabrication & Finishing', description: 'Table, chair, cabinet manufacturing, laminating, veneering, polishing' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/carpenter-training.jpg'
  },
  {
    title: 'Nail Art Course',
    slug: 'nail-art-course',
    category: 'Vocational',
    duration: '1 Month',
    language: 'Hindi',
    certification: 'BDSN',
    overview: 'Step into the world of creativity and style with our Professional Nail Art Course. This course is designed for beginners as well as aspiring professionals who want to master the art of nail care and decoration.',
    eligibility: 'Beginners, beauticians, and salon technicians',
    modules: [
      { moduleNumber: 1, title: 'Nail Anatomy & Hygiene', description: 'Nail structure, cuticle care, sanitization of manicure tools' },
      { moduleNumber: 2, title: 'Gel Polish & Extension Systems', description: 'Acrylic extensions, polygel application, UV/LED curing' },
      { moduleNumber: 3, title: 'Artistic Designs & Embellishments', description: 'French tips, ombre, marble effect, stone & glitter placement, 3D designs' },
      { moduleNumber: 4, title: 'Nail Removal & Aftercare', description: 'Safe soak-off removal, nail strengthening, client retention' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/nail-art-course.jpg'
  },
  {
    title: 'RO Repairing Course',
    slug: 'ro-repairing-course',
    category: 'Technical',
    duration: '15 Days',
    language: 'Hindi',
    certification: 'BDSN',
    overview: 'Start a career in the rapidly growing water purifier industry with our RO Repairing & Maintenance Course. This course is designed to provide complete practical training in installation, servicing, and repairing of RO water purifiers and filtration systems.',
    eligibility: 'Open to youth seeking fast-track self-employment and field service technician roles',
    modules: [
      { moduleNumber: 1, title: 'Water Filtration Principles', description: 'TDS, pH, sediment filtration, pre-carbon & post-carbon filters' },
      { moduleNumber: 2, title: 'RO Membrane & Hydraulics', description: 'Membrane functioning, reject water ratios, flow restrictors (FR)' },
      { moduleNumber: 3, title: 'Electrical Components & Solenoid Valves', description: 'Booster pump troubleshooting, SMPS power supplies, SV valves, float switches' },
      { moduleNumber: 4, title: 'UV & Alkaline Systems Maintenance', description: 'UV lamps, copper/alkaline filter additions, leak repair, sanitization' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/ro-repairing-course.jpg'
  },
  {
    title: 'Truck Repairing Course',
    slug: 'truck-repairing-course',
    category: 'Technical',
    duration: '3 Months',
    language: 'Hindi',
    certification: 'KVIC',
    overview: 'Build a strong career in the heavy vehicle industry with our Professional Truck Repair Training Course. This program provides comprehensive practical training on repairing, servicing, and maintaining trucks and commercial vehicles in collaboration with APML and KVIC.',
    eligibility: 'Youth looking to build careers in automotive and heavy vehicle workshops',
    modules: [
      { moduleNumber: 1, title: 'Role of Heavy Commercial Vehicle (HCV) Technician', description: 'Workshop safety, heavy machinery handling, industry standards' },
      { moduleNumber: 2, title: 'Work Efficiency & Resource Optimization', description: 'Time management, spare parts utilization, eco-friendly disposal of fluids' },
      { moduleNumber: 3, title: 'Commercial Vehicle Diagnostics', description: 'Diesel engine maintenance, fuel injection systems, cooling and lubrication' },
      { moduleNumber: 4, title: 'Air Brake Systems & Transmission', description: 'Air compressor, brake booster, multi-gear manual transmission, clutch plates' },
      { moduleNumber: 5, title: 'Routine Servicing & Preventive Maintenance', description: 'Chassis inspection, suspension leaves, steering alignment, electrical circuits' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/truck-repairing-course.jpg'
  },
  {
    title: 'General Duty Assistant (GDA)',
    slug: 'general-duty-assistant',
    category: 'Vocational',
    duration: '3 Months',
    language: 'Hindi',
    certification: 'Healthcare Sector',
    overview: 'Start a rewarding career in the healthcare sector with our General Duty Assistant (GDA) Training Course. This course is specially designed to prepare students for patient care, hospital assistance, and basic nursing support, making them job-ready for hospitals and clinics.',
    eligibility: '10th pass minimum, empathetic attitude towards patient care',
    modules: [
      { moduleNumber: 1, title: 'Orientation to Healthcare Facilities', description: 'Hospital hierarchy, code of conduct, medical terminology' },
      { moduleNumber: 2, title: 'Broad Functions of GDA', description: 'Patient intake, patient ward management, emergency protocols' },
      { moduleNumber: 3, title: 'Human Anatomy & Physiology Basics', description: 'Vital organs, circulatory system, respiratory functions' },
      { moduleNumber: 4, title: 'Ergonomics & Patient Positioning', description: 'Wheelchair transfer, stretcher movement, pressure sore prevention' },
      { moduleNumber: 5, title: 'Vital Signs Observation & Documentation', description: 'Pulse, blood pressure, temperature, oxygen saturation measurement' },
      { moduleNumber: 6, title: 'Patient Hygiene & Nutrition', description: 'Bed baths, oral care, feeding tubes, dietary balance' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/general-duty-assistant.jpg'
  },
  {
    title: 'Flutter App Development',
    slug: 'flutter-app-development',
    category: 'Career Development Centre (CDC)',
    duration: '40 Hours',
    language: 'English',
    certification: 'BDSN',
    overview: 'Unlock your potential in mobile app development with our Flutter App Development course. Designed for students and aspiring developers, this course offers a hands-on introduction to building cross-platform apps for Android and iOS using Flutter and Dart.',
    eligibility: 'Basic programming concepts in any language (C, Java, Python, or JS)',
    modules: [
      { moduleNumber: 1, title: 'Introduction to Flutter & Dart', description: 'Dart syntax, object-oriented concepts, asynchronous programming' },
      { moduleNumber: 2, title: 'Flutter UI Framework', description: 'Stateless vs Stateful widgets, layouts, themes, responsive design' },
      { moduleNumber: 3, title: 'State Management', description: 'Provider, Riverpod, and Bloc state management patterns' },
      { moduleNumber: 4, title: 'REST API & Firebase Integration', description: 'HTTP networking, JSON serialization, Firebase Auth, Cloud Firestore' },
      { moduleNumber: 5, title: 'Testing, Build & App Store Deployment', description: 'Unit tests, widget tests, building APKs, App Store submission' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/flutter-app-development.jpg'
  },
  {
    title: 'AI Prompt Engineering',
    slug: 'ai-prompt-engineering',
    category: 'Career Development Centre (CDC)',
    duration: '40 Hours',
    language: 'English',
    certification: 'BDSN',
    overview: 'Master the future of Artificial Intelligence with our intensive AI Prompt Engineering Course. Learn how to design, optimize, and implement powerful prompts using Python and advanced AI tools to create real-world solutions for business and tech.',
    eligibility: 'Open to college students, professionals, and tech enthusiasts',
    modules: [
      { moduleNumber: 1, title: 'Introduction to Generative AI & LLMs', description: 'Transformer architecture, foundation models, tokens and embeddings' },
      { moduleNumber: 2, title: 'Prompt Design Principles', description: 'Zero-shot, Few-shot, Chain-of-Thought (CoT), System messaging' },
      { moduleNumber: 3, title: 'Advanced Prompt Frameworks', description: 'Role prompting, guardrails, hallucination reduction, structured JSON output' },
      { moduleNumber: 4, title: 'AI in Enterprise & Automation', description: 'RAG (Retrieval Augmented Generation), LangChain, AI agents, business use-cases' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/AI-promp-engineering.jpg'
  },
  {
    title: 'Video Editing Course',
    slug: 'video-editing-course',
    category: 'Career Development Centre (CDC)',
    duration: '60 Hours',
    language: 'English',
    certification: 'BDSN',
    overview: 'Are you passionate about creating impactful videos? Join our 60 hour professional Video Editing Course and turn your creativity into a career. Designed for beginners as well as aspiring professionals, this course provides hands-on training with industry-standard tools.',
    eligibility: 'Students, content creators, and social media enthusiasts',
    modules: [
      { moduleNumber: 1, title: 'Video Production Basics', description: 'Frame rates, resolutions, aspect ratios, color spaces' },
      { moduleNumber: 2, title: 'Non-Linear Editing (NLE) Techniques', description: 'Timeline assembly, rough cut, rhythm, pace, J-cuts & L-cuts' },
      { moduleNumber: 3, title: 'Audio Post-Production', description: 'Noise removal, equalizer, sound effects, voiceover mastering, background score sync' },
      { moduleNumber: 4, title: 'Color Grading & Exporting', description: 'Color wheels, LUTs, secondary grading, high-res exports for YouTube and Instagram' }
    ],
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/SB-Video-Editing-Course-2.jpg'
  }
];
fs.writeFileSync(path.join(__dirname, 'coursesData.json'), JSON.stringify(courses, null, 2));
console.log(`Generated coursesData.json: ${courses.length} courses`);

// 4. Success Stories
const stories = [
  {
    name: 'Shubhash',
    role: 'Technician',
    companyOrCenter: 'Bluestar India',
    storyText: 'Once working long hours as a driver, Shubhash, a devoted husband and father of two, sought a better life closer to home. After completing training in AC repair from Samarth Bharat, he secured a full-time position with Bluestar India, gaining financial stability and dignity.',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/subhash-ac-technician.jpg'
  },
  {
    name: 'Usha',
    role: 'Owner, Beauty Parlor',
    companyOrCenter: 'Paharganj Center',
    storyText: 'Living in Paharganj with her family of six, Usha struggled to manage household expenses on her husband’s single income. After completing the Beautician Training at Samarth Bharat, she opened her own beauty parlour, transforming from a homemaker to a proud business owner.',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/usha-beautician.jpg'
  },
  {
    name: 'Hari Om',
    role: 'Technician',
    companyOrCenter: 'LG Electronics',
    storyText: 'Once working as a Zomato delivery rider in Chirag Delhi, Hari Om chose not to give up on his dreams. With limited resources but strong determination, he enrolled in a 2-month AC & Fridge Repair course at Malviya Nagar Center and now works as an authorized technician at LG.',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/Hari-om-technician.jpg'
  },
  {
    name: 'Kavita',
    role: 'Owner, Beauty Parlour',
    companyOrCenter: 'Tank Road Center, Karol Bagh',
    storyText: 'After years of financial struggle and limited income, Kavita, a mother of two from Karol Bagh, found new direction through Samarth Bharat’s Beautician & Nail Art Course. Today, she runs a thriving salon supporting her family.',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/kavita-beautician.jpg'
  },
  {
    name: 'Badli Devi',
    role: 'Entrepreneur, Beauty Parlour',
    companyOrCenter: 'Chhawla Training Center',
    storyText: 'After completing the Beautician Course at Samarth Bharat’s Chhawla Training Center, Mrs. Badli Devi transformed her life through skill, confidence, and determination, successfully starting her own local enterprise.',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/badli-devi.jpg'
  },
  {
    name: 'Khushboo',
    role: 'Field Service Technician (AC/RO)',
    companyOrCenter: 'Sangam Vihar Center',
    storyText: 'Khushboo, a resident of Sangam Vihar, Delhi, chose a path that few women take — working in the AC and RO repair field. She completed her training from Samarth Bharat’s Sangam Vihar Center and now independently services household cooling appliances.',
    imageUrl: 'https://samarthbharat.net/wp-content/uploads/2025/05/khushboo.jpg'
  }
];
fs.writeFileSync(path.join(__dirname, 'storiesData.json'), JSON.stringify(stories, null, 2));
console.log(`Generated storiesData.json: ${stories.length} stories`);
