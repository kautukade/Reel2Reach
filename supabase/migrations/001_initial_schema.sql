-- Reel2Reach Media Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Metrics
CREATE TABLE IF NOT EXISTS metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT DEFAULT '',
  status TEXT DEFAULT 'published',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Categories
CREATE TABLE IF NOT EXISTS portfolio_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'published',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Items
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  brand TEXT DEFAULT '',
  slug TEXT UNIQUE NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT '',
  thumbnail_url TEXT,
  video_url TEXT,
  instagram_url TEXT,
  views INTEGER,
  likes INTEGER,
  reach INTEGER,
  campaign_type TEXT,
  publish_date DATE,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Packages
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price NUMERIC,
  price_suffix TEXT DEFAULT '',
  description TEXT DEFAULT '',
  features TEXT[] DEFAULT '{}',
  cta_text TEXT DEFAULT 'Get Started',
  cta_url TEXT DEFAULT '/book',
  recommended BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add-ons
CREATE TABLE IF NOT EXISTS addons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price TEXT DEFAULT 'On request',
  icon TEXT DEFAULT '',
  status TEXT DEFAULT 'published',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT '',
  icon TEXT DEFAULT '',
  status TEXT DEFAULT 'published',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Case Studies
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_name TEXT NOT NULL,
  industry TEXT DEFAULT '',
  cover_image TEXT,
  challenge TEXT DEFAULT '',
  approach TEXT DEFAULT '',
  content_produced TEXT DEFAULT '',
  results TEXT DEFAULT '',
  client_quote TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  company TEXT DEFAULT '',
  photo_url TEXT,
  testimonial TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  instagram_url TEXT,
  status TEXT DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  business_name TEXT DEFAULT '',
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  instagram TEXT DEFAULT '',
  category TEXT DEFAULT '',
  service TEXT DEFAULT '',
  budget TEXT DEFAULT '',
  preferred_date TEXT DEFAULT '',
  location TEXT DEFAULT '',
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'New',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social Links
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  label TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Homepage Settings
CREATE TABLE IF NOT EXISTS homepage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key TEXT UNIQUE NOT NULL,
  heading TEXT DEFAULT '',
  subheading TEXT DEFAULT '',
  cta_text TEXT DEFAULT '',
  cta_url TEXT DEFAULT '',
  media_url TEXT,
  visible BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEO Pages
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  route TEXT UNIQUE NOT NULL,
  title TEXT DEFAULT '',
  description TEXT DEFAULT '',
  og_title TEXT DEFAULT '',
  og_description TEXT DEFAULT '',
  og_image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;

-- Public read policies (published content only)
CREATE POLICY "Public read published portfolio" ON portfolio_items
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published packages" ON packages
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published addons" ON addons
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published services" ON services
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published case studies" ON case_studies
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read published testimonials" ON testimonials
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read metrics" ON metrics
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read categories" ON portfolio_categories
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Public read social links" ON social_links
  FOR SELECT USING (true);

CREATE POLICY "Public read homepage" ON homepage
  FOR SELECT USING (visible = true);

CREATE POLICY "Public read SEO" ON seo_pages
  FOR SELECT USING (true);

-- Public can INSERT leads (enquiry form submissions)
CREATE POLICY "Public insert leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Admin policies (authenticated users only)
-- These allow authenticated users full access
CREATE POLICY "Admin full access settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access metrics" ON metrics
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access categories" ON portfolio_categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access portfolio" ON portfolio_items
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access packages" ON packages
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access addons" ON addons
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access services" ON services
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access case studies" ON case_studies
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access leads" ON leads
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access social links" ON social_links
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access homepage" ON homepage
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access SEO" ON seo_pages
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- SEED DEFAULT PACKAGES (from PDF)
-- ============================================

INSERT INTO packages (name, price, price_suffix, description, features, cta_text, cta_url, recommended, sort_order) VALUES
('Basic Plan', 4999, '', 'Perfect for brands looking to create their first professional reel with influencer collaboration.', ARRAY['1 Reel (30–60 seconds)', 'Shot with an influencer', 'Scripted, directed and edited by the team', 'Caption + Hashtags + CTA', 'Story repost on influencer account', 'Influencer collaboration'], 'GET STARTED', '/book', false, 1),
('Combo Plan', 14999, '/month', 'Complete monthly content package with reels, posts, strategy, and influencer amplification.', ARRAY['4 Reels (1 per week)', 'Influencer + product integration', 'Edited + scripted + trending theme', '10–15 Instagram posts', 'Static + carousel + quote templates', 'Content strategy & calendar', 'Influencer reposting 2–3x', 'Analytics report at the end of month'], 'GET STARTED', '/book', true, 2),
('Custom Growth Plan', NULL, '', 'Tailored solutions for brands that need a comprehensive, multi-channel growth strategy.', ARRAY['Tailored to your specific needs', 'Full campaign management', 'Dedicated creative team', 'Multi-platform strategy', 'Priority support & revisions', 'Monthly performance reporting'], 'BUILD MY PACKAGE', '/book', false, 3);

-- Seed default add-ons
INSERT INTO addons (name, description, price, icon, sort_order) VALUES
('Paid Ads Setup & Boost', 'Inorganic marketing & paid promotion setup', 'On request', 'megaphone', 1),
('Social Media Management', 'Full account handling & management', 'On request', 'globe', 2),
('Google My Business', 'Registration & local SEO optimization', 'On request', 'target', 3),
('Instagram Audit & Strategy', 'Complete audit with growth strategy session', 'On request', 'chart', 4),
('Logo + Branding Design', 'Logo design & complete brand identity', 'On request', 'palette', 5);

-- Seed default portfolio categories
INSERT INTO portfolio_categories (name, slug, sort_order) VALUES
('Fashion', 'fashion', 1),
('Beauty', 'beauty', 2),
('Food', 'food', 3),
('Retail', 'retail', 4),
('Product', 'product', 5),
('Lifestyle', 'lifestyle', 6),
('Collaboration', 'collaboration', 7);

-- Seed site settings
INSERT INTO site_settings (key, value) VALUES
('site_name', 'Reel2Reach Media'),
('tagline', 'Your brand, our reel, everyone will see it.'),
('phone', '+91 8263058461'),
('email', 'real2reach@gmail.com'),
('instagram', '@ashwini_rathod_19'),
('instagram_url', 'https://instagram.com/ashwini_rathod_19'),
('whatsapp_number', '918263058461'),
('whatsapp_message', 'Hi Reel2Reach Media, I would like to discuss social media promotion/content creation for my business.');
