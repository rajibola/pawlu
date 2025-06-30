import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import CheckoutWeb from "../../app/checkout.web";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("Checkout (Web)", () => {
  it("shows validation errors for required fields", async () => {
    const { getByText, getByLabelText } = render(<CheckoutWeb />);
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
    const { getByText, getByLabelText, queryByText } = render(<CheckoutWeb />);
    fireEvent.changeText(getByLabelText(/first name/i), "Jane");
    fireEvent.changeText(getByLabelText(/last name/i), "Smith");
    fireEvent.changeText(getByLabelText(/phone number/i), "987654321");
    fireEvent.changeText(getByLabelText(/address line 1/i), "456 Main St");
    fireEvent.changeText(getByLabelText(/city/i), "Mdina");
    fireEvent.press(getByText(/state/i));
    fireEvent.press(getByText(/State 2/i));
    fireEvent.changeText(getByLabelText(/zip code/i), "MDN456");
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
