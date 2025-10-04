# Enable Google OAuth - Quick Guide

## When You Have Google OAuth Credentials

### 1. Update .env.local
Replace the commented lines with your real credentials:
```env
# Google OAuth
GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_client_secret_here
```

### 2. Enable Google Provider in lib/auth.ts
Uncomment these lines (around line 17-21):
```typescript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
}),
```

### 3. Add Google Button Back to Login Page (app/login/page.tsx)
Replace the comment on line 201 with:
```jsx
<div className="relative my-6">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-pink-100"></div>
  </div>
  <div className="relative flex justify-center text-sm">
    <span className="px-2 bg-white/80 text-gray-500">{t('auth.continueWith')}</span>
  </div>
</div>

<div className="grid grid-cols-2 gap-3">
  <Button 
    variant="outline" 
    className="bg-white border-pink-200 text-gray-700 hover:bg-pink-50"
    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
    disabled={isLoading}
  >
    <svg className="h-5 w-5 mr-2" aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60999L5.27028 9.70496C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
      <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
      <path d="M5.265 14.2949C5.015 13.5699 4.87 12.7999 4.87 11.9999C4.87 11.1999 5.02 10.4299 5.27 9.7049L1.28 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.265 14.2949Z" fill="#FBBC05"/>
      <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.9351 20.0054 21.0951L16.2904 18.18C15.2304 18.9351 13.8504 19.4001 12.2354 19.4001C9.10037 19.4001 6.46041 17.1801 5.57041 14.29L1.64038 17.45C3.63038 21.44 7.50037 24.0001 12.0004 24.0001Z" fill="#34A853"/>
    </svg>
    {t('auth.google')}
  </Button>
  <Button variant="outline" className="bg-white border-pink-200 text-gray-700 hover:bg-pink-50">
    <svg className="h-5 w-5 mr-2 text-blue-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
    </svg>
    {t('auth.facebook')}
  </Button>
</div>
```

### 4. Add Google Button Back to Signup Page (app/signup/page.tsx)
Replace the comment on line 201 with the same code as above, but change the callback URL:
```jsx
onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
```

### 5. Restart Dev Server
```bash
npm run dev
```

## Current Status: ✅ Clean Login/Signup Without Google

Your app now works perfectly for email/password authentication without any Google OAuth errors!