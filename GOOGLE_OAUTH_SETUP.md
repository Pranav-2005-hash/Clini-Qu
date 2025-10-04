# Google OAuth Setup Instructions

## Setting up Google OAuth for Clini-Q

### Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API

### Step 2: Create OAuth 2.0 Credentials

1. In the Google Cloud Console, go to "Credentials" in the left sidebar
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Set the following:
   - **Name**: Clini-Q Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (for development)
     - `http://localhost:5173` (for your current dev port)
   - **Authorized redirect URIs**: 
     - `http://localhost:3000/api/auth/callback/google`
     - `http://localhost:5173/api/auth/callback/google`

### Step 3: Update Environment Variables

1. Copy your Client ID and Client Secret from Google Cloud Console
2. Update your `.env.local` file:

```env
# Replace these placeholder values with your actual Google OAuth credentials
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
```

### Step 4: Test Google OAuth

1. Start your development server: `npm run dev`
2. Go to the login or signup page
3. Click the "Google" button
4. You should be redirected to Google for authentication
5. After successful authentication, you'll be redirected back to your app

### Troubleshooting

- **Error: "redirect_uri_mismatch"**: Make sure the redirect URI in Google Cloud Console exactly matches the one being used
- **Error: "invalid_client"**: Check that your Client ID and Client Secret are correct
- **Error: "access_denied"**: The user cancelled the OAuth flow or there's a permission issue

### Production Setup

When deploying to production:
1. Add your production domain to the authorized origins and redirect URIs
2. Use environment variables on your hosting platform to set the Google OAuth credentials
3. Never commit your actual credentials to version control

## Current Status

🔧 **Google OAuth is temporarily disabled** until you provide real credentials
⚠️  **Action Required**: Follow the steps above to get real Google OAuth credentials

### After Getting Real Credentials:

1. **Update .env.local**:
   ```env
   GOOGLE_CLIENT_ID=your_actual_client_id_from_google
   GOOGLE_CLIENT_SECRET=your_actual_client_secret_from_google
   ```

2. **Enable Google Provider in lib/auth.ts**:
   - Uncomment the GoogleProvider lines (currently commented out)

3. **Enable Google Buttons**:
   - Remove `disabled={true}` and `opacity-50 cursor-not-allowed` from login/signup pages
   - Add back the `onClick` handlers

### Quick Test Steps:
1. Get credentials from Google Cloud Console
2. Update the environment variables
3. Restart your dev server: `npm run dev`
4. Google login should work!
