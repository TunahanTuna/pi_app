import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
    realtime: {
      enabled: true,
      params: {
        eventsPerSecond: 10,
      },
    },
    storage: {
      multiTab: true,
      storageKey: "supabase.auth.token",
    },
  }
);

// Authentication helper functions
export const auth = {
  signUp: async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password });
  },
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password });
  },
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  getSession: () => supabase.auth.getSession(),
  onAuthStateChange: (
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ) => {
    return supabase.auth.onAuthStateChange(callback);
  },
};

// Real-time subscription helper
export const subscribeToChanges = <T = any>(
  table: string,
  callback: (payload: RealtimePostgresChangesPayload<T>) => void,

  event: "INSERT" | "UPDATE" | "DELETE" = "*"
) => {
  return supabase
    .channel("db_changes")
    .on("postgres_changes", { event, schema: "public", table }, (payload) =>
      callback(payload as RealtimePostgresChangesPayload<T>)
    )
    .subscribe();
};

// Storage helper functions
export const storage = {
  upload: async (bucket: string, path: string, file: File) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  download: async (bucket: string, path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .download(path);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  delete: async (bucket: string, paths: string[]) => {
    try {
      const { data, error } = await supabase.storage.from(bucket).remove(paths);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
  getPublicUrl: (bucket: string, path: string) => {
    return supabase.storage.from(bucket).getPublicUrl(path);
  },
};
