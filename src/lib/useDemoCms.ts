import { useCallback, useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from './supabase';

const CORRECT_INSTAGRAM_HANDLE = '@ashwini__rathod__19';
const CORRECT_INSTAGRAM_URL = 'https://www.instagram.com/ashwini__rathod__19/';
const LEGACY_INSTAGRAM_VALUES = new Set([
  '@ashwini_rathod_19',
  'https://instagram.com/ashwini_rathod_19',
  'https://www.instagram.com/ashwini_rathod_19/',
]);

function normalizeKnownProfile<T extends Record<string, any>>(table: string, rows: T[]): T[] {
  if (table === 'site_settings') {
    return rows.map((row) => {
      if (row.key === 'instagram' && LEGACY_INSTAGRAM_VALUES.has(String(row.value || ''))) {
        return { ...row, value: CORRECT_INSTAGRAM_HANDLE } as T;
      }
      if (row.key === 'instagram_url' && LEGACY_INSTAGRAM_VALUES.has(String(row.value || ''))) {
        return { ...row, value: CORRECT_INSTAGRAM_URL } as T;
      }
      return row;
    });
  }

  if (table === 'social_links') {
    return rows.map((row) => {
      if (String(row.platform || '').toLowerCase() !== 'instagram') return row;
      const shouldUpdateUrl = LEGACY_INSTAGRAM_VALUES.has(String(row.url || ''));
      const shouldUpdateLabel = LEGACY_INSTAGRAM_VALUES.has(String(row.label || ''));
      return {
        ...row,
        ...(shouldUpdateUrl ? { url: CORRECT_INSTAGRAM_URL } : {}),
        ...(shouldUpdateLabel ? { label: CORRECT_INSTAGRAM_HANDLE } : {}),
      } as T;
    });
  }

  return rows;
}

export function useDemoCmsRows<T extends Record<string, any>>(table: string, orderBy = 'sort_order') {
  const [rows, setRows] = useState<T[]>([]);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setLoaded(true);
      return;
    }
    const { data } = await supabase.from(table).select('*').order(orderBy, { ascending: true });
    setRows(normalizeKnownProfile(table, ((data || []) as T[])));
    setLoaded(true);
  }, [orderBy, table]);

  useEffect(() => {
    load();
    const refresh = () => load();
    window.addEventListener('reel2reach-demo-db-change', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('reel2reach-demo-db-change', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, [load]);

  return { rows, loaded, refresh: load };
}
