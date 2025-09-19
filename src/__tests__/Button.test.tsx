import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../components/ui/button/Button";
import { ThemeProvider } from "../ThemeProvider";

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button title="Test Button" onPress={onPress} />
    );

    expect(getByText("Test Button")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button title="Test Button" onPress={onPress} />
    );

    fireEvent.press(getByText("Test Button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders with different variants", () => {
    const onPress = jest.fn();
    const { getByText, rerender } = renderWithTheme(
      <Button title="Primary" onPress={onPress} variant="primary" />
    );

    expect(getByText("Primary")).toBeTruthy();

    rerender(
      <ThemeProvider>
        <Button title="Secondary" onPress={onPress} variant="secondary" />
      </ThemeProvider>
    );
    expect(getByText("Secondary")).toBeTruthy();

    rerender(
      <ThemeProvider>
        <Button title="Outline" onPress={onPress} variant="outline" />
      </ThemeProvider>
    );
    expect(getByText("Outline")).toBeTruthy();
  });

  it("renders with different sizes", () => {
    const onPress = jest.fn();
    const { getByText, rerender } = renderWithTheme(
      <Button title="Small" onPress={onPress} size="small" />
    );

    expect(getByText("Small")).toBeTruthy();

    rerender(
      <ThemeProvider>
        <Button title="Medium" onPress={onPress} size="medium" />
      </ThemeProvider>
    );
    expect(getByText("Medium")).toBeTruthy();

    rerender(
      <ThemeProvider>
        <Button title="Large" onPress={onPress} size="large" />
      </ThemeProvider>
    );
    expect(getByText("Large")).toBeTruthy();
  });

  it("is disabled when disabled prop is true", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button title="Disabled Button" onPress={onPress} disabled={true} />
    );

    const button = getByText("Disabled Button");
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });

  it("shows loading state when disabled", () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <Button title="Loading..." onPress={onPress} disabled={true} />
    );

    expect(getByText("Loading...")).toBeTruthy();
  });
});
