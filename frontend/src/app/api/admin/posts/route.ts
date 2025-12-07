// frontend/src/app/api/admin/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';
const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN;

if (!ADMIN_API_TOKEN) {
  throw new Error('ADMIN_API_TOKEN is required in environment variables');
}

async function proxy(req: NextRequest, path: string, method: string, body?: any) {
  const res = await fetch(`${BACKEND_URL}/api/posts${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ADMIN_API_TOKEN}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // tangani body yang kosong
  let data: any = {};
  try {
    data = await res.json();
  } catch {}

  return NextResponse.json(data, { status: res.status });
}

export async function GET(req: NextRequest) {
  return proxy(req, '', 'GET');
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return proxy(req, '', 'POST', body);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const id = new URL(req.url).pathname.split('/').pop();
  if (!id || id === 'posts') return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
  return proxy(req, `/${id}`, 'PUT', body);
}

export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).pathname.split('/').pop();
  if (!id || id === 'posts') return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
  return proxy(req, `/${id}`, 'DELETE');
}
