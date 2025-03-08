import {
  createClient,
  AuthChangeEvent,
  Session,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
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
      eventsPerSecond: 2,
    },
    storage: {
      multiTab: true,
      storageKey: "supabase.auth.token",
    },
  } as any
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

// Database query helper functions
export const getProduct = async (slug: string) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const getProductSlugs = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("slug")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data) return { data: [], error: null };

    const slugs = data.map((product: any) => product.slug);
    return { data: slugs, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Real-time subscription helper
export const subscribeToChanges = <T = any>(
  table: string,
  callback: (payload: any) => void,
  event: "INSERT" | "UPDATE" | "DELETE"
) => {
  return supabase
    .channel("db_changes")
    .on(
      "postgres_changes" as any,
      { event, schema: "public", table },
      (payload: any) => callback(payload as any)
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
