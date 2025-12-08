// src/app/admin/posts/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type Post = {
  id: string;
  title: string;
  slug: string;
  type: 'blog' | 'page';
  status: 'draft' | 'published';
  date: string;
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load posts. Please try again.');
        setLoading(false);
      });
  }, []);

  const handlePublish = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }), // ✅ hanya kirim status yang berubah
      });

      if (res.ok) {
        setPosts(posts.map(p => p.id === id ? { ...p, status: newStatus } : p));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card>
          <CardContent className="py-10 text-center">Loading...</CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="py-6 text-red-800 text-center">
            {error}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <CardTitle className="text-2xl">All Posts</CardTitle>
        <Button asChild>
          <Link href="/admin/posts/new">+ New Post</Link>
        </Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length > 0 ? (
                posts.map(post => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <Badge
                        className={`capitalize ${
                          post.type === 'blog'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {post.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`capitalize ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
                        </Button>
                        <Button
                          variant={post.status === 'published' ? 'outline' : 'default'}
                          size="sm"
                          onClick={() => handlePublish(post.id, post.status)}
                        >
                          {post.status === 'draft' ? 'Publish' : 'Unpublish'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    No posts found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}