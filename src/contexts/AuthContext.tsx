import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
} from "firebase/auth";
import { Platform, Alert } from "react-native";
import { auth } from "../config/firebase";
import { AuthContextType, AuthState, AuthUser } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    pendingVerificationEmail: false,
  });

  // Configure Google Sign-In (disabled for Expo Go compatibility)
  // useEffect(() => {
  //   if (Platform.OS !== "web") {
  //     // Dynamically import GoogleSignin to avoid TurboModule error in Expo Go
  //     import("@react-native-google-signin/google-signin")
  //       .then(({ GoogleSignin }) => {
  //         GoogleSignin.configure({
  //           webClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
  //           offlineAccess: true,
  //         });
  //       })
  //       .catch((error) => {
  //         console.warn("Google Sign-In not available:", error);
  //       });
  //   }
  // }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const authUser = user as AuthUser;
        setState({
          user: authUser,
          loading: false,
          error: null,
          pendingVerificationEmail: !authUser.emailVerified,
        });
      } else {
        setState({
          user: null,
          loading: false,
          error: null,
          pendingVerificationEmail: false,
        });
      }
    });

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Send verification email
      await sendEmailVerification(userCredential.user);

      setState((prev) => ({
        ...prev,
        loading: false,
        pendingVerificationEmail: true,
      }));

      Alert.alert(
        "Verification Email Sent",
        "Please check your email and verify your account before signing in."
      );
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to create account",
      }));
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential.user.emailVerified) {
        await firebaseSignOut(auth);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Please verify your email before signing in",
        }));
        throw new Error("Please verify your email before signing in");
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        pendingVerificationEmail: false,
      }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to sign in",
      }));
      throw error;
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      if (Platform.OS === "web") {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } else {
        // Try to use Google Sign-In on mobile
        try {
          const { GoogleSignin } = await import(
            "@react-native-google-signin/google-signin"
          );
          await GoogleSignin.hasPlayServices();
          const { idToken } = await GoogleSignin.signIn();
          const googleCredential = GoogleAuthProvider.credential(idToken);
          await signInWithCredential(auth, googleCredential);
        } catch (importError) {
          // If Google Sign-In is not available, show a helpful message
          throw new Error(
            "Google Sign-In requires a development build. Please use email/password authentication or build the app with EAS Build."
          );
        }
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        pendingVerificationEmail: false,
      }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to sign in with Google",
      }));
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      // Google Sign-In is disabled in Expo Go, so no need to sign out from Google

      await firebaseSignOut(auth);

      // The auth state change listener should handle the state update
      setState({
        user: null,
        loading: false,
        error: null,
        pendingVerificationEmail: false,
      });
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to sign out",
      }));
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      await sendPasswordResetEmail(auth, email);

      setState((prev) => ({ ...prev, loading: false }));

      Alert.alert(
        "Password Reset Email Sent",
        "Please check your email for password reset instructions."
      );
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to send password reset email",
      }));
      throw error;
    }
  };

  const sendEmailVerification = async (): Promise<void> => {
    try {
      if (!auth.currentUser) {
        throw new Error("No user logged in");
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      await sendEmailVerification(auth.currentUser);

      setState((prev) => ({ ...prev, loading: false }));

      Alert.alert(
        "Verification Email Sent",
        "Please check your email and click the verification link."
      );
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to send verification email",
      }));
      throw error;
    }
  };

  const resendVerificationEmail = async (): Promise<void> => {
    try {
      if (!auth.currentUser) {
        throw new Error("No user logged in");
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      await sendEmailVerification(auth.currentUser);

      setState((prev) => ({ ...prev, loading: false }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to resend verification email",
      }));
      throw error;
    }
  };

  const clearError = (): void => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    ...state,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    sendEmailVerification,
    resendVerificationEmail,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
