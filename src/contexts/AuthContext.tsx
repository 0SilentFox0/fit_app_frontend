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
import { GoogleSignin } from "@react-native-google-signin/google-signin";
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

  // Configure Google Sign-In
  useEffect(() => {
    if (Platform.OS !== "web") {
      GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
        offlineAccess: true,
      });
    }
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🟢 AUTH STATE CHANGE: Triggered");
      console.log(
        "🟢 AUTH STATE CHANGE: User:",
        user ? `${user.email} (verified: ${user.emailVerified})` : "null"
      );
      console.log("🟢 AUTH STATE CHANGE: Timestamp:", new Date().toISOString());

      if (user) {
        const authUser = user as AuthUser;
        console.log("🟢 AUTH STATE CHANGE: Setting user as signed in");
        setState({
          user: authUser,
          loading: false,
          error: null,
          pendingVerificationEmail: !authUser.emailVerified,
        });
        console.log("🟢 AUTH STATE CHANGE: User state updated - signed in");
      } else {
        console.log("🟢 AUTH STATE CHANGE: Setting user as signed out");
        setState({
          user: null,
          loading: false,
          error: null,
          pendingVerificationEmail: false,
        });
        console.log("🟢 AUTH STATE CHANGE: User state updated - signed out");
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
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = GoogleAuthProvider.credential(idToken);
        await signInWithCredential(auth, googleCredential);
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
      console.log("🔴 AUTH CONTEXT: Starting sign out process...");
      console.log(
        "🔴 AUTH CONTEXT: Current user before sign out:",
        state.user?.email || "No user"
      );
      console.log("🔴 AUTH CONTEXT: Platform:", Platform.OS);

      setState((prev) => ({ ...prev, loading: true, error: null }));
      console.log("🔴 AUTH CONTEXT: Set loading to true");

      if (Platform.OS !== "web") {
        console.log("🔴 AUTH CONTEXT: Signing out from Google...");
        await GoogleSignin.signOut();
        console.log("🔴 AUTH CONTEXT: Google sign out completed");
      } else {
        console.log("🔴 AUTH CONTEXT: Skipping Google sign out (web platform)");
      }

      console.log("🔴 AUTH CONTEXT: Signing out from Firebase...");
      await firebaseSignOut(auth);
      console.log("🔴 AUTH CONTEXT: Firebase sign out completed");

      // The auth state change listener should handle the state update
      // But let's also set it manually as a fallback
      console.log("🔴 AUTH CONTEXT: Setting state to signed out manually...");
      setState({
        user: null,
        loading: false,
        error: null,
        pendingVerificationEmail: false,
      });
      console.log("🔴 AUTH CONTEXT: Manual state update completed");
      console.log("🔴 AUTH CONTEXT: Sign out process completed successfully");
    } catch (error: any) {
      console.error("🔴 AUTH CONTEXT: Sign out error:", error);
      console.error("🔴 AUTH CONTEXT: Error message:", error.message);
      console.error("🔴 AUTH CONTEXT: Error stack:", error.stack);
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
