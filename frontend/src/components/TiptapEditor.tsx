// src/components/TiptapEditor.tsx
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { useEffect, useState } from 'react';

export default function TiptapEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const [isMounted, setIsMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true }),
    ],
    content: content || '<p>Ketik konten di sini...</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content) {
      // ✅ Perbaikan: hapus `false`, atau ganti dengan opsi objek
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="border rounded-lg">
      <EditorContent editor={editor} className="p-4 min-h-[300px]" />
    </div>
  );
}