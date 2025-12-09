// src/app/admin/layout.tsx
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Debug: pastikan layout ter-load
  if (typeof window !== 'undefined') {
    console.log('AdminLayout loaded');
  }

  return (
    <div className="flex h-screen bg-gray-50 border-4 border-red-500">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto border-2 border-blue-500">
          {children}
        </main>
      </div>
    </div>
  );
}
