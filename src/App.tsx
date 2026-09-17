import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import Events from '@/pages/Events';
import EventDetail from '@/pages/EventDetail';
import SuccessStories from '@/pages/SuccessStories';
import ContactUs from '@/pages/ContactUs';
import DonateUs from '@/pages/DonateUs';
import NotFound from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/donate-us" element={<DonateUs />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
