export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True once Supabase env vars are set. Lets the app fall back to bundled defaults instead of breaking. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
