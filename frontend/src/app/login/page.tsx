'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      setError('Invalid response from server');
      setLoading(false);
      return;
    }

    if (!res.ok) {
      setError(data?.error || 'Login failed');
    } else {
      router.push('/admin/posts');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 w-80 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center">Admin Login</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <input
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter admin token"
        className="w-full border p-2 rounded"
        required
      />
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
