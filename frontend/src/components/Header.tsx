// src/components/Header.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
      <Button onClick={() => router.push('/admin/posts/new')} variant="outline">
        + New Post
      </Button>
    </header>
  );
}