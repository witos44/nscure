// src/app/blog/[slug]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const supabase = createClient(); // ✅ buat client
  const { data, error } = await supabase.from('posts').select('slug');
  if (error) return [];
  return data.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createClient(); // ✅ buat client
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt, image_url')
    .eq('slug', slug)
    .single();

  if (!post) {
    return { title: 'Artikel Tidak Ditemukan' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: post.image_url ? [{ url: post.image_url }] : [],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createClient(); // ✅ buat client
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">{new Date(post.date).toLocaleDateString('id-ID')}</p>

      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-auto rounded-lg my-6"
        />
      )}

      <div
        className="prose prose-teal max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.affiliate_link && (
        <a
          href={post.affiliate_link}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-block mt-6 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          → Kunjungi Penawaran
        </a>
      )}

      <div className="mt-8 pt-6 border-t">
        <a href="/blog" className="text-teal-600 hover:underline">
          ← Kembali ke Blog
        </a>
      </div>
    </div>
  );
}