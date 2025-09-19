import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { ScreenWrapper, Button, Card } from "../components";
import { colors, spacing } from "../theme";

const EmailVerificationScreen: React.FC = () => {
  const { user, resendVerificationEmail, signOut, loading } = useAuth();
  const [resending, setResending] = useState(false);

  const handleResendEmail = async () => {
    if (!user?.email) return;

    setResending(true);
    try {
      await resendVerificationEmail();
      Alert.alert(
        "Verification Email Sent",
        "Please check your email and click the verification link."
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setResending(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Verify Your Email</Text>
            <Text style={styles.subtitle}>
              We've sent a verification link to:
            </Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>

          <Card style={styles.messageCard}>
            <Text style={styles.messageText}>
              Please check your email and click the verification link to
              activate your account.
            </Text>
          </Card>

          <View style={styles.actions}>
            <Button
              title="Resend Email"
              onPress={handleResendEmail}
              loading={resending}
              disabled={loading || resending}
              style={styles.resendButton}
            />

            <Button
              title="Sign Out"
              onPress={handleSignOut}
              variant="secondary"
              loading={loading}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.padding,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xxxl,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  email: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    textAlign: "center",
  },
  messageCard: {
    marginBottom: spacing.xxxl,
  },
  messageText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  actions: {
    gap: spacing.md,
  },
  resendButton: {
    marginBottom: spacing.sm,
  },
});

export default EmailVerificationScreen;
