'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || 'Invalid token');
      return;
    }

    // ✅ Simpan status login di localStorage
    localStorage.setItem('admin_logged_in', 'true');

    // ✅ Popup
    alert('✅ Login Success!');

    // ✅ Redirect
    router.push('/admin/posts');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="space-y-4 w-80 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <input
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ADMIN_API_TOKEN"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
}