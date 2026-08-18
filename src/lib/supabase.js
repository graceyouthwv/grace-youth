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

/**
 * Uploads user avatar directly to Supabase Storage 'avatars' bucket,
 * retrieves the public URL, and updates the 'profiles' row in Supabase.
 */
export const uploadAvatarToSupabase = async (file, userId) => {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
    const cleanUserId = userId ? String(userId).replace(/[^a-zA-Z0-9-_]/g, '') : 'user';
    const fileName = `${cleanUserId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // 1. Upload to Supabase Storage 'avatars' bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.warn('Supabase storage notice (falling back to optimized base64 data):', uploadError.message);
      return null;
    }

    // 2. Retrieve Public CDN URL from Supabase Storage
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = urlData?.publicUrl;

    // 3. Update 'avatar_url' in Supabase 'profiles' table
    if (publicUrl && userId) {
      await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);
    }

    return publicUrl;
  } catch (err) {
    console.warn('Supabase avatar upload notice:', err?.message || err);
    return null;
  }
};

/**
 * Syncs full user profile changes to Supabase 'profiles' table
 */
export const syncProfileToSupabase = async (userProfile) => {
  if (!isSupabaseConfigured || !supabase || !userProfile?.id) {
    return false;
  }

  try {
    const { error } = await supabase.from('profiles').upsert({
      id: userProfile.id,
      full_name: userProfile.name,
      campus_id: userProfile.campusId,
      college_program: userProfile.program,
      year_level: userProfile.yearLevel,
      role: userProfile.role,
      bio: userProfile.bio,
      avatar_url: userProfile.avatar
    });

    return !error;
  } catch (err) {
    console.warn('Supabase profile upsert notice:', err?.message || err);
    return false;
  }
};
