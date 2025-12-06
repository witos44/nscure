// frontend/src/app/api/admin/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';
const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN;

if (!ADMIN_API_TOKEN) {
  throw new Error('ADMIN_API_TOKEN is required in environment variables');
}

async function proxyToBackend(
  req: NextRequest,
  url: string,
  method: string,
  body?: any
) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ADMIN_API_TOKEN}`,
  };

  const init: RequestInit = { method, headers };
  if (body && method !== 'GET') {
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

export async function GET(req: NextRequest) {
  const url = `${BACKEND_URL}/api/posts`;
  return proxyToBackend(req, url, 'GET');
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const url = `${BACKEND_URL}/api/posts`;
  return proxyToBackend(req, url, 'POST', body);
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  if (!id || id === 'posts') {
    return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
  }

  const body = await req.json();
  const backendUrl = `${BACKEND_URL}/api/posts/${id}`;
  return proxyToBackend(req, backendUrl, 'PUT', body);
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  if (!id || id === 'posts') {
    return NextResponse.json({ error: 'Missing post ID' }, { status: 400 });
  }

  const backendUrl = `${BACKEND_URL}/api/posts/${id}`;
  const headers = {
    'Authorization': `Bearer ${ADMIN_API_TOKEN}`,
  };

  const res = await fetch(backendUrl, { method: 'DELETE', headers });
  return NextResponse.json({ success: true }, { status: res.status });
}