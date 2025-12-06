'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

type PostEditorProps = {
  content: string;
  onChange: (content: string) => void;
};

export function PostEditor({ content, onChange }: PostEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          defaultLanguage: null,
        },
      }),
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true }),
    ],
    content,
    immediatelyRender: false, // ✅ Hindari SSR error
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('Editor updated:', html.substring(0, 100) + '...'); // Debug
      onChange(html);
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto p-4 focus:outline-none min-h-[500px] border rounded-lg',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg">
      {/* Toolbar sticky */}
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50 sticky top-0 z-50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive('bold') ? 'bg-gray-300' : 'hover:bg-gray-200'
          }`}
          title="Bold"
        >
          <strong>B</strong>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive('italic') ? 'bg-gray-300' : 'hover:bg-gray-200'
          }`}
          title="Italic"
        >
          <em>I</em>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : 'hover:bg-gray-200'
          }`}
          title="Heading"
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive('bulletList') ? 'bg-gray-300' : 'hover:bg-gray-200'
          }`}
          title="Bullet List"
        >
          •••
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded ${
            editor.isActive('codeBlock') ? 'bg-gray-300' : 'hover:bg-gray-200'
          }`}
          title="Code Block"
        >
          {'</>'}
        </button>

        <button
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={`p-2 rounded ${
            editor.isActive('link') ? 'bg-gray-300' : 'hover:bg-gray-200'
          }`}
          title="Link"
        >
          🔗
        </button>

        <button
          onClick={() => {
            const src = prompt('Enter image URL:');
            if (src) editor.chain().focus().setImage({ src }).run();
          }}
          className="p-2 rounded hover:bg-gray-200"
          title="Image"
        >
          🖼️
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}