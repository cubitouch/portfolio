// src/global.d.ts

declare global {
    namespace google.accounts.oauth2 {
      interface TokenClientConfig {
        client_id: string;
        scope: string;
        callback?: (response: TokenResponse) => void;
        error_callback?: (error: TokenError) => void;
        prompt?: '' | 'consent' | 'select_account';
      }
  
      interface TokenResponse {
        access_token: string;
        expires_in: number;
        token_type: string;
        scope: string;
        state?: string;
        error?: string;
      }
  
      interface TokenError {
        type: string;
        message: string;
      }
  
      interface TokenClient {
        requestAccessToken(options?: {
          prompt?: '' | 'consent' | 'select_account';
          state?: string;
        }): void;
        callback?: (response: TokenResponse) => void;
        error_callback?: (error: TokenError) => void;
      }
  
      function initTokenClient(config: TokenClientConfig): TokenClient;
      function revoke(accessToken: string, done?: () => void): void;
    }
  }
  
  // Make sure this file is treated as a module:
  export {};
  