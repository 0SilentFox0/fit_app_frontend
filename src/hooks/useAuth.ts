import { useAuth as useAuthContext } from "../contexts/AuthContext";
import { AuthContextType } from "../types/auth";

// Re-export the useAuth hook from context for easier imports
export const useAuth = (): AuthContextType => useAuthContext();

// Additional utility hooks can be added here
export const useAuthState = () => {
  const { user, loading, error, pendingVerificationEmail } = useAuth();
  return { user, loading, error, pendingVerificationEmail };
};

export const useAuthActions = () => {
  const {
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    sendEmailVerification,
    clearError,
  } = useAuth();

  return {
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    sendEmailVerification,
    clearError,
  };
};
