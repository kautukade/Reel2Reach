import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import CustomCursor from '../common/CustomCursor';
import ScrollProgress from '../common/ScrollProgress';
import FilmGrain from '../common/FilmGrain';
import IntroAnimation from '../common/IntroAnimation';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#07090F] text-white">
      <IntroAnimation />
      <CustomCursor />
      <ScrollProgress />
      <FilmGrain />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <div key={location.pathname}>
            <Outlet />
          </div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
