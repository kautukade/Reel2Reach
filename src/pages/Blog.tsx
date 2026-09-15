import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Loader2, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArtHero, CreativeStrip } from '../components/common/ArtistExperience';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  author_name: string;
  category: string;
  featured: boolean;
  published_at: string | null;
  created_at: string;
};

function formatDate(value: string | null, fallback: string) {
  const date = new Date(value || fallback);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ delay: Math.min(index * 0.05, 0.25), duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-[30px] border border-white/[0.07] bg-[#0B0E16]/82 shadow-[0_26px_80px_rgba(0,0,0,.25)] backdrop-blur-xl"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(145deg,#271321,#12101d_45%,#090b12)]">
          {post.cover_image ? (
            <motion.img
              src={post.cover_image}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.045 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="absolute inset-0">
              <div className="absolute -left-10 top-0 h-48 w-48 rounded-full bg-[#FF3D8D]/25 blur-3xl" />
              <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-[#8B5CF6]/25 blur-3xl" />
              <div className="absolute inset-0 cinematic-grid opacity-30" />
              <Sparkles className="absolute bottom-6 right-6 text-white/35" size={28} />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/75 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded-full border border-white/12 bg-black/25 px-3 py-1 text-[9px] font-bold uppercase tracking-[.18em] text-white/75 backdrop-blur-xl">
              {post.category || 'Creative'}
            </span>
            {post.featured && (
              <span className="rounded-full bg-[#FF3D8D] px-3 py-1 text-[9px] font-bold uppercase tracking-[.18em] text-white">Featured</span>
            )}
          </div>
          <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white opacity-0 backdrop-blur-xl transition group-hover:opacity-100">
            <ArrowRight size={16} />
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[.15em] text-white/35">
            <span className="inline-flex items-center gap-1.5"><CalendarDays size={12} /> {formatDate(post.published_at, post.created_at)}</span>
            <span>•</span>
            <span>{post.author_name || 'Reel2Reach Media'}</span>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold leading-[1.02] tracking-[-.035em] transition-colors group-hover:text-[#FF7AB5] sm:text-3xl">
            {post.title}
          </h2>
          {post.excerpt && <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#A9ACB8]">{post.excerpt}</p>}
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-white/75">
            Read story <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    let active = true;
    async function load() {
      if (!isSupabaseConfigured()) {
        if (active) setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('blog_posts')
        .select('id,title,slug,excerpt,cover_image,author_name,category,featured,published_at,created_at')
        .eq('status', 'published')
        .order('featured', { ascending: false })
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });
      if (active) {
        setPosts((data || []) as BlogPost[]);
        setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))], [posts]);
  const filtered = category === 'All' ? posts : posts.filter((post) => post.category === category);
  const featured = filtered.find((post) => post.featured) || filtered[0];
  const rest = featured ? filtered.filter((post) => post.id !== featured.id) : filtered;

  return (
    <div className="pb-20">
      <ArtHero
        eyebrow="JOURNAL / REEL2REACH"
        lines={['IDEAS BEHIND', 'THE']}
        highlight="REEL."
        description="Creative direction, visual culture, social-media thinking, behind-the-scenes stories and practical ideas for brands that want to be remembered."
        chips={['CREATIVE', 'REELS', 'BRANDING', 'BEHIND THE SCENES']}
        primary={{ label: 'EXPLORE STORIES', to: '/blog' }}
        secondary={{ label: 'WORK WITH US', to: '/book' }}
        visualLabel="JOURNAL / LIVE MOTION"
        visualTitle="THOUGHTS THAT MOVE"
        visualSubtitle="A living editorial space for stories, photographs, videos and creative process."
        accent="purple"
      />

      <CreativeStrip words={['STORIES', 'IDEAS', 'PROCESS', 'VISUAL CULTURE', 'REELS', 'BRANDS', 'PEOPLE']} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#FF6AA7]">THE JOURNAL</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-[-.045em] sm:text-6xl">Stories worth<br /><span className="gradient-text gradient-text-live">stopping for.</span></h1>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${category === item ? 'bg-white text-[#07090F]' : 'border border-white/10 bg-white/[0.025] text-white/55 hover:text-white'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[360px] items-center justify-center"><Loader2 className="animate-spin text-white/35" /></div>
        ) : filtered.length === 0 ? (
          <div className="rounded-[34px] border border-white/[0.07] bg-[#0B0E16]/75 px-6 py-20 text-center">
            <Play size={30} className="mx-auto text-[#FF6AA7]" />
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold">No published stories yet.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#A9ACB8]">The admin can create a post, add multiple photographs and videos, then publish it here.</p>
          </div>
        ) : (
          <>
            {featured && (
              <motion.article initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="group mb-8 overflow-hidden rounded-[36px] border border-white/[0.08] bg-[#0B0E16]/85 lg:grid lg:grid-cols-[1.15fr_.85fr]">
                <Link to={`/blog/${featured.slug}`} className="relative block min-h-[360px] overflow-hidden bg-[linear-gradient(140deg,#351323,#14101e_48%,#090b12)] lg:min-h-[520px]">
                  {featured.cover_image ? <img src={featured.cover_image} alt={featured.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" /> : <div className="absolute inset-0 cinematic-grid opacity-30" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/65 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#07090F]/20" />
                </Link>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#FF7AB5]"><Sparkles size={13} /> Featured story</div>
                  <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-bold leading-[.98] tracking-[-.045em] sm:text-5xl">{featured.title}</h2>
                  {featured.excerpt && <p className="mt-5 text-sm leading-7 text-[#A9ACB8] sm:text-base">{featured.excerpt}</p>}
                  <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.15em] text-white/35">{formatDate(featured.published_at, featured.created_at)} · {featured.author_name || 'Reel2Reach Media'}</p>
                  <Link to={`/blog/${featured.slug}`} className="group/link mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">Read full story <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" /></Link>
                </div>
              </motion.article>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => <BlogCard key={post.id} post={post} index={index} />)}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
