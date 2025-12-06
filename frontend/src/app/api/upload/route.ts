// src/app/api/upload/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const bucket = formData.get('bucket') as string;

  if (!file || !bucket) {
    return Response.json({ error: 'File atau bucket tidak ditemukan' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${Date.now()}-${file.name}`;

  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // ✅ Perbaikan: akses publicUrl dari data, bukan urlData
  const publicUrl = supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl;

  return Response.json({ url: publicUrl });
}