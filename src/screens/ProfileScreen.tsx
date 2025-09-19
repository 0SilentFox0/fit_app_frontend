import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { ScreenWrapper, Card, Button } from "../components";
import { colors, spacing } from "../theme";

interface ProfileScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, signOut, sendEmailVerification, loading, error } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      console.error("Sign out error:", error);
    }
  };

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification();
    } catch (error: any) {
      console.error("Resend verification error:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <Text style={styles.subtitle}>Manage your account settings</Text>
          </View>

          <Card style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userEmail}>{user?.email}</Text>
                <View style={styles.verificationStatus}>
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: user?.emailVerified
                          ? colors.success
                          : colors.warning,
                      },
                    ]}
                  >
                    {user?.emailVerified ? "✓ Verified" : "⚠ Unverified"}
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          <Card style={styles.actionsCard}>
            <Text style={styles.sectionTitle}>Account Actions</Text>

            {!user?.emailVerified && (
              <Button
                title="Resend Verification Email"
                onPress={handleResendVerification}
                variant="secondary"
                style={styles.actionButton}
              />
            )}

            <Button
              title="Sign Out"
              onPress={handleSignOut}
              variant="danger"
              style={styles.actionButton}
            />
          </Card>

          {error && (
            <Card style={styles.errorCard}>
              <Text style={styles.errorText}>{error}</Text>
            </Card>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Fitness App v1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.padding,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.padding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  profileCard: {
    marginBottom: spacing.lg,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  userInfo: {
    flex: 1,
  },
  userEmail: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  verificationStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  actionsCard: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
  errorCard: {
    backgroundColor: colors.error + "20",
    borderColor: colors.error,
    marginBottom: spacing.lg,
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default ProfileScreen;
