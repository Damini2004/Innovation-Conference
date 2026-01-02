// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { verifySubAdminCredentials } from '@/services/subAdminService';
import { verifySuperAdminCredentials } from '@/services/superAdminService';
import { encrypt } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    let verificationResult;
    if (role === 'super-admin') {
      verificationResult = await verifySuperAdminCredentials(email, password);
    } else if (role === 'sub-admin') {
      verificationResult = await verifySubAdminCredentials(email, password);
    } else {
      return NextResponse.json({ success: false, message: 'Invalid role specified.' }, { status: 400 });
    }

    if (!verificationResult.success) {
      return NextResponse.json({ success: false, message: verificationResult.message }, { status: 401 });
    }

    // Create session payload
    const sessionPayload = {
      email,
      role,
      sub: verificationResult.subAdmin?.id || 'super-admin'
    };
    
    // Encrypt the session payload into a JWT
    const sessionToken = await encrypt(sessionPayload);
    
    // Set the token in an HTTP-only cookie
    const response = NextResponse.json({ success: true, message: 'Login successful' });
    response.cookies.set('session-token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour in seconds
      path: '/',
    });
    
    return response;

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
  }
}
