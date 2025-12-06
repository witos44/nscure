// src/lib/supabase/server.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch,
      },
      cookies: {
        get(name: string) {
          return cookies().get(name)?.value;
        },
        getAll() {
          return cookies().getAll().map(cookie => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        set(cookie: { name: string; value: string }) {
          // Tidak diperlukan di server
        },
        remove(name: string) {
          // Tidak diperlukan di server
        },
      },
    }
  );
}