// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: string;
    provider: string;
    avatar: string;
    accessToken: string;
    refreshToken: string;
  }
}

export {};
