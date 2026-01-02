// src/lib/auth.ts
import { jwtVerify, SignJWT } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY || 'h9F3kL2P8sQ7XvR5MZ4A6WcEJYB1D0Tn');

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h') // Token expires in 1 hour
    .sign(secretKey);
}

export async function verifyAuth(token: string | undefined): Promise<any> {
    if (!token) {
        throw new Error('Missing user token');
    }
    try {
        const verified = await jwtVerify(token, secretKey, {
            algorithms: ['HS256'],
        });
        return verified.payload;
    } catch (err) {
        throw new Error('Your token has expired.');
    }
}
