import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Image, Briefcase, Package, Plus, MessageSquare, 
  Users, Settings, FileText, LogOut, Menu, X, Loader2, AlertCircle
} from 'lucide-react';

// Admin Login
export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured. Please set up environment variables.');
      setLoading(false);
      return;
    }

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      navigate('/admin/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07090F] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center">
            <span className="text-white font-bold">R2</span>
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-[#A9ACB8] text-sm mt-1">Reel2Reach Media</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 p-8 rounded-2xl bg-[#0B0E16] border border-white/5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#10131D] border border-white/10 text-white focus:border-[#FF3D8D]/50 focus:outline-none"
              placeholder="admin@reel2reach.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#10131D] border border-white/10 text-white focus:border-[#FF3D8D]/50 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-[#A9ACB8] text-xs mt-6">
          <Link to="/" className="hover:text-white">← Back to website</Link>
        </p>
      </motion.div>
    </div>
  );
}

// Admin Layout
function AdminLayout({ children, activeTab, onTabChange }: { children: React.ReactNode; activeTab: string; onTabChange: (tab: string) => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads', icon: MessageSquare },
    { id: 'portfolio', label: 'Portfolio', icon: Image },
    { id: 'packages', label: 'Packages', icon: Package },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: Users },
    { id: 'case-studies', label: 'Case Studies', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#07090F] flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B0E16] border-r border-white/5 transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center">
                <span className="text-white font-bold text-xs">R2</span>
              </div>
              <span className="font-bold text-sm">Admin</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#A9ACB8]">
              <X size={20} />
            </button>
          </div>
        </div>
        <nav className="px-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { onTabChange(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#FF3D8D]/10 text-[#FF3D8D]'
                  : 'text-[#A9ACB8] hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[#A9ACB8] hover:text-white hover:bg-white/5 transition-colors">
            <LogOut size={18} /> Logout
          </button>
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[#A9ACB8] hover:text-white hover:bg-white/5 transition-colors mt-1">
            ← View Website
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-40 bg-[#07090F]/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#A9ACB8]">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold capitalize">{activeTab}</h1>
        </header>
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}

// Dashboard content
function DashboardContent() {
  const [stats, setStats] = useState({ leads: 0, portfolio: 0, packages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!isSupabaseConfigured()) { setLoading(false); return; }
      try {
        const [{ count: leadsCount }, { count: portfolioCount }, { count: packagesCount }] = await Promise.all([
          supabase.from('leads').select('*', { count: 'exact', head: true }),
          supabase.from('portfolio_items').select('*', { count: 'exact', head: true }),
          supabase.from('packages').select('*', { count: 'exact', head: true }),
        ]);
        setStats({ leads: leadsCount || 0, portfolio: portfolioCount || 0, packages: packagesCount || 0 });
      } catch { /* ignore */ }
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Leads', value: stats.leads, color: 'from-[#FF5A5F] to-[#FF3D8D]' },
          { label: 'Portfolio Items', value: stats.portfolio, color: 'from-[#FF3D8D] to-[#8B5CF6]' },
          { label: 'Packages', value: stats.packages, color: 'from-[#8B5CF6] to-[#FF5A5F]' },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-xl bg-[#0B0E16] border border-white/5">
            <p className="text-[#A9ACB8] text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">
              {loading ? '—' : stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-xl bg-[#0B0E16] border border-white/5">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/book" className="px-4 py-2 rounded-lg bg-white/5 text-sm hover:bg-white/10 transition-colors">
            + New Lead (Test)
          </Link>
          <span className="px-4 py-2 rounded-lg bg-white/5 text-sm text-[#A9ACB8]">
            Manage content from sidebar
          </span>
        </div>
      </div>
      {!isSupabaseConfigured() && (
        <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
          <p className="font-medium mb-1">Supabase Not Configured</p>
          <p>Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment to enable database features.</p>
        </div>
      )}
    </div>
  );
}

// Leads content
function LeadsContent() {
  const [leads, setLeads] = useState<Array<{id: string; name: string; phone: string; service: string; status: string; created_at: string}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      if (!isSupabaseConfigured()) { setLoading(false); return; }
      try {
        const { data } = await supabase.from('leads').select('id, name, phone, service, status, created_at').order('created_at', { ascending: false }).limit(50);
        if (data) setLeads(data);
      } catch { /* ignore */ }
      setLoading(false);
    }
    fetchLeads();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center py-12"><Loader2 className="animate-spin text-[#A9ACB8]" /></div>
      ) : leads.length === 0 ? (
        <div className="text-center py-12 text-[#A9ACB8]">
          <MessageSquare size={40} className="mx-auto mb-4 opacity-30" />
          <p>No leads yet. Leads will appear here when submitted through the website.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-[#A9ACB8] font-medium">Name</th>
                <th className="text-left py-3 px-4 text-[#A9ACB8] font-medium">Phone</th>
                <th className="text-left py-3 px-4 text-[#A9ACB8] font-medium">Service</th>
                <th className="text-left py-3 px-4 text-[#A9ACB8] font-medium">Status</th>
                <th className="text-left py-3 px-4 text-[#A9ACB8] font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-3 px-4">{lead.name}</td>
                  <td className="py-3 px-4">
                    <a href={`tel:${lead.phone}`} className="text-[#FF3D8D] hover:underline">{lead.phone}</a>
                  </td>
                  <td className="py-3 px-4 text-[#A9ACB8]">{lead.service}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full bg-white/5 text-xs">{lead.status}</span>
                  </td>
                  <td className="py-3 px-4 text-[#A9ACB8]">{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Generic placeholder content
function PlaceholderContent({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center py-12">
      <Plus size={40} className="mx-auto mb-4 text-[#A9ACB8]/30" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-[#A9ACB8] text-sm max-w-md mx-auto">{description}</p>
    </div>
  );
}

// Admin Dashboard (main container)
export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardContent />;
      case 'leads': return <LeadsContent />;
      case 'portfolio': return <PlaceholderContent title="Portfolio Manager" description="Manage your portfolio items, upload media, and organize your work showcase." />;
      case 'packages': return <PlaceholderContent title="Package Manager" description="Create and manage your service packages, pricing, and features." />;
      case 'services': return <PlaceholderContent title="Services Manager" description="Manage your service offerings and descriptions." />;
      case 'testimonials': return <PlaceholderContent title="Testimonials Manager" description="Add and manage client testimonials." />;
      case 'case-studies': return <PlaceholderContent title="Case Studies Manager" description="Create detailed case studies showcasing your work and results." />;
      case 'settings': return <PlaceholderContent title="Site Settings" description="Configure site-wide settings, contact info, and social links." />;
      default: return <DashboardContent />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
}
