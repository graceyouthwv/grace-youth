import { createClient } from '@supabase/supabase-js';

// Sanitize URL to ensure standard format (e.g. https://xxxx.supabase.co)
let rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
if (rawUrl.includes('/rest/v1')) {
  rawUrl = rawUrl.replace(/\/rest\/v1\/?$/, '');
}
if (rawUrl.endsWith('/')) {
  rawUrl = rawUrl.slice(0, -1);
}

const supabaseUrl = rawUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Helper to sync data with Supabase table or fallback gracefully to local state
 */
export const syncWithSupabase = async (table, localData, onFetchSuccess) => {
  if (!isSupabaseConfigured || !supabase) {
    return localData;
  }
  try {
    const { data, error } = await supabase.from(table).select('*');
    if (!error && data && data.length > 0) {
      if (onFetchSuccess) onFetchSuccess(data);
      return data;
    }
  } catch (err) {
    console.warn(`Supabase fetch notice for ${table}:`, err?.message || err);
  }
  return localData;
};
