import { ErrorProvider } from "@/context/ErrorContext";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import ErrorMessage from "../../shared/ErrorMessage";

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ErrorProvider>{ui}</ErrorProvider>);
};

describe("ErrorMessage", () => {
  it("renders nothing when no error is present", () => {
    const { queryByText } = renderWithProvider(<ErrorMessage />);
    expect(queryByText(/error/i)).toBeNull();
  });

  it("renders a message when provided via props", () => {
    const { getByText } = renderWithProvider(
      <ErrorMessage message="Something went wrong" />
    );
    expect(getByText("Something went wrong")).toBeTruthy();
  });

  it("renders a retry button and calls onRetry when pressed", () => {
    const onRetry = jest.fn();
    const { getByText } = renderWithProvider(
      <ErrorMessage message="Error!" onRetry={onRetry} />
    );
    const retryButton = getByText("Retry");
    fireEvent.press(retryButton);
    expect(onRetry).toHaveBeenCalled();
  });

  it("renders a dismiss button and clears the error when pressed", () => {
    const { getByText, queryByText } = renderWithProvider(
      <ErrorMessage message="Dismiss me!" />
    );
    const dismissButton = getByText("Dismiss");
    fireEvent.press(dismissButton);
    expect(queryByText("Dismiss me!")).toBeNull();
  });

  it("has accessibility role and label", () => {
    const { getByRole, getByLabelText } = renderWithProvider(
      <ErrorMessage message="Accessible error" />
    );
    expect(getByRole("alert")).toBeTruthy();
    expect(getByLabelText("Error message")).toBeTruthy();
  });
});
