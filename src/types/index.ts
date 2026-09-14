export interface PortfolioItem {
  id: string;
  title: string;
  brand: string;
  slug: string;
  description: string;
  category: string;
  thumbnail_url: string | null;
  video_url: string | null;
  instagram_url: string | null;
  views: number | null;
  likes: number | null;
  reach: number | null;
  campaign_type: string | null;
  publish_date: string | null;
  featured: boolean;
  status: string;
  sort_order: number;
  created_at: string;
}

export interface Package {
  id: string;
  name: string;
  price: number | null;
  price_suffix: string;
  description: string;
  features: string[];
  cta_text: string;
  cta_url: string;
  recommended: boolean;
  status: string;
  sort_order: number;
  created_at: string;
}

export interface Addon {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: string;
  status: string;
  sort_order: number;
  created_at: string;
}

export interface CaseStudy {
  id: string;
  brand_name: string;
  industry: string;
  cover_image: string | null;
  challenge: string;
  approach: string;
  content_produced: string;
  results: string;
  client_quote: string | null;
  status: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  photo_url: string | null;
  testimonial: string;
  rating: number;
  instagram_url: string | null;
  status: string;
  created_at: string;
}

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  business_name: string;
  phone: string;
  email: string;
  instagram: string;
  category: string;
  service: string;
  budget: string;
  preferred_date: string;
  location: string;
  message: string;
  status: string;
  notes: string;
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  icon: string;
  status: string;
  sort_order: number;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  status: string;
  sort_order: number;
}
