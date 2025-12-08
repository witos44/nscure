// src/app/admin/pages/page.tsx
'use client';

import { useState, useEffect } from 'react';
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

type Page = {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  date: string;
};

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/posts')
      .then(res => res.json())
      .then(data => {
        // Filter hanya yang type = 'page'
        setPages(data.filter(p => p.type === 'page'));
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.length > 0 ? (
              pages.map(page => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={page.status === 'published' ? 'outline' : 'secondary'}
                      className={`capitalize ${page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {page.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{page.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/admin/pages/${page.id}/edit`}>Edit</a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePublish(page.id, page.status)}
                      >
                        {page.status === 'draft' ? 'Publish' : 'Unpublish'}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(page.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  No pages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const handlePublish = async (id: string, currentStatus: string) => {
  const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
  try {
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      // Refresh data
      window.location.reload();
    }
  } catch (err) {
    alert('Failed to update status');
  }
};

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this page?')) return;
  try {
    const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      window.location.reload();
    }
  } catch (err) {
    alert('Failed to delete page');
  }
};