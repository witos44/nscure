// src/app/api/admin/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Get posts error:', err);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_TOKEN}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, slug, type, content, excerpt = '', image_url = '' } = body;

  if (!title || !slug || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const supabase = getSupabaseClient();
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('posts')
      .insert([{ 
        title, 
        slug, 
        type, 
        content, 
        excerpt, 
        image_url, 
        date: today,
        status: 'draft'
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Create post error:', err);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}