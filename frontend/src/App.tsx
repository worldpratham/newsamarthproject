import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import SamarthBharatIntro from '@/pages/SamarthBharatIntro';
import ProjectTeam from '@/pages/ProjectTeam';
import CommunityTrainingPrograms from '@/pages/CommunityTrainingPrograms';
import CourseDetail from '@/pages/CourseDetail';
import Events from '@/pages/Events';
import EventDetail from '@/pages/EventDetail';
import SuccessStories from '@/pages/SuccessStories';
import Gallery from '@/pages/Gallery';
import CareerDevelopmentCenter from '@/pages/CareerDevelopmentCenter';
import CentresDetails from '@/pages/CentresDetails';
import TrainingCenterDetail from '@/pages/TrainingCenterDetail';
import ContactUs from '@/pages/ContactUs';
import DonateUs from '@/pages/DonateUs';
import NotFound from '@/pages/NotFound';

// Admin Panel Pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminCourses from '@/pages/admin/AdminCourses';
import AdminEnrollments from '@/pages/admin/AdminEnrollments';
import AdminDonations from '@/pages/admin/AdminDonations';
import AdminLeads from '@/pages/admin/AdminLeads';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Panel Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="donations" element={<AdminDonations />} />
          <Route path="leads" element={<AdminLeads />} />
        </Route>

        {/* Public Website Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bhaorao-deoras-seva-nyas" element={<About />} />
          <Route path="/samarth-bharat-intro" element={<SamarthBharatIntro />} />
          <Route path="/project-team" element={<ProjectTeam />} />
          <Route path="/courses" element={<CommunityTrainingPrograms />} />
          <Route path="/courses/" element={<CommunityTrainingPrograms />} />
          <Route path="/community-training-programs" element={<CommunityTrainingPrograms />} />
          <Route path="/community-training-programs/" element={<CommunityTrainingPrograms />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/courses/:slug/" element={<CourseDetail />} />
          <Route path="/ac-fridge-repair-course" element={<CourseDetail />} />
          <Route path="/ac-fridge-repair-course/" element={<CourseDetail />} />
          <Route path="/beautician-course" element={<CourseDetail />} />
          <Route path="/beautician-course/" element={<CourseDetail />} />
          <Route path="/cutting-tailoring" element={<CourseDetail />} />
          <Route path="/cutting-tailoring/" element={<CourseDetail />} />
          <Route path="/digital-marketing-course" element={<CourseDetail />} />
          <Route path="/digital-marketing-course/" element={<CourseDetail />} />
          <Route path="/bakery-course" element={<CourseDetail />} />
          <Route path="/bakery-course/" element={<CourseDetail />} />
          <Route path="/truck-repairing-course" element={<CourseDetail />} />
          <Route path="/truck-repairing-course/" element={<CourseDetail />} />
          <Route path="/carpenter-training" element={<CourseDetail />} />
          <Route path="/carpenter-training/" element={<CourseDetail />} />
          <Route path="/general-duty-assistant" element={<CourseDetail />} />
          <Route path="/general-duty-assistant/" element={<CourseDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/" element={<Events />} />
          <Route path="/events-and-activities" element={<Events />} />
          <Route path="/events-and-activities/" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/events/:slug/" element={<EventDetail />} />
          <Route path="/samarth-bharat-vichar-goshti-2026" element={<EventDetail />} />
          <Route path="/dseu-signs-mou-with-samarth-bharat-and-sewa-bharti-to-promote-skill-development-and-socialupliftment" element={<EventDetail />} />
          <Route path="/seed-fund-accelerator-pitching-competition" element={<EventDetail />} />
          <Route path="/my-career-my-choice-a-step-towards-clarity-in-career-building" element={<EventDetail />} />
          <Route path="/training-to-self-employment-success-story-program" element={<EventDetail />} />
          <Route path="/workshop-reportfoundation-of-innovation-workshop-16-18-february-2026organized-under-the-aegis-of-the-career-development-centre" element={<EventDetail />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/success-stories/" element={<SuccessStories />} />
          <Route path="/career-development-center" element={<CareerDevelopmentCenter />} />
          <Route path="/career-development-center/" element={<CareerDevelopmentCenter />} />
          <Route path="/career-development-centre" element={<CareerDevelopmentCenter />} />
          <Route path="/career-development-centre/" element={<CareerDevelopmentCenter />} />
          <Route path="/training-center-detail" element={<TrainingCenterDetail />} />
          <Route path="/training-center-detail/" element={<TrainingCenterDetail />} />
          <Route path="/training-center-details" element={<TrainingCenterDetail />} />
          <Route path="/training-center-details/" element={<TrainingCenterDetail />} />
          <Route path="/centres-details" element={<CentresDetails />} />
          <Route path="/centres-details/" element={<CentresDetails />} />
          <Route path="/centers-details" element={<CentresDetails />} />
          <Route path="/centers-details/" element={<CentresDetails />} />
          <Route path="/video-editing-course" element={<CourseDetail />} />
          <Route path="/video-editing-course/" element={<CourseDetail />} />
          <Route path="/ai-prompt-engineering" element={<CourseDetail />} />
          <Route path="/ai-prompt-engineering/" element={<CourseDetail />} />
          <Route path="/flutter-app-development" element={<CourseDetail />} />
          <Route path="/flutter-app-development/" element={<CourseDetail />} />
          <Route path="/nail-art-course" element={<CourseDetail />} />
          <Route path="/nail-art-course/" element={<CourseDetail />} />
          <Route path="/ro-repairing-course" element={<CourseDetail />} />
          <Route path="/ro-repairing-course/" element={<CourseDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/" element={<Gallery />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/contact-us/" element={<ContactUs />} />
          <Route path="/donate-us" element={<DonateUs />} />
          <Route path="/donate-us/" element={<DonateUs />} />
          <Route path="/donate" element={<DonateUs />} />
          <Route path="/donate/" element={<DonateUs />} />
          <Route path="/:slug" element={<CourseDetail />} />
          <Route path="/:slug/" element={<CourseDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
