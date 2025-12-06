// src/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Posts', href: '/admin/posts', icon: '📝' },
    { name: 'Pages', href: '/admin/pages', icon: '📄' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-800">SecureRemote</h1>
      </div>

      <nav className="mt-8 space-y-2 px-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              pathname.startsWith(item.href)
                ? 'bg-blue-100 text-blue-800'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}