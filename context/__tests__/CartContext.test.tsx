import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { CartItem, CartProvider, useCart } from "../CartContext";

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

const mockProduct: any = {
  id: 1,
  title: "Test Product",
  product_variants: [{ id: 101, price: { formatted: "€10.00" } }],
};

const mockVariant: any = { id: 101, price: { formatted: "€10.00" } };

const TestComponent = () => {
  const { cart, addToCart } = useCart();
  return (
    <>
      <Text testID="cart-count">{cart.length}</Text>
      <Text testID="item-quantity">{cart[0]?.quantity || 0}</Text>
      <TouchableOpacity
        onPress={() =>
          addToCart({ product: mockProduct, variant: mockVariant, quantity: 1 })
        }
      >
        <Text>Add to Cart</Text>
      </TouchableOpacity>
    </>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    (AsyncStorage.getItem as jest.Mock).mockClear();
    (AsyncStorage.setItem as jest.Mock).mockClear();
  });

  it("adds a new item to the cart", async () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByText("Add to Cart"));
    });

    expect(getByTestId("cart-count").props.children).toBe(1);
    expect(getByTestId("item-quantity").props.children).toBe(1);
  });

  it("increases quantity of an existing item", async () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByText("Add to Cart"));
    });
    await act(async () => {
      fireEvent.press(getByText("Add to Cart"));
    });

    expect(getByTestId("cart-count").props.children).toBe(1); // Still 1 item in cart array
    expect(getByTestId("item-quantity").props.children).toBe(2);
  });

  it("loads cart from storage", async () => {
    const mockCart: CartItem[] = [
      { product: mockProduct, variant: mockVariant, quantity: 5 },
    ];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify(mockCart)
    );

    const { findByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const quantity = await findByTestId("item-quantity");
    expect(quantity.props.children).toBe(5);
  });

  it("saves cart to storage on change", async () => {
    const { getByText } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByText("Add to Cart"));
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "cart",
      expect.any(String)
    );
  });
});
