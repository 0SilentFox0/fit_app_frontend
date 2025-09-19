import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Input } from "../components/ui/input/Input";
import { ThemeProvider } from "../ThemeProvider";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("Input Component", () => {
  it("renders correctly with label", () => {
    const onChangeText = jest.fn();
    const { getByText, getByPlaceholderText } = renderWithTheme(
      <Input
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={onChangeText}
      />
    );

    expect(getByText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Enter your email")).toBeTruthy();
  });

  it("calls onChangeText when text is entered", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <Input
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={onChangeText}
      />
    );

    const input = getByPlaceholderText("Enter your email");
    fireEvent.changeText(input, "test@example.com");
    expect(onChangeText).toHaveBeenCalledWith("test@example.com");
  });

  it("shows error message when error prop is provided", () => {
    const onChangeText = jest.fn();
    const { getByText } = renderWithTheme(
      <Input
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={onChangeText}
        error="Invalid email format"
      />
    );

    expect(getByText("Invalid email format")).toBeTruthy();
  });

  it("renders with secure text entry", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <Input
        label="Password"
        placeholder="Enter your password"
        value=""
        onChangeText={onChangeText}
        secureTextEntry={true}
      />
    );

    const input = getByPlaceholderText("Enter your password");
    expect(input.props.secureTextEntry).toBe(true);
  });

  it("renders with different keyboard types", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText, rerender } = renderWithTheme(
      <Input
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={onChangeText}
        keyboardType="email-address"
      />
    );

    let input = getByPlaceholderText("Enter your email");
    expect(input.props.keyboardType).toBe("email-address");

    rerender(
      <ThemeProvider>
        <Input
          label="Phone"
          placeholder="Enter your phone"
          value=""
          onChangeText={onChangeText}
          keyboardType="phone-pad"
        />
      </ThemeProvider>
    );

    input = getByPlaceholderText("Enter your phone");
    expect(input.props.keyboardType).toBe("phone-pad");
  });

  it("is disabled when disabled prop is true", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <Input
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={onChangeText}
        disabled={true}
      />
    );

    const input = getByPlaceholderText("Enter your email");
    expect(input.props.editable).toBe(false);
  });

  it("handles focus and blur events", () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <Input
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={onChangeText}
      />
    );

    const input = getByPlaceholderText("Enter your email");
    fireEvent(input, "focus");
    fireEvent(input, "blur");

    // The component should handle these events without crashing
    expect(input).toBeTruthy();
  });
});
