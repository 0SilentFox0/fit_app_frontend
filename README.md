# FitApp - Complete Fitness App with Firebase Auth & ExerciseDB

A comprehensive React Native/Expo fitness application featuring Firebase Authentication, ExerciseDB API integration, and a modern dark theme interface.

## Features

### Authentication Flows

- ✅ **Sign Up (Email/Password)** - Create new accounts with email verification
- ✅ **Sign In (Email/Password)** - Authenticate users with email verification check
- ✅ **Google OAuth Login** - Sign in with Google (bypasses email verification)
- ✅ **Forgot Password** - Password reset via email
- ✅ **Email Verification** - Required for email/password accounts
- ✅ **Logout** - Secure sign out with state cleanup

### Fitness Features

- ✅ **Dashboard** - Main screen with user stats and quick actions
- ✅ **Exercises Tab** - Browse exercises grouped by muscle groups
- ✅ **Exercise Images** - High-quality exercise demonstration images
- ✅ **ExerciseDB API** - Real-time exercise data from ExerciseDB
- ✅ **Muscle Group Filtering** - Exercises organized by target muscles
- ✅ **Exercise Details** - Detailed exercise information and instructions

### Security Features

- 🔒 **Email Verification Enforcement** - Unverified users cannot access protected routes
- 🔒 **Session Persistence** - Users stay logged in across app reloads
- 🔒 **Route Protection** - Automatic redirection based on auth state
- 🔒 **Secure Token Handling** - Firebase handles token management

### User Experience

- 📱 **Responsive Design** - Works on mobile and web
- ⚡ **Loading States** - Proper loading indicators throughout
- 🎨 **Dark Theme** - Modern dark theme for better user experience
- 🔄 **Error Handling** - User-friendly error messages
- 📧 **Email Verification Flow** - Clear instructions and resend options
- 🏋️ **Tab Navigation** - Easy navigation between Dashboard, Exercises, and Profile

## Project Structure

```
src/
├── components/
│   ├── LoadingScreen.tsx      # Loading component
│   └── ProtectedRoute.tsx     # Route protection wrapper
├── contexts/
│   └── AuthContext.tsx        # Authentication context provider
├── hooks/
│   ├── useAuth.ts            # Main authentication hook
│   └── index.ts              # Hook exports
├── navigation/
│   ├── AppNavigator.tsx      # Main navigation setup
│   └── MainTabNavigator.tsx  # Tab navigation
├── screens/
│   ├── LoginScreen.tsx       # Sign in screen
│   ├── SignUpScreen.tsx      # Registration screen
│   ├── ForgotPasswordScreen.tsx # Password reset
│   ├── EmailVerificationScreen.tsx # Email verification
│   ├── ProfileScreen.tsx     # User profile
│   ├── DashboardScreen.tsx   # Main dashboard
│   ├── ExercisesScreen.tsx   # Exercises browser
│   └── index.ts              # Screen exports
├── services/
│   ├── api.ts                # General API service
│   └── exerciseApi.ts        # ExerciseDB API service
├── config/
│   └── firebase.ts           # Firebase configuration
└── types/
    └── auth.ts               # TypeScript type definitions
```

## Setup

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google OAuth
EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Email/Password and Google providers
3. Configure your domain for web deployment
4. Add your app's bundle identifier for mobile

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add your app's bundle identifier and web domain
4. Copy the client ID to your environment variables

## Usage

### Authentication Hook

```typescript
import { useAuth } from "./src/hooks/useAuth";

function MyComponent() {
  const { user, loading, signIn, signUp, signOut } = useAuth();

  // Use authentication state and methods
}
```

### Protected Routes

```typescript
import ProtectedRoute from "./src/components/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <YourProtectedComponent />
    </ProtectedRoute>
  );
}
```

## Build & Deploy

### Web Deployment

```bash
npm run build:web
npm run deploy:web
```

### Mobile Build

```bash
npm run build:android
npm run build:ios
npm run build:all
```

### All Platforms

```bash
./deploy.sh all
```

## Authentication Flow

1. **Unauthenticated User** → Login/SignUp screens
2. **Sign Up** → Email verification required
3. **Email Verification** → User must verify email
4. **Verified User** → Access to protected routes
5. **Google Sign In** → Immediate access (no verification needed)

## Security Considerations

- Email verification is enforced for email/password accounts
- Google OAuth users bypass email verification
- Session tokens are managed securely by Firebase
- All authentication state is handled through React Context
- Route protection prevents unauthorized access

## Error Handling

The app includes comprehensive error handling:

- Network errors
- Invalid credentials
- Email verification requirements
- Firebase authentication errors
- User-friendly error messages

## Testing

Test all authentication flows:

1. Sign up with email/password
2. Verify email before signing in
3. Sign in with verified account
4. Test Google OAuth
5. Test password reset
6. Test logout functionality

## Dependencies

- React Native / Expo
- Firebase Authentication
- React Navigation
- Google Sign-In
- AsyncStorage (for persistence)
