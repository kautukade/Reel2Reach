type DemoRow = Record<string, any>;
type DemoDb = Record<string, DemoRow[]>;
type DemoFilter = { kind: 'eq' | 'neq' | 'in' | 'is' | 'ilike'; column: string; value: any };
type DemoOrder = { column: string; ascending: boolean; nullsFirst?: boolean };

const DB_KEY = 'reel2reach.demo.db.v3';
const SESSION_KEY = 'reel2reach.demo.session.v1';
const MEDIA_DB_NAME = 'reel2reach-demo-media';
const MEDIA_STORE = 'files';
const MEDIA_TOKEN = 'demo-media://';

export const isBrowserDemoMode = true;
export const DEMO_ADMIN_EMAIL = 'demo@reel2reach.local';
export const DEMO_ADMIN_PASSWORD = 'demo1234';

function uid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `demo-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function defaultDb(): DemoDb {
  const now = nowIso();
  return {
    site_settings: [
      { id: uid(), key: 'site_name', value: 'Reel2Reach Media', created_at: now, updated_at: now },
      { id: uid(), key: 'tagline', value: 'Your brand, our reel, everyone will see it.', created_at: now, updated_at: now },
      { id: uid(), key: 'phone', value: '+91 8263058461', created_at: now, updated_at: now },
      { id: uid(), key: 'email', value: 'real2reach@gmail.com', created_at: now, updated_at: now },
      { id: uid(), key: 'instagram', value: '@ashwini_rathod_19', created_at: now, updated_at: now },
      { id: uid(), key: 'instagram_url', value: 'https://instagram.com/ashwini_rathod_19', created_at: now, updated_at: now },
      { id: uid(), key: 'whatsapp_number', value: '918263058461', created_at: now, updated_at: now },
    ],
    metrics: [],
    portfolio_categories: [
      { id: uid(), name: 'Fashion', slug: 'fashion', status: 'published', sort_order: 1, created_at: now },
      { id: uid(), name: 'Beauty', slug: 'beauty', status: 'published', sort_order: 2, created_at: now },
      { id: uid(), name: 'Food', slug: 'food', status: 'published', sort_order: 3, created_at: now },
      { id: uid(), name: 'Retail', slug: 'retail', status: 'published', sort_order: 4, created_at: now },
      { id: uid(), name: 'Product', slug: 'product', status: 'published', sort_order: 5, created_at: now },
      { id: uid(), name: 'Lifestyle', slug: 'lifestyle', status: 'published', sort_order: 6, created_at: now },
      { id: uid(), name: 'Collaboration', slug: 'collaboration', status: 'published', sort_order: 7, created_at: now },
    ],
    portfolio_items: [],
    packages: [
      {
        id: uid(), name: 'Basic Plan', price: 4999, price_suffix: '',
        description: 'Perfect for brands looking to create their first professional reel with influencer collaboration.',
        features: ['1 Reel (30–60 seconds)', 'Shot with an influencer', 'Scripted, directed and edited by the team', 'Caption + Hashtags + CTA', 'Story repost on influencer account', 'Influencer collaboration'],
        cta_text: 'GET STARTED', cta_url: '/book', recommended: false, status: 'published', sort_order: 1, created_at: now, updated_at: now,
      },
      {
        id: uid(), name: 'Combo Plan', price: 14999, price_suffix: '/month',
        description: 'Complete monthly content package with reels, posts, strategy and influencer amplification.',
        features: ['4 Reels (1 per week)', 'Influencer + product integration', 'Edited + scripted + trending theme', '10–15 Instagram posts', 'Static + carousel + quote templates', 'Content strategy & calendar', 'Influencer reposting 2–3x', 'Analytics report at the end of month'],
        cta_text: 'GET STARTED', cta_url: '/book', recommended: true, status: 'published', sort_order: 2, created_at: now, updated_at: now,
      },
      {
        id: uid(), name: 'Custom Growth Plan', price: null, price_suffix: '',
        description: 'Tailored solutions for brands that need a broader creative and growth package.',
        features: ['Tailored to your needs', 'Campaign planning', 'Creative direction', 'Multi-platform strategy', 'Priority support'],
        cta_text: 'BUILD MY PACKAGE', cta_url: '/book', recommended: false, status: 'published', sort_order: 3, created_at: now, updated_at: now,
      },
    ],
    addons: [
      { id: uid(), name: 'Paid Ads Setup & Boost', description: 'Inorganic marketing & paid promotion setup', price: 'On request', icon: 'megaphone', status: 'published', sort_order: 1, created_at: now, updated_at: now },
      { id: uid(), name: 'Social Media Management', description: 'Full account handling & management', price: 'On request', icon: 'globe', status: 'published', sort_order: 2, created_at: now, updated_at: now },
      { id: uid(), name: 'Google My Business', description: 'Registration & local SEO optimization', price: 'On request', icon: 'target', status: 'published', sort_order: 3, created_at: now, updated_at: now },
      { id: uid(), name: 'Instagram Audit & Strategy', description: 'Complete audit with growth strategy session', price: 'On request', icon: 'chart', status: 'published', sort_order: 4, created_at: now, updated_at: now },
      { id: uid(), name: 'Logo + Branding Design', description: 'Logo design & complete brand identity', price: 'On request', icon: 'palette', status: 'published', sort_order: 5, created_at: now, updated_at: now },
    ],
    services: [
      { id: uid(), title: 'Video Content Creation', description: 'Reels, product storytelling, scripted videos, BTS, POV and cinematic social content.', category: 'Content', icon: 'film', status: 'published', sort_order: 1, created_at: now, updated_at: now },
      { id: uid(), title: 'Influencer Marketing', description: 'Creator collaborations, shoutouts, sponsored stories and audience-first brand visibility.', category: 'Influencer', icon: 'users', status: 'published', sort_order: 2, created_at: now, updated_at: now },
      { id: uid(), title: 'Social Media Management', description: 'Content planning, Instagram management, publishing, engagement and brand consistency.', category: 'Social', icon: 'globe', status: 'published', sort_order: 3, created_at: now, updated_at: now },
    ],
    case_studies: [],
    testimonials: [],
    leads: [],
    social_links: [
      { id: uid(), platform: 'Instagram', url: 'https://instagram.com/ashwini_rathod_19', label: '@ashwini_rathod_19', sort_order: 1, created_at: now },
      { id: uid(), platform: 'WhatsApp', url: 'https://wa.me/918263058461', label: '+91 8263058461', sort_order: 2, created_at: now },
    ],
    homepage: [],
    seo_pages: [],
    blog_posts: [
      {
        id: uid(),
        title: 'DEMO — From Product to Scroll-Stopping Reel',
        slug: 'demo-product-to-scroll-stopping-reel',
        excerpt: 'A sample browser-only article created to demonstrate the Reel2Reach blog experience. The client can edit or delete it from the admin panel.',
        content: 'This is a demo article stored only inside this browser.\n\nThe idea is simple: start with the product truth, find one visual hook, build a short story around it, then shape every frame for vertical viewing.\n\nDuring the client demo you can edit this article, upload multiple photographs and videos, publish drafts and immediately see the result on the public Blog page.\n\nNothing here needs Supabase. When the production backend is connected later, this browser demo layer can be replaced without redesigning the interface.',
        cover_image: null,
        author_name: 'Reel2Reach Media',
        category: 'Creative Process',
        featured: true,
        status: 'published',
        published_at: now,
        seo_title: 'Demo Reel2Reach Blog',
        seo_description: 'Browser demo article for the Reel2Reach blog CMS.',
        created_at: now,
        updated_at: now,
      },
    ],
    blog_media: [],
  };
}

function loadDb(): DemoDb {
  if (typeof window === 'undefined') return defaultDb();
  const raw = window.localStorage.getItem(DB_KEY);
  if (!raw) {
    const seeded = defaultDb();
    window.localStorage.setItem(DB_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const parsed = JSON.parse(raw) as DemoDb;
    const seed = defaultDb();
    for (const key of Object.keys(seed)) if (!Array.isArray(parsed[key])) parsed[key] = seed[key];
    return parsed;
  } catch {
    const seeded = defaultDb();
    window.localStorage.setItem(DB_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function saveDb(db: DemoDb) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(DB_KEY, JSON.stringify(db));
  window.dispatchEvent(new CustomEvent('reel2reach-demo-db-change'));
}

export function resetBrowserDemoData() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(DB_KEY);
  window.localStorage.removeItem(SESSION_KEY);
  loadDb();
}

function openMediaDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('This browser does not support local media storage.'));
      return;
    }
    const request = indexedDB.open(MEDIA_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(MEDIA_STORE)) db.createObjectStore(MEDIA_STORE, { keyPath: 'path' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open browser media storage.'));
  });
}

type StoredMedia = { path: string; blob: Blob; name: string; contentType: string; size: number; created_at: string };

async function putMedia(path: string, blob: Blob) {
  const db = await openMediaDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(MEDIA_STORE, 'readwrite');
    tx.objectStore(MEDIA_STORE).put({ path, blob, name: path.split('/').pop() || path, contentType: blob.type, size: blob.size, created_at: nowIso() } satisfies StoredMedia);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('Could not save media in this browser.'));
  });
  db.close();
}

async function getMedia(path: string): Promise<StoredMedia | null> {
  const db = await openMediaDb();
  const result = await new Promise<StoredMedia | null>((resolve, reject) => {
    const tx = db.transaction(MEDIA_STORE, 'readonly');
    const request = tx.objectStore(MEDIA_STORE).get(path);
    request.onsuccess = () => resolve((request.result as StoredMedia | undefined) || null);
    request.onerror = () => reject(request.error || new Error('Could not read browser media.'));
  });
  db.close();
  return result;
}

async function listMedia(): Promise<StoredMedia[]> {
  const db = await openMediaDb();
  const result = await new Promise<StoredMedia[]>((resolve, reject) => {
    const tx = db.transaction(MEDIA_STORE, 'readonly');
    const request = tx.objectStore(MEDIA_STORE).getAll();
    request.onsuccess = () => resolve((request.result || []) as StoredMedia[]);
    request.onerror = () => reject(request.error || new Error('Could not list browser media.'));
  });
  db.close();
  return result;
}

async function removeMedia(path: string) {
  const db = await openMediaDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(MEDIA_STORE, 'readwrite');
    tx.objectStore(MEDIA_STORE).delete(path);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('Could not delete browser media.'));
  });
  db.close();
}

const objectUrlByPath = new Map<string, string>();
const pathByObjectUrl = new Map<string, string>();

function mediaToken(path: string) {
  return `${MEDIA_TOKEN}${encodeURIComponent(path)}`;
}

function tokenPath(value: string) {
  return value.startsWith(MEDIA_TOKEN) ? decodeURIComponent(value.slice(MEDIA_TOKEN.length)) : null;
}

async function ensureObjectUrl(path: string): Promise<string> {
  const cached = objectUrlByPath.get(path);
  if (cached) return cached;
  const item = await getMedia(path);
  if (!item) return '';
  const url = URL.createObjectURL(item.blob);
  objectUrlByPath.set(path, url);
  pathByObjectUrl.set(url, path);
  return url;
}

function stableValue(value: any): any {
  if (typeof value === 'string') {
    const path = pathByObjectUrl.get(value);
    return path ? mediaToken(path) : value;
  }
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === 'object' && !(value instanceof Blob)) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, stableValue(item)]));
  }
  return value;
}

async function resolvedValue(value: any): Promise<any> {
  if (typeof value === 'string') {
    const path = tokenPath(value);
    if (!path) return value;
    const url = await ensureObjectUrl(path);
    return url || value;
  }
  if (Array.isArray(value)) return Promise.all(value.map(resolvedValue));
  if (value && typeof value === 'object') {
    const entries = await Promise.all(Object.entries(value).map(async ([key, item]) => [key, await resolvedValue(item)] as const));
    return Object.fromEntries(entries);
  }
  return value;
}

function applyProjection(row: DemoRow, columns: string) {
  if (!columns || columns.trim() === '*') return { ...row };
  const keys = columns.split(',').map((key) => key.trim()).filter(Boolean).map((key) => key.split(':').pop() || key);
  const output: DemoRow = {};
  for (const key of keys) if (key in row) output[key] = row[key];
  return output;
}

function includesInsensitive(haystack: any, needle: any) {
  const pattern = String(needle ?? '').replace(/^%|%$/g, '').toLowerCase();
  return String(haystack ?? '').toLowerCase().includes(pattern);
}

class DemoQueryBuilder {
  private action: 'select' | 'insert' | 'update' | 'delete' = 'select';
  private payload: any = null;
  private columns = '*';
  private filters: DemoFilter[] = [];
  private orders: DemoOrder[] = [];
  private limitValue: number | null = null;
  private countMode = false;
  private headMode = false;
  private singleMode = false;

  constructor(private table: string) {}

  select(columns = '*', options?: { count?: string; head?: boolean }) {
    this.columns = columns;
    this.countMode = options?.count === 'exact';
    this.headMode = Boolean(options?.head);
    return this;
  }

  insert(payload: any) { this.action = 'insert'; this.payload = payload; return this; }
  update(payload: any) { this.action = 'update'; this.payload = payload; return this; }
  delete() { this.action = 'delete'; return this; }
  eq(column: string, value: any) { this.filters.push({ kind: 'eq', column, value }); return this; }
  neq(column: string, value: any) { this.filters.push({ kind: 'neq', column, value }); return this; }
  in(column: string, value: any[]) { this.filters.push({ kind: 'in', column, value }); return this; }
  is(column: string, value: any) { this.filters.push({ kind: 'is', column, value }); return this; }
  ilike(column: string, value: string) { this.filters.push({ kind: 'ilike', column, value }); return this; }
  order(column: string, options?: { ascending?: boolean; nullsFirst?: boolean }) { this.orders.push({ column, ascending: options?.ascending !== false, nullsFirst: options?.nullsFirst }); return this; }
  limit(value: number) { this.limitValue = value; return this; }
  range(from: number, to: number) { this.limitValue = Math.max(0, to - from + 1); return this; }
  single() { this.singleMode = true; return this; }
  maybeSingle() { this.singleMode = true; return this; }

  then<TResult1 = any, TResult2 = never>(onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null) {
    return this.execute().then(onfulfilled, onrejected);
  }

  private matches(row: DemoRow) {
    return this.filters.every((filter) => {
      const current = row[filter.column];
      if (filter.kind === 'eq') return current === filter.value;
      if (filter.kind === 'neq') return current !== filter.value;
      if (filter.kind === 'in') return Array.isArray(filter.value) && filter.value.includes(current);
      if (filter.kind === 'is') return filter.value === null ? current === null || current === undefined : current === filter.value;
      if (filter.kind === 'ilike') return includesInsensitive(current, filter.value);
      return true;
    });
  }

  private sortRows(rows: DemoRow[]) {
    if (this.orders.length === 0) return rows;
    return [...rows].sort((a, b) => {
      for (const order of this.orders) {
        const av = a[order.column];
        const bv = b[order.column];
        const aNull = av === null || av === undefined;
        const bNull = bv === null || bv === undefined;
        if (aNull || bNull) {
          if (aNull && bNull) continue;
          const nullFirst = order.nullsFirst ?? false;
          const result = aNull ? (nullFirst ? -1 : 1) : (nullFirst ? 1 : -1);
          return order.ascending ? result : -result;
        }
        if (av === bv) continue;
        const result = av > bv ? 1 : -1;
        return order.ascending ? result : -result;
      }
      return 0;
    });
  }

  private async execute() {
    try {
      const db = loadDb();
      if (!Array.isArray(db[this.table])) db[this.table] = [];
      const tableRows = db[this.table];

      if (this.action === 'select') {
        let rows = tableRows.filter((row) => this.matches(row));
        const count = rows.length;
        rows = this.sortRows(rows);
        if (this.limitValue !== null) rows = rows.slice(0, this.limitValue);
        if (this.headMode) return { data: null, error: null, count: this.countMode ? count : null };
        const projected = rows.map((row) => applyProjection(row, this.columns));
        const resolved = await Promise.all(projected.map(resolvedValue));
        if (this.singleMode) return { data: resolved[0] || null, error: resolved[0] ? null : { message: 'No rows found' }, count: this.countMode ? count : null };
        return { data: resolved, error: null, count: this.countMode ? count : null };
      }

      if (this.action === 'insert') {
        const input = Array.isArray(this.payload) ? this.payload : [this.payload];
        const inserted = input.map((item) => {
          const clean = stableValue(item || {});
          const row = {
            id: clean.id || uid(),
            created_at: clean.created_at || nowIso(),
            updated_at: clean.updated_at || nowIso(),
            ...clean,
          };
          tableRows.push(row);
          return row;
        });
        saveDb(db);
        const projected = inserted.map((row) => applyProjection(row, this.columns));
        const resolved = await Promise.all(projected.map(resolvedValue));
        return { data: this.singleMode ? resolved[0] || null : resolved, error: null, count: null };
      }

      const matchedIndexes = tableRows.map((row, index) => this.matches(row) ? index : -1).filter((index) => index >= 0);

      if (this.action === 'update') {
        const cleanPayload = stableValue(this.payload || {});
        const updated: DemoRow[] = [];
        for (const index of matchedIndexes) {
          tableRows[index] = { ...tableRows[index], ...cleanPayload };
          updated.push(tableRows[index]);
        }
        saveDb(db);
        const projected = updated.map((row) => applyProjection(row, this.columns));
        const resolved = await Promise.all(projected.map(resolvedValue));
        return { data: this.singleMode ? resolved[0] || null : resolved, error: null, count: null };
      }

      const deleted = matchedIndexes.map((index) => tableRows[index]);
      const deletedIds = new Set(deleted.map((row) => row.id));
      db[this.table] = tableRows.filter((_, index) => !matchedIndexes.includes(index));
      if (this.table === 'blog_posts' && deletedIds.size > 0) {
        db.blog_media = (db.blog_media || []).filter((row) => !deletedIds.has(row.post_id));
      }
      saveDb(db);
      const projected = deleted.map((row) => applyProjection(row, this.columns));
      const resolved = await Promise.all(projected.map(resolvedValue));
      return { data: this.singleMode ? resolved[0] || null : resolved, error: null, count: null };
    } catch (error) {
      return { data: this.singleMode ? null : [], error: { message: error instanceof Error ? error.message : 'Browser demo database error' }, count: null };
    }
  }
}

function readSession() {
  if (typeof window === 'undefined') return null;
  try { return JSON.parse(window.localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}

const authListeners = new Set<(event: string, session: any) => void>();

function writeSession(session: any) {
  if (typeof window !== 'undefined') {
    if (session) window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    else window.localStorage.removeItem(SESSION_KEY);
  }
  for (const listener of authListeners) listener(session ? 'SIGNED_IN' : 'SIGNED_OUT', session);
}

const demoAuth = {
  async signInWithPassword({ email, password }: { email: string; password: string }) {
    if (!email?.trim() || !password?.trim()) return { data: { user: null, session: null }, error: { message: 'Enter email and password.' } };
    const user = { id: 'browser-demo-admin', email: email.trim(), role: 'authenticated' };
    const session = { access_token: 'browser-demo-session', token_type: 'bearer', user };
    writeSession(session);
    return { data: { user, session }, error: null };
  },
  async getSession() { return { data: { session: readSession() }, error: null }; },
  async getUser() { const session = readSession(); return { data: { user: session?.user || null }, error: null }; },
  onAuthStateChange(callback: (event: string, session: any) => void) {
    authListeners.add(callback);
    return { data: { subscription: { unsubscribe: () => authListeners.delete(callback) } } };
  },
  async signOut() { writeSession(null); return { error: null }; },
};

const demoStorage = {
  from(_bucket: string) {
    return {
      async upload(path: string, file: Blob) {
        try {
          await putMedia(path, file);
          const url = URL.createObjectURL(file);
          const old = objectUrlByPath.get(path);
          if (old) URL.revokeObjectURL(old);
          objectUrlByPath.set(path, url);
          pathByObjectUrl.set(url, path);
          return { data: { path }, error: null };
        } catch (error) {
          return { data: null, error: { message: error instanceof Error ? error.message : 'Upload failed.' } };
        }
      },
      getPublicUrl(path: string) {
        return { data: { publicUrl: objectUrlByPath.get(path) || mediaToken(path) } };
      },
      async remove(paths: string[]) {
        try {
          for (const path of paths) {
            await removeMedia(path);
            const url = objectUrlByPath.get(path);
            if (url) URL.revokeObjectURL(url);
            objectUrlByPath.delete(path);
          }
          return { data: paths, error: null };
        } catch (error) {
          return { data: null, error: { message: error instanceof Error ? error.message : 'Delete failed.' } };
        }
      },
      async list(prefix = '', options?: { limit?: number; offset?: number; sortBy?: { column?: string; order?: 'asc' | 'desc' } }) {
        try {
          let rows = (await listMedia()).filter((item) => item.path.startsWith(prefix));
          const order = options?.sortBy?.order === 'asc' ? 1 : -1;
          rows = rows.sort((a, b) => a.created_at > b.created_at ? order : -order);
          const offset = options?.offset || 0;
          if (typeof options?.limit === 'number') rows = rows.slice(offset, offset + options.limit); else rows = rows.slice(offset);
          await Promise.all(rows.map((row) => ensureObjectUrl(row.path)));
          return {
            data: rows.map((row) => ({
              id: row.path,
              name: row.path.split('/').pop() || row.path,
              created_at: row.created_at,
              updated_at: row.created_at,
              metadata: { size: row.size, mimetype: row.contentType, cacheControl: '3600' },
              path: row.path,
            })),
            error: null,
          };
        } catch (error) {
          return { data: [], error: { message: error instanceof Error ? error.message : 'Could not list media.' } };
        }
      },
    };
  },
};

export const isSupabaseConfigured = (): boolean => true;

export const supabase: any = {
  from(table: string) { return new DemoQueryBuilder(table); },
  auth: demoAuth,
  storage: demoStorage,
};

// The site intentionally runs in browser-only demo mode for client presentations.
// Data records are stored in localStorage; uploaded images/videos are stored in IndexedDB.
// This keeps every CMS screen interactive without Supabase or another backend.
loadDb();
