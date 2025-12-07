import { NextRequest, NextResponse } from 'next/server';

const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN!;
if (!ADMIN_API_TOKEN) throw new Error('ADMIN_API_TOKEN is required');

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (token !== ADMIN_API_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ success: true });
}
