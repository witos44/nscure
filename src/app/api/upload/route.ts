import { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

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

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // ✅ Perbaikan: sesuai struktur respons Supabase
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  const publicUrl = urlData.publicUrl;

  return Response.json({ url: publicUrl });
}