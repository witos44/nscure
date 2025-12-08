// src/app/admin/posts/[id]/edit/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Lazy load PostEditor
import dynamic from 'next/dynamic';

const PostEditor = dynamic(
  () => import('@/components/PostEditor').then((mod) => mod.PostEditor),
  { ssr: false }
);

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState<'page' | 'blog'>('blog');
  const [content, setContent] = useState('<p>Start writing...</p>');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { id } = await params;
      const res = await fetch(`/api/admin/posts/${id}`);
      const post = await res.json();
      setTitle(post.title);
      setSlug(post.slug);
      setType(post.type);
      setContent(post.content);
    };
    fetchPost();
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    if (!title || !generatedSlug || !content) {
      setError('Please fill in all required fields.');
      setIsSaving(false);
      return;
    }

    const excerpt = content
      .replace(/<[^>]*>/g, '')
      .substring(0, 150)
      .trim()
      .replace(/\s+$/g, '') + '...';

    try {
      const { id } = await params;
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: generatedSlug,
          type,
          content,
          excerpt,
          image_url: '',
          status: 'draft', // bisa diubah nanti
        }),
      });

      if (res.ok) {
        router.push('/admin/posts');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update post. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-generated from title"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={(v) => setType(v as 'page' | 'blog')}>
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blog">Blog Post</SelectItem>
              <SelectItem value="page">Static Page</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Content</Label>
          <PostEditor content={content} onChange={setContent} />
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/posts')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}