import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Loader2, UserRound } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type BlogPostRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author_name: string;
  category: string;
  published_at: string | null;
  created_at: string;
};

type BlogMedia = {
  id: string;
  media_type: 'image' | 'video';
  url: string;
  caption: string;
  alt_text: string;
  sort_order: number;
};

function formatDate(value: string | null, fallback: string) {
  return new Date(value || fallback).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostRecord | null>(null);
  const [media, setMedia] = useState<BlogMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!slug || !isSupabaseConfigured()) {
        if (active) setLoading(false);
        return;
      }
      const { data: postData } = await supabase
        .from('blog_posts')
        .select('id,title,slug,excerpt,content,cover_image,author_name,category,published_at,created_at')
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();
      if (!postData) {
        if (active) setLoading(false);
        return;
      }
      const { data: mediaData } = await supabase
        .from('blog_media')
        .select('id,media_type,url,caption,alt_text,sort_order')
        .eq('post_id', postData.id)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true });
      if (active) {
        setPost(postData as BlogPostRecord);
        setMedia((mediaData || []) as BlogMedia[]);
        setLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [slug]);

  if (loading) {
    return <div className="flex min-h-[70vh] items-center justify-center"><Loader2 className="animate-spin text-white/35" /></div>;
  }

  if (!post) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#FF6AA7]">Journal</p>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold">Story not found.</h1>
        <p className="mt-4 text-[#A9ACB8]">This article may be a draft, unpublished, or removed.</p>
        <Link to="/blog" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-semibold"><ArrowLeft size={15} /> Back to Blog</Link>
      </div>
    );
  }

  const paragraphs = post.content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-white/45 transition hover:text-white"><ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Journal</Link>

        <header className="mx-auto mt-12 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[.17em] text-[#FF7AB5]">
            <span>{post.category || 'Creative'}</span><span className="text-white/20">•</span>
            <span className="inline-flex items-center gap-1.5 text-white/40"><CalendarDays size={12} /> {formatDate(post.published_at, post.created_at)}</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .75 }} className="mt-5 font-[family-name:var(--font-display)] text-4xl font-bold leading-[.96] tracking-[-.05em] sm:text-6xl lg:text-7xl">
            {post.title}
          </motion.h1>
          {post.excerpt && <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }} className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#A9ACB8] sm:text-lg">{post.excerpt}</motion.p>}
          <div className="mt-6 inline-flex items-center gap-2 text-xs text-white/40"><UserRound size={14} /> {post.author_name || 'Reel2Reach Media'}</div>
        </header>

        <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .22, duration: .8 }} className="relative mt-12 overflow-hidden rounded-[38px] border border-white/[0.08] bg-[#0B0E16] shadow-[0_40px_120px_rgba(0,0,0,.38)]">
          <div className="aspect-[16/9] min-h-[300px] bg-[linear-gradient(145deg,#351222,#171020_48%,#090b12)]">
            {post.cover_image ? <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" /> : <div className="h-full w-full cinematic-grid opacity-30" />}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090F]/30 via-transparent to-transparent" />
        </motion.div>

        <div className="mx-auto mt-14 max-w-3xl">
          {paragraphs.length > 0 ? (
            <div className="space-y-7">
              {paragraphs.map((paragraph, index) => (
                <motion.p key={`${paragraph.slice(0, 30)}-${index}`} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="whitespace-pre-line text-[15px] leading-8 text-[#CED0D8] sm:text-[17px] sm:leading-9">
                  {paragraph}
                </motion.p>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-white/35">This visual story is built around the media below.</p>
          )}
        </div>

        {media.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/[0.06] pb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#FF6AA7]">Visual story</p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold">Photos & videos</h2>
              </div>
              <p className="hidden text-xs uppercase tracking-[.15em] text-white/25 sm:block">{media.length} media</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {media.map((item, index) => (
                <motion.figure
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ delay: Math.min(index * .04, .18) }}
                  className={`overflow-hidden rounded-[30px] border border-white/[0.07] bg-[#0B0E16] ${index % 5 === 0 ? 'md:col-span-2' : ''}`}
                >
                  {item.media_type === 'video' ? (
                    <video src={item.url} controls playsInline preload="metadata" className={`w-full bg-black object-contain ${index % 5 === 0 ? 'max-h-[760px]' : 'max-h-[620px]'}`} />
                  ) : (
                    <img src={item.url} alt={item.alt_text || item.caption || post.title} loading="lazy" className="h-auto w-full object-cover" />
                  )}
                  {item.caption && <figcaption className="border-t border-white/[0.05] px-5 py-4 text-xs leading-6 text-white/45">{item.caption}</figcaption>}
                </motion.figure>
              ))}
            </div>
          </section>
        )}

        <div className="mx-auto mt-20 max-w-4xl rounded-[34px] border border-white/[0.08] bg-[#0B0E16]/80 px-6 py-12 text-center sm:px-10">
          <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#FF6AA7]">Have a story to tell?</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl">Turn your brand into<br /><span className="gradient-text gradient-text-live">something worth watching.</span></h2>
          <Link to="/book" className="mt-7 inline-flex items-center rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-6 py-3 text-sm font-semibold text-white">Book a collaboration</Link>
        </div>
      </div>
    </article>
  );
}
