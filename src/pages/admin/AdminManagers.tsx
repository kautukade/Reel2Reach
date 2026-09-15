import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, Copy, ExternalLink, Image as ImageIcon, Loader2, Pencil, Plus, Save, Search, Trash2, Upload, X } from 'lucide-react';
import { deleteAdminMedia, MEDIA_BUCKET, slugify, uploadAdminMedia } from '../../lib/adminMedia';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'select' | 'array' | 'media' | 'date';
type Field = { key: string; label: string; type?: FieldType; required?: boolean; placeholder?: string; options?: string[]; folder?: string };
type CrudProps = { title: string; description: string; table: string; fields: Field[]; orderBy?: string; autoSlugFrom?: string };

const inputClass = 'creative-input';

function blank(fields: Field[]) {
  const result: Record<string, any> = {};
  fields.forEach((field) => { result[field.key] = field.type === 'checkbox' ? false : ''; });
  return result;
}

function rowToForm(fields: Field[], row: Record<string, any>) {
  const result: Record<string, any> = {};
  fields.forEach((field) => { const value = row[field.key]; result[field.key] = field.type === 'array' && Array.isArray(value) ? value.join('\n') : (value ?? (field.type === 'checkbox' ? false : '')); });
  return result;
}

function toPayload(fields: Field[], form: Record<string, any>) {
  const payload: Record<string, any> = {};
  fields.forEach((field) => {
    const value = form[field.key];
    if (field.type === 'number') payload[field.key] = value === '' ? null : Number(value);
    else if (field.type === 'checkbox') payload[field.key] = Boolean(value);
    else if (field.type === 'array') payload[field.key] = String(value || '').split('\n').map((item) => item.trim()).filter(Boolean);
    else payload[field.key] = value ?? '';
  });
  payload.updated_at = new Date().toISOString();
  return payload;
}

export function CrudManager({ title, description, table, fields, orderBy = 'created_at', autoSlugFrom }: CrudProps) {
  const [rows, setRows] = useState<Record<string, any>[]>([]);
  const [form, setForm] = useState<Record<string, any>>(() => blank(fields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    if (!isSupabaseConfigured()) { setError('Supabase is not configured.'); setLoading(false); return; }
    const { data, error: loadError } = await supabase.from(table).select('*').order(orderBy, { ascending: false });
    if (loadError) setError(loadError.message);
    setRows(data || []); setLoading(false);
  }, [orderBy, table]);

  useEffect(() => { load(); }, [load]);

  const edit = (row?: Record<string, any>) => {
    setEditingId(row?.id || null);
    setForm(row ? rowToForm(fields, row) : blank(fields));
    setOpen(true); setError('');
  };

  const save = async () => {
    for (const field of fields) if (field.required && !String(form[field.key] ?? '').trim()) { setError(`${field.label} is required.`); return; }
    setSaving(true); setError('');
    try {
      const payload = toPayload(fields, form);
      if (autoSlugFrom && 'slug' in payload && !String(payload.slug || '').trim()) payload.slug = slugify(String(payload[autoSlugFrom] || ''));
      const response = editingId ? await supabase.from(table).update(payload).eq('id', editingId) : await supabase.from(table).insert(payload);
      if (response.error) throw response.error;
      setOpen(false); await load();
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : 'Could not save.'); }
    finally { setSaving(false); }
  };

  const remove = async (row: Record<string, any>) => {
    if (!window.confirm(`Delete this ${title.toLowerCase()} item?`)) return;
    const { error: deleteError } = await supabase.from(table).delete().eq('id', row.id);
    if (deleteError) setError(deleteError.message); else await load();
  };

  const upload = async (field: Field, file?: File) => {
    if (!file) return;
    setUploading(field.key); setError('');
    try { const result = await uploadAdminMedia(file, field.folder || table); setForm((current) => ({ ...current, [field.key]: result.url })); }
    catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.'); }
    finally { setUploading(''); }
  };

  const summary = fields.filter((field) => !['textarea', 'array', 'media'].includes(field.type || 'text')).slice(0, 4);
  const mediaField = fields.find((field) => field.type === 'media');

  return <section>
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold">{title}</h2><p className="mt-1 max-w-2xl text-sm text-[#A9ACB8]">{description}</p></div><button onClick={() => edit()} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-5 py-2.5 text-sm font-semibold"><Plus size={16}/> Add New</button></div>
    {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
    {loading ? <div className="flex py-20 justify-center"><Loader2 className="animate-spin text-white/30"/></div> : rows.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-sm text-white/35">No items yet.</div> : <div className="grid gap-3">{rows.map((row) => <div key={row.id} className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#0B0E16] p-4 sm:flex-row sm:items-center">{mediaField && <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-white/[0.03]">{row[mediaField.key] ? <img src={String(row[mediaField.key])} alt="" className="h-full w-full object-cover"/> : <div className="flex h-full items-center justify-center"><ImageIcon size={18} className="text-white/20"/></div>}</div>}<div className="min-w-0 flex-1 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{summary.map((field) => <div key={field.key} className="min-w-0"><p className="text-[9px] uppercase tracking-[.14em] text-white/25">{field.label}</p><p className="mt-1 truncate text-sm text-white/70">{row[field.key] === null || row[field.key] === '' || row[field.key] === undefined ? '—' : typeof row[field.key] === 'boolean' ? (row[field.key] ? 'Yes' : 'No') : String(row[field.key])}</p></div>)}</div><div className="flex gap-2"><button onClick={() => edit(row)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60"><Pencil size={14}/></button><button onClick={() => remove(row)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/15 text-red-300"><Trash2 size={14}/></button></div></div>)}</div>}

    {open && <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/70 backdrop-blur-md sm:items-center sm:p-5"><div className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border border-white/10 bg-[#0B0E16] p-5 sm:rounded-[28px] sm:p-7"><div className="mb-6 flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[.18em] text-[#FF6AA7]">{editingId ? 'Edit' : 'Create'}</p><h3 className="mt-1 text-xl font-bold">{title}</h3></div><button onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10"><X size={16}/></button></div><div className="grid gap-5 sm:grid-cols-2">{fields.map((field) => { const value = form[field.key]; const wide = ['textarea','array','media'].includes(field.type || 'text'); return <div key={field.key} className={wide ? 'sm:col-span-2' : ''}><label className="mb-2 block text-xs font-semibold text-white/65">{field.label}{field.required ? ' *' : ''}</label>{field.type === 'checkbox' ? <label className="flex items-center gap-3 rounded-xl border border-white/8 px-4 py-3 text-sm text-white/60"><input type="checkbox" checked={Boolean(value)} onChange={(event) => setForm({ ...form, [field.key]: event.target.checked })} className="accent-[#FF3D8D]"/> Enabled</label> : field.type === 'select' ? <select value={String(value ?? '')} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} className={inputClass}><option value="">Select…</option>{(field.options || []).map((option) => <option key={option} value={option}>{option}</option>)}</select> : field.type === 'textarea' || field.type === 'array' ? <textarea rows={field.type === 'array' ? 6 : 5} value={String(value ?? '')} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} placeholder={field.placeholder} className={`${inputClass} resize-y`}/> : field.type === 'media' ? <div className="space-y-3"><input value={String(value ?? '')} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} placeholder="Media URL" className={inputClass}/><label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white/65">{uploading === field.key ? <Loader2 size={13} className="animate-spin"/> : <Upload size={13}/>} Upload<input type="file" accept="image/*,video/*" className="hidden" onChange={(event) => upload(field, event.target.files?.[0])}/></label>{Boolean(value) && <a href={String(value)} target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center gap-1 text-xs text-[#FF7AB5]">Open <ExternalLink size={11}/></a>}</div> : <input type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'} value={String(value ?? '')} onChange={(event) => setForm({ ...form, [field.key]: event.target.value })} placeholder={field.placeholder} className={inputClass}/>}</div>; })}</div>{error && <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}<div className="mt-7 flex justify-end gap-3"><button onClick={() => setOpen(false)} className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/55">Cancel</button><button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-6 py-2.5 text-sm font-semibold disabled:opacity-50">{saving ? <Loader2 size={14} className="animate-spin"/> : <Save size={14}/>} Save</button></div></div></div>}
  </section>;
}

type Lead = { id: string; name: string; business_name: string; phone: string; email: string; service: string; status: string; notes: string; message: string; category: string; budget: string; preferred_date: string; location: string; instagram: string; created_at: string };
export function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]); const [query, setQuery] = useState(''); const [selected, setSelected] = useState<Lead | null>(null); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const load = useCallback(async () => { setLoading(true); if (!isSupabaseConfigured()) { setLoading(false); return; } const { data, error: e } = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(250); if (e) setError(e.message); setLeads((data || []) as Lead[]); setLoading(false); }, []);
  useEffect(() => { load(); }, [load]);
  const filtered = useMemo(() => { const q = query.toLowerCase().trim(); return q ? leads.filter((lead) => [lead.name,lead.business_name,lead.phone,lead.email,lead.service,lead.status].some((v) => String(v || '').toLowerCase().includes(q))) : leads; }, [leads, query]);
  const saveLead = async () => { if (!selected) return; const { error: e } = await supabase.from('leads').update({ status: selected.status, notes: selected.notes, updated_at: new Date().toISOString() }).eq('id', selected.id); if (e) setError(e.message); else { setSelected(null); await load(); } };
  const remove = async (lead: Lead) => { if (!window.confirm(`Delete lead from ${lead.name}?`)) return; const { error: e } = await supabase.from('leads').delete().eq('id', lead.id); if (e) setError(e.message); else await load(); };
  return <section><div className="mb-6"><h2 className="text-2xl font-bold">Leads</h2><p className="mt-1 text-sm text-[#A9ACB8]">Search enquiries, update status, save internal notes and contact leads.</p></div><div className="mb-5 flex items-center gap-3 rounded-xl border border-white/8 px-4 py-3"><Search size={15} className="text-white/30"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search leads…" className="w-full bg-transparent text-sm outline-none"/></div>{error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}{loading ? <div className="flex py-20 justify-center"><Loader2 className="animate-spin text-white/30"/></div> : <div className="overflow-x-auto rounded-2xl border border-white/[0.06]"><table className="min-w-[780px] w-full text-sm"><thead className="bg-white/[0.025] text-left text-[10px] uppercase tracking-[.14em] text-white/30"><tr><th className="p-4">Lead</th><th className="p-4">Phone</th><th className="p-4">Service</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th></tr></thead><tbody>{filtered.map((lead) => <tr key={lead.id} className="border-t border-white/[0.05]"><td className="p-4"><p className="font-medium">{lead.name}</p><p className="text-xs text-white/30">{lead.business_name || lead.email}</p></td><td className="p-4"><a className="text-[#FF7AB5]" href={`tel:${lead.phone}`}>{lead.phone}</a></td><td className="p-4 text-white/50">{lead.service || '—'}</td><td className="p-4 text-white/50">{lead.status || 'New'}</td><td className="p-4"><div className="flex justify-end gap-2"><a href={`https://wa.me/${lead.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="rounded-lg border border-[#25D366]/20 px-3 py-2 text-xs text-[#8BF0A9]">WhatsApp</a><button onClick={() => setSelected(lead)} className="rounded-lg border border-white/10 px-3 py-2 text-xs">Manage</button><button onClick={() => remove(lead)} className="rounded-lg border border-red-500/15 px-3 py-2 text-red-300"><Trash2 size={12}/></button></div></td></tr>)}</tbody></table></div>}{selected && <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/70 backdrop-blur-md sm:items-center sm:p-5"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] border border-white/10 bg-[#0B0E16] p-6 sm:rounded-[28px]"><div className="flex justify-between"><div><p className="text-[10px] uppercase tracking-[.18em] text-[#FF6AA7]">Lead detail</p><h3 className="mt-1 text-xl font-bold">{selected.name}</h3></div><button onClick={() => setSelected(null)}><X size={17}/></button></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{[['Business',selected.business_name],['Email',selected.email],['Phone',selected.phone],['Instagram',selected.instagram],['Category',selected.category],['Budget',selected.budget],['Location',selected.location],['Preferred date',selected.preferred_date]].map(([label,value]) => <div key={label} className="rounded-xl border border-white/7 p-3"><p className="text-[9px] uppercase tracking-[.14em] text-white/25">{label}</p><p className="mt-1 text-sm text-white/65">{value || '—'}</p></div>)}</div>{selected.message && <div className="mt-3 rounded-xl border border-white/7 p-4 text-sm text-white/60">{selected.message}</div>}<div className="mt-4 grid gap-4 sm:grid-cols-2"><div><label className="mb-2 block text-xs">Status</label><select value={selected.status || 'New'} onChange={(e) => setSelected({ ...selected, status: e.target.value })} className={inputClass}>{['New','Contacted','Qualified','Proposal Sent','Won','Lost'].map((s) => <option key={s}>{s}</option>)}</select></div><div><label className="mb-2 block text-xs">Internal notes</label><textarea value={selected.notes || ''} onChange={(e) => setSelected({ ...selected, notes: e.target.value })} rows={4} className={`${inputClass} resize-y`}/></div></div><div className="mt-6 flex justify-end gap-3"><button onClick={() => setSelected(null)} className="rounded-full border border-white/10 px-5 py-2.5 text-sm">Cancel</button><button onClick={saveLead} className="rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-5 py-2.5 text-sm font-semibold">Save changes</button></div></div></div>}</section>;
}

export function MediaLibraryManager() {
  const [items, setItems] = useState<{name:string;path:string;url:string}[]>([]); const [loading,setLoading]=useState(true); const [uploading,setUploading]=useState(false); const [error,setError]=useState(''); const [copied,setCopied]=useState('');
  const load = useCallback(async () => { setLoading(true); const { data, error: e } = await supabase.storage.from(MEDIA_BUCKET).list('library', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } }); if (e) setError(e.message); setItems((data || []).filter((item) => item.name !== '.emptyFolderPlaceholder').map((item) => { const path=`library/${item.name}`; return {name:item.name,path,url:supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl}; })); setLoading(false); }, []);
  useEffect(() => { if (isSupabaseConfigured()) load(); else setLoading(false); }, [load]);
  const uploadFiles = async (files?: FileList | null) => { if (!files?.length) return; setUploading(true); try { for (const file of Array.from(files)) await uploadAdminMedia(file,'library'); await load(); } catch(e){ setError(e instanceof Error ? e.message : 'Upload failed.'); } finally { setUploading(false); } };
  const remove = async (path:string) => { if (!window.confirm('Delete this media file?')) return; try { await deleteAdminMedia(path); await load(); } catch(e){ setError(e instanceof Error ? e.message : 'Delete failed.'); } };
  return <section><div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold">Media Library</h2><p className="mt-1 text-sm text-[#A9ACB8]">Upload reusable images and videos.</p></div><label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-5 py-2.5 text-sm font-semibold">{uploading ? <Loader2 size={14} className="animate-spin"/> : <Upload size={14}/>} Upload<input type="file" multiple accept="image/*,video/*" className="hidden" onChange={(e)=>uploadFiles(e.target.files)}/></label></div>{error && <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}{loading ? <div className="flex py-20 justify-center"><Loader2 className="animate-spin text-white/30"/></div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((item) => <div key={item.path} className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0B0E16]"><div className="aspect-video bg-black/30"><img src={item.url} alt="" className="h-full w-full object-cover"/></div><div className="p-3"><p className="truncate text-xs text-white/45">{item.name}</p><div className="mt-3 flex gap-2"><button onClick={async()=>{await navigator.clipboard.writeText(item.url);setCopied(item.path);setTimeout(()=>setCopied(''),1000);}} className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-white/8 py-2 text-xs text-white/60">{copied===item.path?<Check size={12}/>:<Copy size={12}/>} Copy URL</button><button onClick={()=>remove(item.path)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/15 text-red-300"><Trash2 size={12}/></button></div></div></div>)}</div>}</section>;
}

export const PortfolioManager = () => <CrudManager title="Portfolio" description="Manage real portfolio projects, thumbnails and reel/video URLs." table="portfolio_items" orderBy="sort_order" autoSlugFrom="title" fields={[{key:'title',label:'Title',required:true},{key:'brand',label:'Brand'},{key:'slug',label:'Slug'},{key:'description',label:'Description',type:'textarea'},{key:'category',label:'Category'},{key:'thumbnail_url',label:'Thumbnail',type:'media',folder:'portfolio'},{key:'video_url',label:'Video',type:'media',folder:'portfolio'},{key:'instagram_url',label:'Instagram URL'},{key:'campaign_type',label:'Campaign type'},{key:'publish_date',label:'Publish date',type:'date'},{key:'featured',label:'Featured',type:'checkbox'},{key:'status',label:'Status',type:'select',options:['draft','published']},{key:'sort_order',label:'Sort order',type:'number'}]} />;
export const CategoriesManager = () => <CrudManager title="Portfolio Categories" description="Manage portfolio filters." table="portfolio_categories" orderBy="sort_order" autoSlugFrom="name" fields={[{key:'name',label:'Name',required:true},{key:'slug',label:'Slug'},{key:'status',label:'Status',type:'select',options:['draft','published']},{key:'sort_order',label:'Sort order',type:'number'}]} />;
export const ServicesManager = () => <CrudManager title="Services" description="Manage service content." table="services" orderBy="sort_order" fields={[{key:'title',label:'Title',required:true},{key:'description',label:'Description',type:'textarea'},{key:'category',label:'Category'},{key:'icon',label:'Icon key'},{key:'status',label:'Status',type:'select',options:['draft','published']},{key:'sort_order',label:'Sort order',type:'number'}]} />;
export const PackagesManager = () => <CrudManager title="Packages" description="Manage pricing, features and package CTAs." table="packages" orderBy="sort_order" fields={[{key:'name',label:'Name',required:true},{key:'price',label:'Price',type:'number'},{key:'price_suffix',label:'Price suffix'},{key:'description',label:'Description',type:'textarea'},{key:'features',label:'Features (one per line)',type:'array'},{key:'cta_text',label:'CTA text'},{key:'cta_url',label:'CTA URL'},{key:'recommended',label:'Recommended',type:'checkbox'},{key:'status',label:'Status',type:'select',options:['draft','published']},{key:'sort_order',label:'Sort order',type:'number'}]} />;
export const AddonsManager = () => <CrudManager title="Add-ons" description="Manage optional package add-ons." table="addons" orderBy="sort_order" fields={[{key:'name',label:'Name',required:true},{key:'description',label:'Description',type:'textarea'},{key:'price',label:'Price label'},{key:'icon',label:'Icon key'},{key:'status',label:'Status',type:'select',options:['draft','published']},{key:'sort_order',label:'Sort order',type:'number'}]} />;
export const TestimonialsManager = () => <CrudManager title="Testimonials" description="Publish only real client testimonials." table="testimonials" fields={[{key:'client_name',label:'Client name',required:true},{key:'company',label:'Company'},{key:'photo_url',label:'Photo',type:'media',folder:'testimonials'},{key:'testimonial',label:'Testimonial',type:'textarea',required:true},{key:'rating',label:'Rating',type:'number'},{key:'instagram_url',label:'Instagram URL'},{key:'status',label:'Status',type:'select',options:['draft','published']}]} />;
export const CaseStudiesManager = () => <CrudManager title="Case Studies" description="Manage case studies without unverified claims." table="case_studies" fields={[{key:'brand_name',label:'Brand name',required:true},{key:'industry',label:'Industry'},{key:'cover_image',label:'Cover image',type:'media',folder:'case-studies'},{key:'challenge',label:'Challenge',type:'textarea'},{key:'approach',label:'Approach',type:'textarea'},{key:'content_produced',label:'Content produced',type:'textarea'},{key:'results',label:'Results',type:'textarea'},{key:'client_quote',label:'Client quote',type:'textarea'},{key:'status',label:'Status',type:'select',options:['draft','published']}]} />;
export const HomepageManager = () => <CrudManager title="Homepage CMS" description="Manage reusable homepage section copy and media." table="homepage" orderBy="sort_order" fields={[{key:'section_key',label:'Section key',required:true},{key:'heading',label:'Heading'},{key:'subheading',label:'Subheading',type:'textarea'},{key:'cta_text',label:'CTA text'},{key:'cta_url',label:'CTA URL'},{key:'media_url',label:'Media',type:'media',folder:'homepage'},{key:'visible',label:'Visible',type:'checkbox'},{key:'sort_order',label:'Sort order',type:'number'}]} />;
export const MetricsManager = () => <CrudManager title="Metrics" description="Manage verified metrics only." table="metrics" orderBy="sort_order" fields={[{key:'label',label:'Label',required:true},{key:'value',label:'Value',required:true},{key:'icon',label:'Icon key'},{key:'status',label:'Status',type:'select',options:['draft','published']},{key:'sort_order',label:'Sort order',type:'number'}]} />;
export const SocialLinksManager = () => <CrudManager title="Social Links" description="Manage public social links." table="social_links" orderBy="sort_order" fields={[{key:'platform',label:'Platform',required:true},{key:'url',label:'URL',required:true},{key:'label',label:'Label'},{key:'sort_order',label:'Sort order',type:'number'}]} />;
export const SeoManager = () => <CrudManager title="SEO" description="Manage route metadata and social sharing images." table="seo_pages" orderBy="route" fields={[{key:'route',label:'Route',required:true},{key:'title',label:'SEO title'},{key:'description',label:'Description',type:'textarea'},{key:'og_title',label:'OG title'},{key:'og_description',label:'OG description',type:'textarea'},{key:'og_image',label:'OG image',type:'media',folder:'seo'}]} />;
export const SettingsManager = () => <CrudManager title="Site Settings" description="Manage phone, email, Instagram, WhatsApp and other central values." table="site_settings" orderBy="key" fields={[{key:'key',label:'Setting key',required:true},{key:'value',label:'Value',type:'textarea'}]} />;
