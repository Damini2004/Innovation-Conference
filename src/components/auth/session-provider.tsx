// src/components/auth/session-provider.tsx
'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useToast } from '@/hooks/use-toast';

const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function SessionProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { toast } = useToast();

    const checkSession = React.useCallback(async () => {
        try {
            const res = await fetch('/api/auth/revalidate');
            if (!res.ok) {
                toast({
                    title: "Session Expired",
                    description: "You have been logged out due to inactivity.",
                    variant: "destructive"
                });
                router.push('/login');
            }
        } catch (error) {
            console.error("Session check failed", error);
            // Optional: redirect even on network error
            toast({
                title: "Connection Error",
                description: "Could not verify session. Please log in again.",
                variant: "destructive"
            });
            router.push('/login');
        }
    }, [router, toast]);


    React.useEffect(() => {
        // Check session immediately on mount
        checkSession();
        
        // And then check periodically
        const intervalId = setInterval(checkSession, SESSION_CHECK_INTERVAL);

        return () => clearInterval(intervalId);
    }, [checkSession]);

    return <>{children}</>;
}
