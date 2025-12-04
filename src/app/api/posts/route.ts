// src/app/api/posts/route.ts
import { supabase } from '@/lib/supabase';
import { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';

export async function GET() {
  const { data, error } = await supabase.from('posts').select('*').order('date', { ascending: false });
  
  if (error) {
    console.error('Supabase error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), { status: 500 });
  }

  return Response.json(data || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, error } = await supabase.from('posts').insert([body]).select();

  if (error) {
    console.error('Insert error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create post' }), { status: 500 });
  }

  // ✅ Pastikan data ada
  if (!data || data.length === 0) {
    return new Response(JSON.stringify({ error: 'No data returned' }), { status: 500 });
  }

  return Response.json(data[0]);
}