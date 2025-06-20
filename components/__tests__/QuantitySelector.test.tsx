import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import QuantitySelector from "../QuantitySelector";

describe("QuantitySelector", () => {
  const mockSetQuantity = jest.fn();

  beforeEach(() => {
    mockSetQuantity.mockClear();
  });

  it("renders with initial quantity", () => {
    const { getByDisplayValue } = render(
      <QuantitySelector quantity={5} setQuantity={mockSetQuantity} />
    );

    expect(getByDisplayValue("5")).toBeTruthy();
  });

  it("increases quantity when increment button is pressed", () => {
    const { getByLabelText } = render(
      <QuantitySelector quantity={1} setQuantity={mockSetQuantity} />
    );

    const incrementButton = getByLabelText("Increase quantity");
    fireEvent.press(incrementButton);

    expect(mockSetQuantity).toHaveBeenCalledWith(2);
  });

  it("decreases quantity when decrement button is pressed", () => {
    const { getByLabelText } = render(
      <QuantitySelector quantity={3} setQuantity={mockSetQuantity} />
    );

    const decrementButton = getByLabelText("Decrease quantity");
    fireEvent.press(decrementButton);

    expect(mockSetQuantity).toHaveBeenCalledWith(2);
  });

  it("does not decrease below 1", () => {
    const { getByLabelText } = render(
      <QuantitySelector quantity={1} setQuantity={mockSetQuantity} />
    );

    const decrementButton = getByLabelText("Decrease quantity");
    fireEvent.press(decrementButton);

    expect(mockSetQuantity).toHaveBeenCalledWith(1);
  });

  it("has proper accessibility props", () => {
    const { getByLabelText } = render(
      <QuantitySelector quantity={1} setQuantity={mockSetQuantity} />
    );

    expect(getByLabelText("Quantity input")).toBeTruthy();
    expect(getByLabelText("Increase quantity")).toBeTruthy();
    expect(getByLabelText("Decrease quantity")).toBeTruthy();
  });
});
