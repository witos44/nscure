// src/app/admin/posts/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type Post = {
  id: string;
  title: string;
  slug: string;
  type: 'blog' | 'page';
  status: 'draft' | 'published';
  date: string;
  content: string;
  excerpt: string;
  image_url: string;
};

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const id = params.id as string;
      const res = await fetch(`/api/admin/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      }
      setLoading(false);
    };

    if (params?.id) {
      fetchPost();
    }
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card>
          <CardContent className="py-10 text-center">Loading...</CardContent>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card>
          <CardContent className="py-10 text-center text-red-500">
            Post not found.
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePublish = async () => {
    const newStatus = post.status === 'draft' ? 'published' : 'draft';
    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, status: newStatus }),
      });

      if (res.ok) {
        setPost({ ...post, status: newStatus });
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/posts');
      }
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="flex items-center gap-4 mt-2">
            <Badge
              variant={post.type === 'blog' ? 'default' : 'secondary'}
              className={`capitalize ${post.type === 'blog' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}
            >
              {post.type}
            </Badge>
            <Badge
              variant={post.status === 'published' ? 'outline' : 'secondary'}
              className={`capitalize ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
            >
              {post.status}
            </Badge>
            <span className="text-sm text-gray-500">{post.date}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
          </Button>
          <Button
            variant={post.status === 'published' ? 'outline' : 'default'}
            size="sm"
            onClick={handlePublish}
          >
            {post.status === 'draft' ? 'Publish' : 'Unpublish'}
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </CardContent>
      </Card>
    </div>
  );
}