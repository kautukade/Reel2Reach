import type { FormEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  Briefcase,
  Database,
  ExternalLink,
  FileText,
  HardDrive,
  Home,
  Images,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Puzzle,
  SearchCheck,
  Settings,
  Share2,
  Tags,
  Users,
  X,
} from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import BlogManager from './BlogManager';
import {
  AddonsManager,
  CaseStudiesManager,
  CategoriesManager,
  HomepageManager,
  LeadsManager,
  MediaLibraryManager,
  MetricsManager,
  PackagesManager,
  PortfolioManager,
  SeoManager,
  ServicesManager,
  SettingsManager,
  SocialLinksManager,
  TestimonialsManager,
} from './AdminManagers';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY first.');
      setLoading(false);
      return;
    }
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (authError) throw authError;
      navigate('/admin/dashboard');
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07090F] px-4 text-white">
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#FF3D8D]/12 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-[#8B5CF6]/12 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[0.1]" />

      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6] shadow-[0_20px_55px_rgba(255,61,141,.2)]"><span className="font-bold">R2</span></div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">Reel2Reach CMS</h1>
          <p className="mt-2 text-sm text-[#A9ACB8]">Manage blogs, media, leads and website content.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 rounded-[26px] border border-white/[0.07] bg-[#0B0E16]/90 p-7 shadow-2xl backdrop-blur-xl">
          {error && <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"><AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}</div>}
          <div><label className="mb-2 block text-xs font-semibold text-white/65">Email</label><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" className="creative-input" placeholder="admin@email.com" /></div>
          <div><label className="mb-2 block text-xs font-semibold text-white/65">Password</label><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" className="creative-input" placeholder="••••••••" /></div>
          <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(255,61,141,.18)] disabled:opacity-50">{loading ? <Loader2 size={17} className="animate-spin" /> : 'Sign In'}</button>
        </form>
        <p className="mt-6 text-center text-xs text-white/35"><Link to="/" className="transition hover:text-white">← Back to website</Link></p>
      </motion.div>
    </div>
  );
}

type TabId = 'dashboard' | 'blog' | 'leads' | 'media' | 'portfolio' | 'categories' | 'services' | 'packages' | 'addons' | 'testimonials' | 'case-studies' | 'homepage' | 'metrics' | 'social' | 'seo' | 'settings';

const tabs: Array<{ id: TabId; label: string; icon: typeof LayoutDashboard; group: string }> = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Overview' },
  { id: 'blog', label: 'Blog / Journal', icon: BookOpen, group: 'Content' },
  { id: 'media', label: 'Media Library', icon: HardDrive, group: 'Content' },
  { id: 'portfolio', label: 'Portfolio', icon: Images, group: 'Content' },
  { id: 'categories', label: 'Portfolio Categories', icon: Tags, group: 'Content' },
  { id: 'services', label: 'Services', icon: Briefcase, group: 'Content' },
  { id: 'packages', label: 'Packages', icon: Package, group: 'Content' },
  { id: 'addons', label: 'Add-ons', icon: Puzzle, group: 'Content' },
  { id: 'testimonials', label: 'Testimonials', icon: Users, group: 'Content' },
  { id: 'case-studies', label: 'Case Studies', icon: FileText, group: 'Content' },
  { id: 'homepage', label: 'Homepage CMS', icon: Home, group: 'Website' },
  { id: 'metrics', label: 'Metrics', icon: BarChart3, group: 'Website' },
  { id: 'social', label: 'Social Links', icon: Share2, group: 'Website' },
  { id: 'seo', label: 'SEO', icon: SearchCheck, group: 'Website' },
  { id: 'settings', label: 'Site Settings', icon: Settings, group: 'Website' },
  { id: 'leads', label: 'Leads', icon: MessageSquare, group: 'Business' },
];

function AdminLayout({ children, activeTab, onTabChange }: { children: ReactNode; activeTab: TabId; onTabChange: (tab: TabId) => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const groups = Array.from(new Set(tabs.map((tab) => tab.group)));
  const active = tabs.find((tab) => tab.id === activeTab);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email || ''));
  }, []);

  const logout = async () => {
    if (isSupabaseConfigured()) await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <div className="flex min-h-screen bg-[#07090F] text-white">
      <aside className={`fixed inset-y-0 left-0 z-[70] flex w-[286px] flex-col border-r border-white/[0.06] bg-[#090C13] transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-5">
          <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] text-xs font-bold">R2</div><div><p className="font-bold leading-none">Reel2Reach</p><p className="mt-1 text-[9px] uppercase tracking-[.2em] text-white/25">Content OS</p></div></div>
          <button onClick={() => setSidebarOpen(false)} className="text-white/45 lg:hidden"><X size={19} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 [scrollbar-width:thin]">
          {groups.map((group) => (
            <div key={group} className="mb-5">
              <p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[.2em] text-white/20">{group}</p>
              <div className="space-y-1">
                {tabs.filter((tab) => tab.group === group).map((tab) => {
                  const selected = tab.id === activeTab;
                  return <button key={tab.id} onClick={() => { onTabChange(tab.id); setSidebarOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${selected ? 'bg-[#FF3D8D]/10 text-[#FF7AB5]' : 'text-white/48 hover:bg-white/[0.035] hover:text-white'}`}><tab.icon size={17} /><span className="flex-1">{tab.label}</span>{selected && <span className="h-1.5 w-1.5 rounded-full bg-[#FF3D8D]" />}</button>;
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] p-3">
          {email && <p className="mb-2 truncate px-3 text-[10px] text-white/25">{email}</p>}
          <Link to="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition hover:bg-white/[0.03] hover:text-white"><ExternalLink size={16} /> View website</Link>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition hover:bg-red-500/[0.06] hover:text-red-300"><LogOut size={16} /> Logout</button>
        </div>
      </aside>

      {sidebarOpen && <button aria-label="Close sidebar" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm lg:hidden" />}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b border-white/[0.06] bg-[#07090F]/88 px-4 backdrop-blur-2xl sm:px-6 lg:h-20 lg:px-8">
          <button onClick={() => setSidebarOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 lg:hidden"><Menu size={19} /></button>
          <div className="min-w-0"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-white/25">Admin / {active?.group}</p><h1 className="mt-0.5 truncate font-semibold">{active?.label}</h1></div>
          <div className="ml-auto flex items-center gap-2"><span className="hidden items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-3 py-1.5 text-[10px] font-semibold text-emerald-300 sm:inline-flex"><Database size={12} /> Supabase CMS</span></div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

type DashboardStats = { leads: number; blogs: number; publishedBlogs: number; portfolio: number; services: number; packages: number };

function DashboardContent({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const [stats, setStats] = useState<DashboardStats>({ leads: 0, blogs: 0, publishedBlogs: 0, portfolio: 0, services: 0, packages: 0 });
  const [loading, setLoading] = useState(true);
  const [recentBlogs, setRecentBlogs] = useState<Array<{ id: string; title: string; status: string; created_at: string }>>([]);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!isSupabaseConfigured()) { if (active) setLoading(false); return; }
      const [leads, blogs, publishedBlogs, portfolio, services, packages, blogRows] = await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
        supabase.from('portfolio_items').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('packages').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('id,title,status,created_at').order('created_at', { ascending: false }).limit(5),
      ]);
      if (!active) return;
      setStats({ leads: leads.count || 0, blogs: blogs.count || 0, publishedBlogs: publishedBlogs.count || 0, portfolio: portfolio.count || 0, services: services.count || 0, packages: packages.count || 0 });
      setRecentBlogs((blogRows.data || []) as Array<{ id: string; title: string; status: string; created_at: string }>);
      setLoading(false);
    }
    load();
    return () => { active = false; };
  }, []);

  const cards = [
    ['Total Leads', stats.leads, 'leads' as TabId],
    ['Blog Posts', stats.blogs, 'blog' as TabId],
    ['Published Blogs', stats.publishedBlogs, 'blog' as TabId],
    ['Portfolio Items', stats.portfolio, 'portfolio' as TabId],
    ['Services', stats.services, 'services' as TabId],
    ['Packages', stats.packages, 'packages' as TabId],
  ] as const;

  return (
    <div>
      <div className="mb-8"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#FF6AA7]">Control center</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold">Website CMS Dashboard</h2><p className="mt-2 text-sm text-[#A9ACB8]">Everything the client needs to publish blog stories and manage website content from one place.</p></div>

      {!isSupabaseConfigured() && <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4 text-sm text-amber-200"><p className="font-semibold">Supabase is not configured.</p><p className="mt-1 text-amber-100/60">Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable the CMS.</p></div>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([label, value, tab]) => <button key={label} onClick={() => onNavigate(tab)} className="group rounded-2xl border border-white/[0.06] bg-[#0B0E16] p-5 text-left transition hover:-translate-y-0.5 hover:border-white/10"><p className="text-xs text-white/35">{label}</p><div className="mt-2 flex items-end justify-between"><p className="text-3xl font-bold">{loading ? '—' : value}</p><span className="text-xs text-[#FF7AB5] opacity-0 transition group-hover:opacity-100">Manage →</span></div></button>)}</div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-[24px] border border-white/[0.06] bg-[#0B0E16] p-5"><div className="flex items-center justify-between"><div><h3 className="font-semibold">Recent blog posts</h3><p className="mt-1 text-xs text-white/30">Latest stories created from the CMS</p></div><button onClick={() => onNavigate('blog')} className="text-xs font-semibold text-[#FF7AB5]">Open Blog CMS</button></div><div className="mt-5 space-y-2">{recentBlogs.length === 0 ? <p className="py-8 text-center text-sm text-white/30">No blog posts yet.</p> : recentBlogs.map((post) => <div key={post.id} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 py-3"><BookOpen size={15} className="text-[#FF6AA7]" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{post.title}</p><p className="mt-0.5 text-[10px] text-white/25">{new Date(post.created_at).toLocaleDateString('en-IN')}</p></div><span className={`rounded-full px-2 py-1 text-[9px] uppercase tracking-[.12em] ${post.status === 'published' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-200'}`}>{post.status}</span></div>)}</div></div>
        <div className="rounded-[24px] border border-white/[0.06] bg-[#0B0E16] p-5"><h3 className="font-semibold">Quick actions</h3><p className="mt-1 text-xs text-white/30">Most common client tasks</p><div className="mt-5 grid gap-2">{[['Create blog post','blog'],['Upload media','media'],['Review leads','leads'],['Edit packages','packages'],['Site settings','settings']].map(([label, tab]) => <button key={label} onClick={() => onNavigate(tab as TabId)} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-white">{label}</button>)}</div></div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  let content: ReactNode;
  switch (activeTab) {
    case 'blog': content = <BlogManager />; break;
    case 'leads': content = <LeadsManager />; break;
    case 'media': content = <MediaLibraryManager />; break;
    case 'portfolio': content = <PortfolioManager />; break;
    case 'categories': content = <CategoriesManager />; break;
    case 'services': content = <ServicesManager />; break;
    case 'packages': content = <PackagesManager />; break;
    case 'addons': content = <AddonsManager />; break;
    case 'testimonials': content = <TestimonialsManager />; break;
    case 'case-studies': content = <CaseStudiesManager />; break;
    case 'homepage': content = <HomepageManager />; break;
    case 'metrics': content = <MetricsManager />; break;
    case 'social': content = <SocialLinksManager />; break;
    case 'seo': content = <SeoManager />; break;
    case 'settings': content = <SettingsManager />; break;
    default: content = <DashboardContent onNavigate={setActiveTab} />;
  }
  return <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>{content}</AdminLayout>;
}
