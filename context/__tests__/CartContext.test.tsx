import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CartItem, CartProvider, useCart } from "../CartContext";
import { product, variants } from "./fixtures";

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

const TestConsumer = ({
  onCartChange,
}: {
  onCartChange?: (cart: any) => void;
}) => {
  const { cart, addToCart, updateQuantity, removeFromCart, getCartTotal } =
    useCart();

  React.useEffect(() => {
    onCartChange?.(cart);
  }, [cart, onCartChange]);

  return (
    <View>
      <Text testID="total">{getCartTotal()}</Text>
      <TouchableOpacity
        onPress={() =>
          addToCart({ product, variant: variants[0], quantity: 1 })
        }
      >
        Add Item 1
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          addToCart({ product, variant: variants[1], quantity: 2 })
        }
      >
        Add Item 2
      </TouchableOpacity>
      <TouchableOpacity onPress={() => updateQuantity(variants[0].id, 5)}>
        Update Item 1
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeFromCart(variants[0].id)}>
        Remove Item 1
      </TouchableOpacity>
    </View>
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
        <TestConsumer />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByText("Add Item 1"));
    });

    expect(getByTestId("total").props.children).toBe(7.5); // Assuming the price of the first variant is 7.50
  });

  it("increases quantity of an existing item", async () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByText("Add Item 1"));
    });
    await act(async () => {
      fireEvent.press(getByText("Add Item 1"));
    });

    expect(getByTestId("total").props.children).toBe(15); // 2*7.50
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
        <TestConsumer />
      </CartProvider>
    );

    const total = await findByTestId("total");
    expect(total.props.children).toBe(50); // 5*10.00
  });

  it("saves cart to storage on change", async () => {
    const { getByText } = render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByText("Add Item 1"));
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "cart",
      expect.any(String)
    );
  });

  it("should calculate total correctly", async () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByText("Add Item 1"));
    });

    await act(async () => {
      fireEvent.press(getByText("Add Item 2"));
    });

    expect(getByTestId("total").props.children).toBe(22.5); // 1*7.50 + 2*7.50
  });

  it("should update quantity of an item", async () => {
    const onCartChange = jest.fn();
    const { getByText } = render(
      <CartProvider>
        <TestConsumer onCartChange={onCartChange} />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByText("Add Item 1"));
    });

    await act(async () => {
      fireEvent.press(getByText("Update Item 1"));
    });

    const finalCart =
      onCartChange.mock.calls[onCartChange.mock.calls.length - 1][0];
    expect(finalCart[0].quantity).toBe(5);
  });

  it("should remove an item from the cart", async () => {
    const onCartChange = jest.fn();
    const { getByText } = render(
      <CartProvider>
        <TestConsumer onCartChange={onCartChange} />
      </CartProvider>
    );

    await act(async () => {
      fireEvent.press(getByText("Add Item 1"));
    });

    await act(async () => {
      fireEvent.press(getByText("Remove Item 1"));
    });

    const finalCart =
      onCartChange.mock.calls[onCartChange.mock.calls.length - 1][0];
    expect(finalCart.length).toBe(0);
  });
});
