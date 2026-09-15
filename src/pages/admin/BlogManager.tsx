import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  Video,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { deleteAdminMedia, mediaTypeFromFile, slugify, uploadAdminMedia } from '../../lib/adminMedia';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

type BlogPostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author_name: string;
  category: string;
  featured: boolean;
  status: 'draft' | 'published';
  published_at: string | null;
  seo_title: string;
  seo_description: string;
  created_at: string;
  updated_at: string;
};

type BlogMediaRow = {
  id: string;
  post_id: string;
  media_type: 'image' | 'video';
  url: string;
  storage_path: string | null;
  caption: string;
  alt_text: string;
  sort_order: number;
  created_at: string;
};

type BlogForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_name: string;
  category: string;
  featured: boolean;
  status: 'draft' | 'published';
  seo_title: string;
  seo_description: string;
};

const emptyForm: BlogForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  author_name: 'Reel2Reach Media',
  category: 'Creative',
  featured: false,
  status: 'draft',
  seo_title: '',
  seo_description: '',
};

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [media, setMedia] = useState<BlogMediaRow[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [externalUrl, setExternalUrl] = useState('');
  const [externalType, setExternalType] = useState<'image' | 'video'>('image');
  const [externalCaption, setExternalCaption] = useState('');

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }
    const { data, error: loadError } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (loadError) setError(loadError.message);
    setPosts((data || []) as BlogPostRow[]);
    setLoading(false);
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const loadMedia = useCallback(async (postId: string) => {
    const { data, error: mediaError } = await supabase.from('blog_media').select('*').eq('post_id', postId).order('sort_order', { ascending: true }).order('created_at', { ascending: true });
    if (mediaError) setError(mediaError.message);
    setMedia((data || []) as BlogMediaRow[]);
  }, []);

  const counts = useMemo(() => ({ published: posts.filter((post) => post.status === 'published').length, drafts: posts.filter((post) => post.status === 'draft').length }), [posts]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setMedia([]);
    setPendingFiles([]);
    setExternalUrl('');
    setExternalCaption('');
    setEditorOpen(true);
  };

  const openEdit = async (post: BlogPostRow) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      cover_image: post.cover_image || '',
      author_name: post.author_name || 'Reel2Reach Media',
      category: post.category || 'Creative',
      featured: Boolean(post.featured),
      status: post.status,
      seo_title: post.seo_title || '',
      seo_description: post.seo_description || '',
    });
    setPendingFiles([]);
    setExternalUrl('');
    setExternalCaption('');
    setEditorOpen(true);
    await loadMedia(post.id);
  };

  const uploadCover = async (file?: File) => {
    if (!file) return;
    setCoverUploading(true); setError('');
    try {
      if (!file.type.startsWith('image/')) throw new Error('Blog cover must be an image.');
      const uploaded = await uploadAdminMedia(file, 'blog/covers');
      setForm((current) => ({ ...current, cover_image: uploaded.url }));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Cover upload failed.');
    } finally { setCoverUploading(false); }
  };

  const savePost = async () => {
    if (!form.title.trim()) { setError('Blog title is required.'); return; }
    const slug = slugify(form.slug || form.title);
    if (!slug) { setError('A valid slug is required.'); return; }
    setSaving(true); setError('');
    try {
      const now = new Date().toISOString();
      const existing = editingId ? posts.find((post) => post.id === editingId) : null;
      const payload = {
        title: form.title.trim(),
        slug,
        excerpt: form.excerpt.trim(),
        content: form.content,
        cover_image: form.cover_image || null,
        author_name: form.author_name.trim() || 'Reel2Reach Media',
        category: form.category.trim() || 'Creative',
        featured: form.featured,
        status: form.status,
        published_at: form.status === 'published' ? (existing?.published_at || now) : existing?.published_at || null,
        seo_title: form.seo_title.trim(),
        seo_description: form.seo_description.trim(),
        updated_at: now,
      };

      let postId = editingId;
      if (editingId) {
        const { error: updateError } = await supabase.from('blog_posts').update(payload).eq('id', editingId);
        if (updateError) throw updateError;
      } else {
        const { data, error: insertError } = await supabase.from('blog_posts').insert(payload).select('id').single();
        if (insertError) throw insertError;
        postId = data.id as string;
        setEditingId(postId);
      }

      if (!postId) throw new Error('Could not resolve blog post ID.');
      if (pendingFiles.length > 0) {
        setMediaUploading(true);
        let nextOrder = media.length;
        for (const file of pendingFiles) {
          const uploaded = await uploadAdminMedia(file, `blog/${postId}`);
          const { error: mediaInsertError } = await supabase.from('blog_media').insert({
            post_id: postId,
            media_type: uploaded.type,
            url: uploaded.url,
            storage_path: uploaded.path,
            caption: '',
            alt_text: form.title,
            sort_order: nextOrder++,
          });
          if (mediaInsertError) throw mediaInsertError;
        }
        setPendingFiles([]);
        await loadMedia(postId);
      }

      await loadPosts();
      if (!editingId) setEditorOpen(false);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save blog post.');
    } finally {
      setSaving(false);
      setMediaUploading(false);
    }
  };

  const addExternalMedia = async () => {
    if (!editingId) { setError('Save the blog post first, then add external media.'); return; }
    if (!/^https?:\/\//i.test(externalUrl.trim())) { setError('Enter a valid http(s) media URL.'); return; }
    const { error: insertError } = await supabase.from('blog_media').insert({
      post_id: editingId,
      media_type: externalType,
      url: externalUrl.trim(),
      storage_path: null,
      caption: externalCaption.trim(),
      alt_text: form.title,
      sort_order: media.length,
    });
    if (insertError) setError(insertError.message);
    else {
      setExternalUrl(''); setExternalCaption('');
      await loadMedia(editingId);
    }
  };

  const updateMediaMeta = async (item: BlogMediaRow) => {
    const { error: updateError } = await supabase.from('blog_media').update({ caption: item.caption, alt_text: item.alt_text, sort_order: item.sort_order }).eq('id', item.id);
    if (updateError) setError(updateError.message);
  };

  const removeMedia = async (item: BlogMediaRow) => {
    if (!window.confirm('Remove this photo/video from the blog?')) return;
    try {
      const { error: rowError } = await supabase.from('blog_media').delete().eq('id', item.id);
      if (rowError) throw rowError;
      await deleteAdminMedia(item.storage_path);
      if (editingId) await loadMedia(editingId);
    } catch (deleteError) { setError(deleteError instanceof Error ? deleteError.message : 'Could not remove media.'); }
  };

  const moveMedia = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= media.length) return;
    const copy = [...media];
    const current = copy[index];
    const target = copy[targetIndex];
    copy[index] = { ...target, sort_order: index };
    copy[targetIndex] = { ...current, sort_order: targetIndex };
    setMedia(copy);
    await Promise.all([
      supabase.from('blog_media').update({ sort_order: targetIndex }).eq('id', current.id),
      supabase.from('blog_media').update({ sort_order: index }).eq('id', target.id),
    ]);
  };

  const deletePost = async (post: BlogPostRow) => {
    if (!window.confirm(`Delete “${post.title}” and its media records?`)) return;
    setError('');
    try {
      const { data: postMedia } = await supabase.from('blog_media').select('storage_path').eq('post_id', post.id);
      const { error: deleteError } = await supabase.from('blog_posts').delete().eq('id', post.id);
      if (deleteError) throw deleteError;
      for (const item of postMedia || []) await deleteAdminMedia(item.storage_path as string | null);
      await loadPosts();
    } catch (deleteError) { setError(deleteError instanceof Error ? deleteError.message : 'Could not delete post.'); }
  };

  return (
    <section>
      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#FF6AA7]">Content CMS</p>
          <h2 className="mt-2 text-2xl font-bold">Blog / Journal</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#A9ACB8]">Create blog stories with text, one cover image, unlimited photos and multiple video uploads. Save drafts and publish when ready.</p>
          <div className="mt-4 flex gap-2 text-xs"><span className="rounded-full border border-white/8 bg-white/[0.025] px-3 py-1.5 text-white/55">{counts.published} published</span><span className="rounded-full border border-white/8 bg-white/[0.025] px-3 py-1.5 text-white/55">{counts.drafts} drafts</span></div>
        </div>
        <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-5 py-2.5 text-sm font-semibold"><Plus size={16} /> New Blog Post</button>
      </div>

      {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

      {loading ? <div className="flex min-h-[300px] items-center justify-center"><Loader2 className="animate-spin text-white/30" /></div> : posts.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-white/10 bg-white/[0.015] py-20 text-center"><FileText size={36} className="mx-auto text-white/20" /><h3 className="mt-4 font-semibold">No blog posts yet</h3><p className="mt-2 text-sm text-white/40">Create the first article from the admin panel.</p></div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#0B0E16] p-4 md:flex-row md:items-center">
              <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] md:w-36">{post.cover_image ? <img src={post.cover_image} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><ImageIcon size={22} className="text-white/20" /></div>}</div>
              <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.12em] ${post.status === 'published' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-200'}`}>{post.status}</span>{post.featured && <span className="rounded-full bg-[#FF3D8D]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#FF7AB5]">Featured</span>}<span className="text-[10px] text-white/25">{post.category}</span></div><h3 className="mt-2 truncate text-lg font-bold">{post.title}</h3><p className="mt-1 truncate text-xs text-white/35">/blog/{post.slug}</p></div>
              <div className="flex shrink-0 flex-wrap gap-2">{post.status === 'published' && <Link to={`/blog/${post.slug}`} target="_blank" className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60">Preview <ExternalLink size={12} /></Link>}<button onClick={() => openEdit(post)} className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs"><Pencil size={13} /> Edit</button><button onClick={() => deletePost(post)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/15 text-red-300"><Trash2 size={13} /></button></div>
            </div>
          ))}
        </div>
      )}

      {editorOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 backdrop-blur-lg lg:items-center lg:p-5">
          <div className="max-h-[96vh] w-full max-w-6xl overflow-y-auto rounded-t-[30px] border border-white/10 bg-[#080B12] shadow-2xl lg:rounded-[30px]">
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/[0.06] bg-[#080B12]/95 px-5 py-4 backdrop-blur-xl sm:px-7">
              <div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#FF6AA7]">{editingId ? 'Edit story' : 'New story'}</p><h3 className="mt-1 font-bold">{form.title || 'Untitled blog post'}</h3></div>
              <div className="flex items-center gap-2"><button onClick={savePost} disabled={saving || mediaUploading} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-4 py-2 text-xs font-semibold disabled:opacity-50">{saving || mediaUploading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save</button><button onClick={() => setEditorOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60"><X size={17} /></button></div>
            </div>

            <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.05fr_.95fr]">
              <div className="space-y-5">
                <div><label className="mb-2 block text-xs font-semibold">Title *</label><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value, slug: form.slug || slugify(event.target.value) })} className="creative-input" placeholder="A story worth stopping for" /></div>
                <div className="grid gap-4 sm:grid-cols-2"><div><label className="mb-2 block text-xs font-semibold">Slug</label><input value={form.slug} onChange={(event) => setForm({ ...form, slug: slugify(event.target.value) })} className="creative-input" /></div><div><label className="mb-2 block text-xs font-semibold">Category</label><input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="creative-input" placeholder="Creative / BTS / Strategy" /></div></div>
                <div><label className="mb-2 block text-xs font-semibold">Excerpt</label><textarea value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} rows={3} className="creative-input resize-y" placeholder="Short introduction used on blog cards." /></div>
                <div><label className="mb-2 block text-xs font-semibold">Main article content</label><textarea value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} rows={16} className="creative-input resize-y font-[inherit] leading-7" placeholder={'Write the story here.\n\nUse a blank line between paragraphs.'} /></div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4"><div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold">Cover image</p><p className="mt-1 text-xs text-white/35">Shown on the blog listing and at the top of the article.</p></div><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-white/65">{coverUploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />} Upload<input type="file" accept="image/*" className="hidden" disabled={coverUploading} onChange={(event) => uploadCover(event.target.files?.[0])} /></label></div><input value={form.cover_image} onChange={(event) => setForm({ ...form, cover_image: event.target.value })} className="creative-input mt-3" placeholder="Or paste image URL" />{form.cover_image && <img src={form.cover_image} alt="Cover preview" className="mt-3 max-h-64 w-full rounded-xl object-cover" />}</div>

                <div className="grid gap-4 sm:grid-cols-2"><div><label className="mb-2 block text-xs font-semibold">Author</label><input value={form.author_name} onChange={(event) => setForm({ ...form, author_name: event.target.value })} className="creative-input" /></div><div><label className="mb-2 block text-xs font-semibold">Status</label><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as 'draft' | 'published' })} className="creative-input"><option value="draft">Draft</option><option value="published">Published</option></select></div></div>
                <label className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-sm text-white/65"><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} className="h-4 w-4 accent-[#FF3D8D]" /> Feature this article on the Blog page</label>
                <div className="grid gap-4 sm:grid-cols-2"><div><label className="mb-2 block text-xs font-semibold">SEO title</label><input value={form.seo_title} onChange={(event) => setForm({ ...form, seo_title: event.target.value })} className="creative-input" /></div><div><label className="mb-2 block text-xs font-semibold">SEO description</label><textarea value={form.seo_description} onChange={(event) => setForm({ ...form, seo_description: event.target.value })} rows={3} className="creative-input resize-y" /></div></div>
              </div>

              <div>
                <div className="sticky top-[82px] space-y-5">
                  <div className="rounded-[24px] border border-white/[0.07] bg-[#0B0E16] p-5"><div className="flex items-center justify-between gap-3"><div><p className="font-semibold">Photo & video gallery</p><p className="mt-1 text-xs leading-5 text-white/35">Select many files at once. Videos up to 100 MB each; images up to 12 MB.</p></div><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2 text-xs font-semibold"><Upload size={13} /> Choose files<input type="file" multiple accept="image/*,video/*" className="hidden" onChange={(event) => setPendingFiles((current) => [...current, ...Array.from(event.target.files || [])])} /></label></div>
                    {pendingFiles.length > 0 && <div className="mt-4 space-y-2"><p className="text-[10px] font-bold uppercase tracking-[.15em] text-amber-200/70">Pending uploads — save post to upload</p>{pendingFiles.map((file, index) => <div key={`${file.name}-${index}`} className="flex items-center gap-3 rounded-xl border border-white/[0.06] px-3 py-2 text-xs"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04]">{mediaTypeFromFile(file) === 'video' ? <Video size={14} /> : <ImageIcon size={14} />}</span><span className="min-w-0 flex-1 truncate text-white/55">{file.name}</span><button onClick={() => setPendingFiles((files) => files.filter((_, fileIndex) => fileIndex !== index))} className="text-white/30"><X size={13} /></button></div>)}</div>}
                  </div>

                  {editingId && <div className="rounded-[24px] border border-white/[0.07] bg-[#0B0E16] p-5"><p className="text-sm font-semibold">Add external media URL</p><div className="mt-3 grid gap-3"><select value={externalType} onChange={(event) => setExternalType(event.target.value as 'image' | 'video')} className="creative-input"><option value="image">Image</option><option value="video">Video</option></select><input value={externalUrl} onChange={(event) => setExternalUrl(event.target.value)} className="creative-input" placeholder="https://…" /><input value={externalCaption} onChange={(event) => setExternalCaption(event.target.value)} className="creative-input" placeholder="Caption (optional)" /><button onClick={addExternalMedia} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold">Add URL</button></div></div>}

                  <div className="space-y-3">
                    {media.length === 0 ? <div className="rounded-[24px] border border-dashed border-white/10 py-12 text-center text-xs text-white/30">{editingId ? 'No gallery media yet.' : 'Save the post first to build the gallery.'}</div> : media.map((item, index) => <div key={item.id} className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0B0E16]"><div className="aspect-video bg-black/35">{item.media_type === 'video' ? <video src={item.url} controls preload="metadata" className="h-full w-full object-contain" /> : <img src={item.url} alt={item.alt_text || ''} className="h-full w-full object-cover" />}</div><div className="space-y-2 p-3"><input value={item.caption || ''} onChange={(event) => setMedia((current) => current.map((mediaItem) => mediaItem.id === item.id ? { ...mediaItem, caption: event.target.value } : mediaItem))} className="creative-input !py-2 text-xs" placeholder="Caption" /><input value={item.alt_text || ''} onChange={(event) => setMedia((current) => current.map((mediaItem) => mediaItem.id === item.id ? { ...mediaItem, alt_text: event.target.value } : mediaItem))} className="creative-input !py-2 text-xs" placeholder="Alt text" /><div className="flex items-center gap-2"><button onClick={() => moveMedia(index, -1)} disabled={index === 0} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 disabled:opacity-25"><ArrowUp size={12} /></button><button onClick={() => moveMedia(index, 1)} disabled={index === media.length - 1} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/8 disabled:opacity-25"><ArrowDown size={12} /></button><button onClick={() => updateMediaMeta(item)} className="ml-auto rounded-lg border border-white/8 px-3 py-2 text-[10px] font-semibold">Save caption</button><button onClick={() => removeMedia(item)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/15 text-red-300"><Trash2 size={12} /></button></div></div></div>)}
                  </div>
                </div>
              </div>
            </div>

            {error && <div className="mx-5 mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 sm:mx-7">{error}</div>}
          </div>
        </div>
      )}
    </section>
  );
}
