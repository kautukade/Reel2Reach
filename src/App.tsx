import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Packages = lazy(() => import('./pages/Packages'));
const Book = lazy(() => import('./pages/Book'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const InfluencerMarketing = lazy(() => import('./pages/OtherPages').then((module) => ({ default: module.InfluencerMarketing })));
const SocialMediaManagement = lazy(() => import('./pages/OtherPages').then((module) => ({ default: module.SocialMediaManagement })));
const Privacy = lazy(() => import('./pages/OtherPages').then((module) => ({ default: module.Privacy })));
const Terms = lazy(() => import('./pages/OtherPages').then((module) => ({ default: module.Terms })));
const NotFound = lazy(() => import('./pages/OtherPages').then((module) => ({ default: module.NotFound })));
const AdminLogin = lazy(() => import('./pages/admin/AdminPages').then((module) => ({ default: module.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminPages').then((module) => ({ default: module.AdminDashboard })));

function PageLoader() {
  return (
    <div className="relative flex min-h-[56svh] items-center justify-center overflow-hidden bg-[#07090F] px-4 text-white">
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#FF3D8D]/10 blur-[100px]" />
      <div className="relative text-center">
        <div className="mx-auto h-10 w-10 rounded-full border border-white/10 border-t-[#FF6AA7] motion-safe:animate-spin" />
        <p className="mt-5 text-[9px] font-bold uppercase tracking-[.28em] text-white/35">Loading the next frame</p>
      </div>
    </div>
  );
}

function Deferred({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setAuthenticated(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(!!data.session);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (authenticated === null) return <PageLoader />;
  if (!authenticated) return <Navigate to="/admin" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Deferred><About /></Deferred>} />
          <Route path="/services" element={<Deferred><Services /></Deferred>} />
          <Route path="/portfolio" element={<Deferred><Portfolio /></Deferred>} />
          <Route path="/packages" element={<Deferred><Packages /></Deferred>} />
          <Route path="/influencer-marketing" element={<Deferred><InfluencerMarketing /></Deferred>} />
          <Route path="/social-media-management" element={<Deferred><SocialMediaManagement /></Deferred>} />
          <Route path="/case-studies" element={<Deferred><CaseStudies /></Deferred>} />
          <Route path="/blog" element={<Deferred><Blog /></Deferred>} />
          <Route path="/blog/:slug" element={<Deferred><BlogPost /></Deferred>} />
          <Route path="/book" element={<Deferred><Book /></Deferred>} />
          <Route path="/contact" element={<Deferred><Contact /></Deferred>} />
          <Route path="/privacy" element={<Deferred><Privacy /></Deferred>} />
          <Route path="/terms" element={<Deferred><Terms /></Deferred>} />
        </Route>

        <Route path="/admin" element={<Deferred><AdminLogin /></Deferred>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Deferred><AdminDashboard /></Deferred></ProtectedRoute>} />
        <Route path="*" element={<Deferred><NotFound /></Deferred>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
