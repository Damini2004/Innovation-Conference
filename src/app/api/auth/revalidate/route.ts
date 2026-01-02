// src/app/api/auth/revalidate/route.ts
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.split('; ').find(c => c.startsWith('session-token='))?.split('=')[1];

  try {
    await verifyAuth(token);
    return NextResponse.json({ success: true, message: 'Session is valid.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Session expired or invalid.' }, { status: 401 });
  }
}
