// src/app/[category]/[slug]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function PostDetail({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const { category, slug } = params;

  const supabase = createClient();

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', category)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>

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
    </div>
  );
}
