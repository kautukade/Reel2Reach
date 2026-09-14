import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Packages from './pages/Packages';
import Book from './pages/Book';
import Contact from './pages/Contact';
import { InfluencerMarketing, SocialMediaManagement, CaseStudies, Privacy, Terms, NotFound } from './pages/OtherPages';
import { AdminLogin, AdminDashboard } from './pages/admin/AdminPages';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
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

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07090F]">
        <div className="animate-pulse text-[#A9ACB8]">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/influencer-marketing" element={<InfluencerMarketing />} />
          <Route path="/social-media-management" element={<SocialMediaManagement />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>

        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
