import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";

export const commonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    padding: spacing.padding,
  },

  contentNoPadding: {
    flex: 1,
  },

  // Header styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.padding,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerTitle: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
  },

  headerSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  // Card styles - Modern design from reference
  card: {
    backgroundColor: colors.card,
    borderRadius: spacing.cardRadius,
    padding: spacing.cardPadding,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },

  cardHeader: {
    marginBottom: spacing.md,
  },

  cardTitle: {
    ...typography.h5,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  cardSubtitle: {
    ...typography.body2,
    color: colors.textSecondary,
  },

  // Button styles - Modern design from reference
  button: {
    backgroundColor: colors.buttonPrimary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.buttonRadius,
    alignItems: "center",
    justifyContent: "center",
    minHeight: spacing.buttonHeight,
    boxShadow: "0 4px 12px rgba(255, 59, 48, 0.3)",
  },

  buttonSecondary: {
    backgroundColor: colors.buttonSecondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.buttonRadius,
    alignItems: "center",
    justifyContent: "center",
    minHeight: spacing.buttonHeight,
    borderWidth: 1,
    borderColor: colors.border,
  },

  buttonDanger: {
    backgroundColor: colors.buttonDanger,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.buttonRadius,
    alignItems: "center",
    justifyContent: "center",
    minHeight: spacing.buttonHeight,
    boxShadow: "0 4px 12px rgba(255, 59, 48, 0.3)",
  },

  // Modern pill button from reference
  buttonPill: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 36,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    ...typography.button,
    color: colors.text,
  },

  buttonTextSecondary: {
    ...typography.button,
    color: colors.text,
  },

  buttonTextDanger: {
    ...typography.button,
    color: colors.text,
  },

  // Input styles
  inputContainer: {
    marginBottom: spacing.lg,
  },

  inputLabel: {
    ...typography.label,
    color: colors.text,
    marginBottom: spacing.sm,
  },

  input: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: spacing.inputRadius,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: colors.text,
    minHeight: spacing.inputHeight,
  },

  inputFocused: {
    borderColor: colors.inputFocus,
  },

  inputError: {
    borderColor: colors.error,
  },

  // Text styles
  text: {
    ...typography.body1,
    color: colors.text,
  },

  textSecondary: {
    ...typography.body2,
    color: colors.textSecondary,
  },

  textCaption: {
    ...typography.caption,
    color: colors.textSecondary,
  },

  textError: {
    ...typography.body2,
    color: colors.error,
  },

  textSuccess: {
    ...typography.body2,
    color: colors.success,
  },

  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  loadingText: {
    ...typography.body1,
    color: colors.textSecondary,
    marginTop: spacing.lg,
  },

  // Error styles
  errorContainer: {
    backgroundColor: colors.error + "20",
    padding: spacing.lg,
    borderRadius: spacing.radius,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: "center",
  },

  errorText: {
    ...typography.body2,
    color: colors.error,
    textAlign: "center",
  },

  // Divider styles
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },

  // Row styles
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Center styles
  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Flex styles
  flex1: {
    flex: 1,
  },

  flexRow: {
    flexDirection: "row",
  },

  flexColumn: {
    flexDirection: "column",
  },

  // Position styles
  absolute: {
    position: "absolute",
  },

  relative: {
    position: "relative",
  },

  // Shadow styles (web-compatible)
  shadow: {
    boxShadow: "0 2px 4px rgba(255, 255, 255, 0.1)",
    elevation: 3,
  },

  shadowLarge: {
    boxShadow: "0 4px 8px rgba(255, 255, 255, 0.15)",
    elevation: 6,
  },
});
