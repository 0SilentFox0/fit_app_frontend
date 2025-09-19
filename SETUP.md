# Setup Guide

## Quick Start

1. **Set up environment variables** - Create a `.env` file in the root directory with your Firebase credentials:

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google OAuth
EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret
```

2. **Start the development server**:

```bash
npm start
```

3. **Build for web**:

```bash
npm run build:web
```

4. **Build for mobile**:

```bash
npm run build:all
```

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication with Email/Password and Google providers
4. Copy your Firebase config values to the `.env` file

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add your app's bundle identifier and web domain
4. Copy the client ID to your `.env` file

## Testing

The app includes all authentication flows:

- ✅ Sign Up with email verification
- ✅ Sign In with email verification check
- ✅ Google OAuth login
- ✅ Password reset
- ✅ Email verification
- ✅ Profile management
- ✅ Secure logout

## Troubleshooting

If you encounter the Expo SDK version error:

- The project is configured for SDK 53
- Use `npx expo start` to run in development mode
- For mobile testing, use the iOS Simulator or Android Emulator
- The web version works independently of the mobile SDK version
