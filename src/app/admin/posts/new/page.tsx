// src/app/admin/posts/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [date, setDate] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('<p>Tulis konten di sini...</p>');
  const [affiliateLink, setAffiliateLink] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  // Fungsi upload ke Supabase Storage
  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'images');
    formData.append('prefix', 'posts');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const { url } = await res.json();
        return url;
      } else {
        throw new Error('Upload gagal');
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const url = await uploadImage(file);
    setIsUploading(false);

    if (url) {
      // Sisipkan gambar ke konten (opsional)
      alert('Gambar diupload. URL: ' + url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const post = {
      title,
      slug,
      date,
      excerpt,
      content,
      affiliate_link: affiliateLink,
    };

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (res.ok) {
        alert('Post berhasil disimpan!');
        router.push(`/blog/${slug}`);
      } else {
        alert('Gagal menyimpan post');
      }
    } catch (err) {
      console.error(err);
      alert('Error: ' + (err as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Buat Post Baru (Admin)</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Judul</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug (URL)</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tanggal</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ringkasan</label>
          <textarea
            className="w-full p-2 border rounded"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Konten HTML</label>
          <textarea
            className="w-full p-2 border rounded font-mono"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            placeholder="<p>Konten HTML...</p>"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Untuk MVP, isi dengan HTML. Nanti akan diganti dengan rich text editor.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Affiliate Link</label>
          <input
            type="url"
            className="w-full p-2 border rounded"
            value={affiliateLink}
            onChange={(e) => setAffiliateLink(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload Gambar (opsional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={isUploading}
          />
          {isUploading && <p className="text-sm text-gray-600">Mengupload...</p>}
        </div>

        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
          disabled={isSaving}
        >
          {isSaving ? 'Menyimpan...' : 'Simpan Post'}
        </button>
      </form>
    </div>
  );
}