// src/components/Header.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    // Hapus token/session admin
    localStorage.removeItem('admin_logged_in');

    // Redirect ke homepage
    router.push('/');

    // Bisa paksa refresh agar MainNav update isLoggedIn
    window.location.reload();
  };

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
      <div className="flex gap-2">
        <Button onClick={() => router.push('/admin/posts/new')} variant="outline">
          + New Post
        </Button>
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </div>
    </header>
  );
}
