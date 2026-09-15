import { useCallback, useEffect, useState } from 'react';
import { isSupabaseConfigured, supabase } from './supabase';

export function useDemoCmsRows<T extends Record<string, any>>(table: string, orderBy = 'sort_order') {
  const [rows, setRows] = useState<T[]>([]);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setLoaded(true);
      return;
    }
    const { data } = await supabase.from(table).select('*').order(orderBy, { ascending: true });
    setRows(((data || []) as T[]));
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
