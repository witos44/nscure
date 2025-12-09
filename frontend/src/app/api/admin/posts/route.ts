export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  // DEBUG: jangan print nilai aktual, hanya presence & length
  try {
    console.log('DEBUG env keys contain SUPABASE_SERVICE_ROLE_KEY:',
      Object.prototype.hasOwnProperty.call(process.env, 'SUPABASE_SERVICE_ROLE_KEY'));
    console.log('DEBUG typeof SUPABASE_SERVICE_ROLE_KEY:', typeof process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log('DEBUG SUPABASE_SERVICE_ROLE_KEY length:',
      process.env.SUPABASE_SERVICE_ROLE_KEY ? process.env.SUPABASE_SERVICE_ROLE_KEY.length : 'undefined');
  } catch (e) {
    console.error('DEBUG env read error', e);
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('posts').select('*');
    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('API fatal error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
