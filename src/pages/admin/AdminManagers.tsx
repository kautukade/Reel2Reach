import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  Loader2,
  MessageSquare,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { deleteAdminMedia, MEDIA_BUCKET, slugify, uploadAdminMedia } from '../../lib/adminMedia';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'select' | 'array' | 'media' | 'date';

type FieldConfig = {
  key: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  folder?: string;
};

type Row = Record<string, unknown> & { id: string };

type CrudManagerProps = {
  title: string;
  description: string;
  table: string;
  fields: FieldConfig[];
  orderBy?: string;
  autoSlugFrom?: string;
};

function displayValue(value: unknown) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (value === null || value === undefined || value === '') return '—';
  return String(value);
}

function blankForm(fields: FieldConfig[]) {
  const next: Record<string, unknown> = {};
  for (const field of fields) {
    if (field.type === 'checkbox') next[field.key] = false;
    else if (field.type === 'array') next[field.key] = '';
    else next[field.key] = '';
  }
  return next;
}

function formFromRow(fields: FieldConfig[], row: Row) {
  const next: Record<string, unknown> = {};
  for (const field of fields) {
    const value = row[field.key];
    next[field.key] = field.type === 'array' && Array.isArray(value) ? value.join('\n') : (value ?? (field.type === 'checkbox' ? false : ''));
  }
  return next;
}

function normalizePayload(fields: FieldConfig[], form: Record<string, unknown>) {
  const payload: Record<string, unknown> = {};
  for (const field of fields) {
    const value = form[field.key];
    if (field.type === 'number') payload[field.key] = value === '' || value === null || value === undefined ? null : Number(value);
    else if (field.type === 'checkbox') payload[field.key] = Boolean(value);
    else if (field.type === 'array') payload[field.key] = String(value || '').split('\n').map((item) => item.trim()).filter(Boolean);
    else payload[field.key] = value === undefined ? '' : value;
  }
  return payload;
}

export function CrudManager({ title, description, table, fields, orderBy = 'created_at', autoSlugFrom }: CrudManagerProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(() => blankForm(fields));
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    if (!isSupabaseConfigured()) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }
    const { data, error: loadError } = await supabase.from(table).select('*').order(orderBy, { ascending: false });
    if (loadError) setError(loadError.message);
    setRows((data || []) as Row[]);
    setLoading(false);
  }, [orderBy, table]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditingId(null);
    setForm(blankForm(fields));
    setEditorOpen(true);
  };

  const openEdit = (row: Row) => {
    setEditingId(row.id);
    setForm(formFromRow(fields, row));
    setEditorOpen(true);
  };

  const setValue = (key: string, value: unknown) => setForm((current) => ({ ...current, [key]: value }));

  const handleUpload = async (field: FieldConfig, file?: File) => {
    if (!file) return;
    setError('');
    setUploadingField(field.key);
    try {
      const uploaded = await uploadAdminMedia(file, field.folder || `${table}`);
      setValue(field.key, uploaded.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.');
    } finally {
      setUploadingField(null);
    }
  };

  const save = async () => {
    setError('');
    for (const field of fields) {
      if (field.required && !String(form[field.key] ?? '').trim()) {
        setError(`${field.label} is required.`);
        return;
      }
    }
    setSaving(true);
    try {
      const payload = normalizePayload(fields, form);
      if (autoSlugFrom && 'slug' in payload && !String(payload.slug || '').trim()) {
        payload.slug = slugify(String(payload[autoSlugFrom] || ''));
      }
      payload.updated_at = new Date().toISOString();
      if (editingId) {
        const { error: saveError } = await supabase.from(table).update(payload).eq('id', editingId);
        if (saveError) throw saveError;
      } else {
        const { error: saveError } = await supabase.from(table).insert(payload);
        if (saveError) throw saveError;
      }
      setEditorOpen(false);
      await load();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save item.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (row: Row) => {
    if (!window.confirm(`Delete this ${title.toLowerCase()} item?`)) return;
    setError('');
    const { error: deleteError } = await supabase.from(table).delete().eq('id', row.id);
    if (deleteError) setError(deleteError.message);
    else await load();
  };

  const summaryFields = fields.filter((field) => !['textarea', 'array', 'media'].includes(field.type || 'text')).slice(0, 4);
  const firstMedia = fields.find((field) => field.type === 'media');

  return (
    <section>
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-[#A9ACB8]">{description}</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-5 py-2.5 text-sm font-semibold text-white">
          <Plus size={16} /> Add New
        </button>
      </div>

      {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

      {loading ? (
        <div className="flex min-h-[260px] items-center justify-center"><Loader2 className="animate-spin text-white/30" /></div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.015] py-16 text-center text-sm text-[#A9ACB8]">No items yet. Click “Add New” to create one.</div>
      ) : (
        <div className="grid gap-4">
          {rows.map((row) => (
            <div key={row.id} className="flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-[#0B0E16] p-4 sm:flex-row sm:items-center">
              {firstMedia && (
                <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.025]">
                  {row[firstMedia.key] ? <img src={String(row[firstMedia.key])} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><ImageIcon size={18} className="text-white/20" /></div>}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4">
                  {summaryFields.map((field) => (
                    <div key={field.key} className="min-w-0">
                      <p className="text-[9px] font-semibold uppercase tracking-[.14em] text-white/25">{field.label}</p>
                      <p className="mt-1 truncate text-sm text-white/75">{displayValue(row[field.key])}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => openEdit(row)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:text-white" aria-label="Edit"><Pencil size={15} /></button>
                <button onClick={() => remove(row)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/15 text-red-300/70 transition hover:bg-red-500/10 hover:text-red-300" aria-label="Delete"><Trash2 size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editorOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-5">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] border border-white/10 bg-[#0B0E16] p-5 shadow-2xl sm:rounded-[28px] sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#FF6AA7]">{editingId ? 'Edit' : 'Create'}</p><h3 className="mt-1 text-xl font-bold">{title}</h3></div>
              <button onClick={() => setEditorOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60"><X size={17} /></button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((field) => {
                const value = form[field.key];
                const wide = field.type === 'textarea' || field.type === 'array' || field.type === 'media';
                return (
                  <div key={field.key} className={wide ? 'sm:col-span-2' : ''}>
                    <label className="mb-2 block text-xs font-semibold text-white/70">{field.label}{field.required ? ' *' : ''}</label>
                    {field.type === 'checkbox' ? (
                      <label className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm text-white/70">
                        <input type="checkbox" checked={Boolean(value)} onChange={(event) => setValue(field.key, event.target.checked)} className="h-4 w-4 accent-[#FF3D8D]" /> Enabled
                      </label>
                    ) : field.type === 'select' ? (
                      <select value={String(value ?? '')} onChange={(event) => setValue(field.key, event.target.value)} className="creative-input">
                        <option value="">Select…</option>
                        {(field.options || []).map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    ) : field.type === 'textarea' || field.type === 'array' ? (
                      <textarea value={String(value ?? '')} onChange={(event) => setValue(field.key, event.target.value)} rows={field.type === 'array' ? 6 : 5} placeholder={field.placeholder} className="creative-input resize-y" />
                    ) : field.type === 'media' ? (
                      <div className="space-y-3">
                        <input value={String(value ?? '')} onChange={(event) => setValue(field.key, event.target.value)} placeholder="Paste media URL or upload below" className="creative-input" />
                        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-white/70 transition hover:text-white">
                          {uploadingField === field.key ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Upload image/video
                          <input type="file" accept="image/*,video/*" className="hidden" disabled={uploadingField === field.key} onChange={(event) => handleUpload(field, event.target.files?.[0])} />
                        </label>
                        {value && <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-black/20 p-2"><a href={String(value)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-[#FF7AB5]">Open media <ExternalLink size={12} /></a></div>}
                      </div>
                    ) : (
                      <input
                        type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                        value={String(value ?? '')}
                        onChange={(event) => setValue(field.key, event.target.value)}
                        placeholder={field.placeholder}
                        className="creative-input"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {error && <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
            <div className="mt-7 flex justify-end gap-3">
              <button onClick={() => setEditorOpen(false)} className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/60">Cancel</button>
              <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

type Lead = {
  id: string;
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
  created_at: string;
};

export function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    if (!isSupabaseConfigured()) { setLoading(false); return; }
    const { data, error: loadError } = await supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(250);
    if (loadError) setError(loadError.message);
    setLeads((data || []) as Lead[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return leads;
    return leads.filter((lead) => [lead.name, lead.business_name, lead.phone, lead.email, lead.service, lead.status].some((value) => String(value || '').toLowerCase().includes(q)));
  }, [leads, query]);

  const updateSelected = async () => {
    if (!selected) return;
    const { error: updateError } = await supabase.from('leads').update({ status: selected.status, notes: selected.notes, updated_at: new Date().toISOString() }).eq('id', selected.id);
    if (updateError) setError(updateError.message);
    else { setSelected(null); await load(); }
  };

  const removeLead = async (lead: Lead) => {
    if (!window.confirm(`Delete lead from ${lead.name}?`)) return;
    const { error: deleteError } = await supabase.from('leads').delete().eq('id', lead.id);
    if (deleteError) setError(deleteError.message); else { if (selected?.id === lead.id) setSelected(null); await load(); }
  };

  return (
    <section>
      <div className="mb-6"><h2 className="text-2xl font-bold">Leads</h2><p className="mt-1 text-sm text-[#A9ACB8]">Search enquiries, update status, add internal notes and contact leads directly.</p></div>
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3"><Search size={16} className="text-white/30" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, phone, business, service…" className="w-full bg-transparent text-sm outline-none placeholder:text-white/25" /></div>
      {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
      {loading ? <div className="flex py-20 justify-center"><Loader2 className="animate-spin text-white/30" /></div> : filtered.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-sm text-white/40"><MessageSquare size={30} className="mx-auto mb-3 opacity-30" />No leads found.</div> : (
        <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
          <table className="min-w-[850px] w-full text-sm">
            <thead className="bg-white/[0.025] text-left text-[10px] uppercase tracking-[.15em] text-white/35"><tr><th className="p-4">Lead</th><th className="p-4">Contact</th><th className="p-4">Service</th><th className="p-4">Status</th><th className="p-4">Date</th><th className="p-4 text-right">Actions</th></tr></thead>
            <tbody>{filtered.map((lead) => <tr key={lead.id} className="border-t border-white/[0.05] hover:bg-white/[0.015]"><td className="p-4"><p className="font-semibold">{lead.name}</p><p className="mt-1 text-xs text-white/35">{lead.business_name || '—'}</p></td><td className="p-4"><a href={`tel:${lead.phone}`} className="text-[#FF7AB5]">{lead.phone}</a><p className="mt-1 text-xs text-white/35">{lead.email}</p></td><td className="p-4 text-white/55">{lead.service || '—'}</td><td className="p-4"><span className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-xs text-white/65">{lead.status || 'New'}</span></td><td className="p-4 text-white/35">{new Date(lead.created_at).toLocaleDateString('en-IN')}</td><td className="p-4"><div className="flex justify-end gap-2"><a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="rounded-lg border border-[#25D366]/20 px-3 py-2 text-xs text-[#8BF0A9]">WhatsApp</a><button onClick={() => setSelected(lead)} className="rounded-lg border border-white/10 px-3 py-2 text-xs">Manage</button><button onClick={() => removeLead(lead)} className="rounded-lg border border-red-500/15 px-3 py-2 text-red-300"><Trash2 size={13} /></button></div></td></tr>)}</tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-md sm:items-center sm:p-5">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] border border-white/10 bg-[#0B0E16] p-6 sm:rounded-[28px]">
            <div className="flex justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[.18em] text-[#FF6AA7]">Lead detail</p><h3 className="mt-1 text-xl font-bold">{selected.name}</h3></div><button onClick={() => setSelected(null)}><X size={18} /></button></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">{[
              ['Business', selected.business_name], ['Phone', selected.phone], ['Email', selected.email], ['Instagram', selected.instagram], ['Category', selected.category], ['Service', selected.service], ['Budget', selected.budget], ['Preferred date', selected.preferred_date], ['Location', selected.location],
            ].map(([label, value]) => <div key={label} className="rounded-xl border border-white/7 bg-white/[0.02] p-3"><p className="text-[9px] uppercase tracking-[.15em] text-white/25">{label}</p><p className="mt-1 text-sm text-white/70">{value || '—'}</p></div>)}</div>
            {selected.message && <div className="mt-4 rounded-xl border border-white/7 bg-white/[0.02] p-4"><p className="text-[9px] uppercase tracking-[.15em] text-white/25">Message</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/65">{selected.message}</p></div>}
            <div className="mt-5 grid gap-4 sm:grid-cols-2"><div><label className="mb-2 block text-xs font-semibold">Status</label><select value={selected.status || 'New'} onChange={(event) => setSelected({ ...selected, status: event.target.value })} className="creative-input">{['New','Contacted','Qualified','Proposal Sent','Won','Lost'].map((status) => <option key={status}>{status}</option>)}</select></div><div><label className="mb-2 block text-xs font-semibold">Internal notes</label><textarea value={selected.notes || ''} onChange={(event) => setSelected({ ...selected, notes: event.target.value })} rows={4} className="creative-input resize-y" /></div></div>
            <div className="mt-6 flex justify-end gap-3"><button onClick={() => setSelected(null)} className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/60">Cancel</button><button onClick={updateSelected} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-5 py-2.5 text-sm font-semibold"><Save size={14} /> Save changes</button></div>
          </div>
        </div>
      )}
    </section>
  );
}

export function MediaLibraryManager() {
  const [items, setItems] = useState<Array<{ name: string; url: string; path: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    if (!isSupabaseConfigured()) { setLoading(false); return; }
    const { data, error: listError } = await supabase.storage.from(MEDIA_BUCKET).list('library', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
    if (listError) setError(listError.message);
    const mapped = (data || []).filter((item) => item.name && item.name !== '.emptyFolderPlaceholder').map((item) => {
      const path = `library/${item.name}`;
      return { name: item.name, path, url: supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl };
    });
    setItems(mapped);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const uploadFiles = async (files?: FileList | null) => {
    if (!files?.length) return;
    setUploading(true); setError('');
    try { for (const file of Array.from(files)) await uploadAdminMedia(file, 'library'); await load(); }
    catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : 'Upload failed.'); }
    finally { setUploading(false); }
  };

  const remove = async (path: string) => {
    if (!window.confirm('Delete this media file?')) return;
    try { await deleteAdminMedia(path); await load(); } catch (deleteError) { setError(deleteError instanceof Error ? deleteError.message : 'Delete failed.'); }
  };

  return <section><div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold">Media Library</h2><p className="mt-1 text-sm text-[#A9ACB8]">Upload reusable images and videos. Blog-specific media is managed inside each blog post.</p></div><label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-5 py-2.5 text-sm font-semibold">{uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />} Upload media<input type="file" multiple accept="image/*,video/*" className="hidden" disabled={uploading} onChange={(event) => uploadFiles(event.target.files)} /></label></div>{error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}{loading ? <div className="flex py-20 justify-center"><Loader2 className="animate-spin text-white/30" /></div> : items.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-sm text-white/40">No reusable media uploaded yet.</div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((item) => <div key={item.path} className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0B0E16]"><div className="aspect-video bg-black/30"><img src={item.url} alt="" className="h-full w-full object-cover" /></div><div className="p-3"><p className="truncate text-xs text-white/55">{item.name}</p><div className="mt-3 flex gap-2"><button onClick={async () => { await navigator.clipboard.writeText(item.url); setCopied(item.path); window.setTimeout(() => setCopied(''), 1200); }} className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-white/8 py-2 text-xs text-white/60">{copied === item.path ? <Check size={13} /> : <Copy size={13} />} Copy URL</button><button onClick={() => remove(item.path)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/15 text-red-300"><Trash2 size={13} /></button></div></div></div>)}</div>}</section>;
}

export const PortfolioManager = () => <CrudManager title="Portfolio" description="Manage real portfolio projects, thumbnails, reel/video URLs and publishing status." table="portfolio_items" orderBy="sort_order" autoSlugFrom="title" fields={[
  { key: 'title', label: 'Title', required: true }, { key: 'brand', label: 'Brand' }, { key: 'slug', label: 'Slug', placeholder: 'Auto-generated when empty' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'category', label: 'Category' }, { key: 'thumbnail_url', label: 'Thumbnail / image', type: 'media', folder: 'portfolio' }, { key: 'video_url', label: 'Video URL', type: 'media', folder: 'portfolio' }, { key: 'instagram_url', label: 'Instagram URL' }, { key: 'campaign_type', label: 'Campaign type' }, { key: 'publish_date', label: 'Publish date', type: 'date' }, { key: 'featured', label: 'Featured', type: 'checkbox' }, { key: 'status', label: 'Status', type: 'select', options: ['draft','published'] }, { key: 'sort_order', label: 'Sort order', type: 'number' },
]} />;

export const CategoriesManager = () => <CrudManager title="Portfolio Categories" description="Create and order filters used for portfolio content." table="portfolio_categories" orderBy="sort_order" autoSlugFrom="name" fields={[
  { key: 'name', label: 'Name', required: true }, { key: 'slug', label: 'Slug' }, { key: 'status', label: 'Status', type: 'select', options: ['draft','published'] }, { key: 'sort_order', label: 'Sort order', type: 'number' },
]} />;

export const ServicesManager = () => <CrudManager title="Services" description="Manage service cards and public service content." table="services" orderBy="sort_order" fields={[
  { key: 'title', label: 'Title', required: true }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'category', label: 'Category' }, { key: 'icon', label: 'Icon key' }, { key: 'status', label: 'Status', type: 'select', options: ['draft','published'] }, { key: 'sort_order', label: 'Sort order', type: 'number' },
]} />;

export const PackagesManager = () => <CrudManager title="Packages" description="Manage package pricing, feature lists and recommended state." table="packages" orderBy="sort_order" fields={[
  { key: 'name', label: 'Name', required: true }, { key: 'price', label: 'Price', type: 'number' }, { key: 'price_suffix', label: 'Price suffix', placeholder: '/month' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'features', label: 'Features (one per line)', type: 'array' }, { key: 'cta_text', label: 'CTA text' }, { key: 'cta_url', label: 'CTA URL' }, { key: 'recommended', label: 'Recommended', type: 'checkbox' }, { key: 'status', label: 'Status', type: 'select', options: ['draft','published'] }, { key: 'sort_order', label: 'Sort order', type: 'number' },
]} />;

export const AddonsManager = () => <CrudManager title="Add-ons" description="Manage optional services shown with packages." table="addons" orderBy="sort_order" fields={[
  { key: 'name', label: 'Name', required: true }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'price', label: 'Price label' }, { key: 'icon', label: 'Icon key' }, { key: 'status', label: 'Status', type: 'select', options: ['draft','published'] }, { key: 'sort_order', label: 'Sort order', type: 'number' },
]} />;

export const TestimonialsManager = () => <CrudManager title="Testimonials" description="Only publish real client testimonials. Draft items stay hidden from the website." table="testimonials" fields={[
  { key: 'client_name', label: 'Client name', required: true }, { key: 'company', label: 'Company' }, { key: 'photo_url', label: 'Client photo', type: 'media', folder: 'testimonials' }, { key: 'testimonial', label: 'Testimonial', type: 'textarea', required: true }, { key: 'rating', label: 'Rating', type: 'number' }, { key: 'instagram_url', label: 'Instagram URL' }, { key: 'status', label: 'Status', type: 'select', options: ['draft','published'] },
]} />;

export const CaseStudiesManager = () => <CrudManager title="Case Studies" description="Manage real or clearly labelled case studies. Avoid publishing unverified performance claims." table="case_studies" fields={[
  { key: 'brand_name', label: 'Brand name', required: true }, { key: 'industry', label: 'Industry' }, { key: 'cover_image', label: 'Cover image', type: 'media', folder: 'case-studies' }, { key: 'challenge', label: 'Challenge', type: 'textarea' }, { key: 'approach', label: 'Approach', type: 'textarea' }, { key: 'content_produced', label: 'Content produced', type: 'textarea' }, { key: 'results', label: 'Results', type: 'textarea' }, { key: 'client_quote', label: 'Client quote', type: 'textarea' }, { key: 'status', label: 'Status', type: 'select', options: ['draft','published'] },
]} />;

export const HomepageManager = () => <CrudManager title="Homepage CMS" description="Edit reusable homepage sections, CTA copy and media URLs." table="homepage" orderBy="sort_order" fields={[
  { key: 'section_key', label: 'Section key', required: true }, { key: 'heading', label: 'Heading' }, { key: 'subheading', label: 'Subheading', type: 'textarea' }, { key: 'cta_text', label: 'CTA text' }, { key: 'cta_url', label: 'CTA URL' }, { key: 'media_url', label: 'Media', type: 'media', folder: 'homepage' }, { key: 'visible', label: 'Visible', type: 'checkbox' }, { key: 'sort_order', label: 'Sort order', type: 'number' },
]} />;

export const MetricsManager = () => <CrudManager title="Metrics" description="Manage verified metrics only. Do not add invented numbers." table="metrics" orderBy="sort_order" fields={[
  { key: 'label', label: 'Label', required: true }, { key: 'value', label: 'Value', required: true }, { key: 'icon', label: 'Icon key' }, { key: 'status', label: 'Status', type: 'select', options: ['draft','published'] }, { key: 'sort_order', label: 'Sort order', type: 'number' },
]} />;

export const SocialLinksManager = () => <CrudManager title="Social Links" description="Manage public social profile links." table="social_links" orderBy="sort_order" fields={[
  { key: 'platform', label: 'Platform', required: true }, { key: 'url', label: 'URL', required: true }, { key: 'label', label: 'Label' }, { key: 'sort_order', label: 'Sort order', type: 'number' },
]} />;

export const SeoManager = () => <CrudManager title="SEO" description="Manage per-route search and social sharing metadata." table="seo_pages" orderBy="route" fields={[
  { key: 'route', label: 'Route', required: true }, { key: 'title', label: 'SEO title' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'og_title', label: 'Open Graph title' }, { key: 'og_description', label: 'Open Graph description', type: 'textarea' }, { key: 'og_image', label: 'Open Graph image', type: 'media', folder: 'seo' },
]} />;

export const SettingsManager = () => <CrudManager title="Site Settings" description="Central site values such as phone, email, Instagram, WhatsApp number and tagline." table="site_settings" orderBy="key" fields={[
  { key: 'key', label: 'Setting key', required: true }, { key: 'value', label: 'Value', type: 'textarea' },
]} />;
