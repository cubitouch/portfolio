// src/useGmailAuth.ts
import { useEffect, useRef, useState, useCallback } from 'react';

// The new Identity Services script we need
const GIS_SRC = 'https://accounts.google.com/gsi/client';

interface UseGmailAuthOptions {
  clientId: string;
  scope?: string; // e.g. "https://www.googleapis.com/auth/gmail.readonly"
}

export function useGmailAuth({ clientId, scope }: UseGmailAuthOptions) {
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const tokenClientRef = useRef<google.accounts.oauth2.TokenClient | null>(null);

  // 1. Load the Google Identity Services script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = GIS_SRC;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // 2. After the script loads, init the Token Client
      tokenClientRef.current = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: scope || '',
        callback: (resp) => {
          if (resp.error) {
            console.error('Token client error:', resp.error);
            return;
          }
          setAccessToken(resp.access_token);
        },
      });
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clientId, scope]);

  // 3. signIn() triggers the pop-up flow to get an access token
  const signIn = useCallback(() => {
    if (!tokenClientRef.current) {
      console.warn('Token client not ready yet');
      return;
    }
    tokenClientRef.current.requestAccessToken();
  }, []);

  // 4. signOut() can revoke the token or simply clear our local state
  const signOut = useCallback(() => {
    if (!accessToken) return;
    // If you want to *actually* revoke the token on Google's side:
    google.accounts.oauth2.revoke(accessToken, () => {
      console.log('Access token revoked');
    });
    // Clear local state
    setAccessToken(null);
  }, [accessToken]);

  return {
    isLoading,
    accessToken,
    signIn,
    signOut,
  };
}
