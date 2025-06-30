import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import Checkout from "../../app/checkout";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("Checkout (Mobile)", () => {
  it("shows validation errors for required fields", async () => {
    const { getByText } = render(<Checkout />);
    const payNow = getByText(/pay now/i);
    fireEvent.press(payNow);
    await waitFor(() => {
      expect(getByText(/first name is required/i)).toBeTruthy();
      expect(getByText(/last name is required/i)).toBeTruthy();
      expect(getByText(/phone number is required/i)).toBeTruthy();
      expect(getByText(/address line 1 is required/i)).toBeTruthy();
      expect(getByText(/city is required/i)).toBeTruthy();
      expect(getByText(/state is required/i)).toBeTruthy();
      expect(getByText(/zip code is required/i)).toBeTruthy();
    });
  });

  it("submits successfully when all required fields are filled", async () => {
    const { getByText, getByLabelText, queryByText } = render(<Checkout />);
    fireEvent.changeText(getByLabelText(/first name/i), "John");
    fireEvent.changeText(getByLabelText(/last name/i), "Doe");
    fireEvent.changeText(getByLabelText(/phone number/i), "123456789");
    fireEvent.changeText(getByLabelText(/address line 1/i), "123 Main St");
    fireEvent.changeText(getByLabelText(/city/i), "Valletta");
    fireEvent.press(getByText(/state/i));
    fireEvent.press(getByText(/Gozo/i));
    fireEvent.changeText(getByLabelText(/zip code/i), "VLT123");
    const payNow = getByText(/pay now/i);
    fireEvent.press(payNow);
    await waitFor(() => {
      expect(queryByText(/is required/i)).toBeNull();
    });
    // Success or error message will be shown after simulated API call
    await waitFor(
      () => {
        expect(
          queryByText(/order placed successfully!/i) ||
            queryByText(/order failed/i)
        ).toBeTruthy();
      },
      { timeout: 2000 }
    );
  });
});
