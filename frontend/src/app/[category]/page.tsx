// src/app/[category]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const CATEGORY_MAP: Record<string, string> = {
  'security-tools': 'Security Tools',
  'work-from-anywhere': 'Work From Anywhere',
  deals: 'Deals',
  guides: 'Guides',
  reviews: 'Reviews',
}

type Props = {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({
    category: slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { category } = params
  const title = CATEGORY_MAP[category] || 'Category'
  return { title: `${title} | SecureRemote` }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = params

  if (!CATEGORY_MAP[category]) {
    notFound()
  }

  const supabase = createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .order('date', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        {CATEGORY_MAP[category]}
      </h1>

      <div className="space-y-6">
        {posts?.length ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <Link
                href={`/${category}/${post.slug}`}
                className="text-xl font-semibold text-blue-600 hover:underline"
              >
                {post.title}
              </Link>

              <p className="text-gray-600 mt-2">{post.excerpt}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>No posts in this category yet.</p>
        )}
      </div>
    </div>
  )
}
