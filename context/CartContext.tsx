import { Product, ProductVariant } from "@/types";
import { getNumericPrice } from "@/utils/price";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  removeFromCart: (variantId: number) => void;
  getCartTotal: () => number;
  loading: boolean;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  getCartTotal: () => 0,
  loading: true,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        let storedCart;
        if (Platform.OS === "web") {
          storedCart = localStorage.getItem("cart");
        } else {
          storedCart = await AsyncStorage.getItem("cart");
        }
        if (storedCart) {
          const parsed = JSON.parse(storedCart);
          if (Array.isArray(parsed)) {
            setCart(parsed);
          } else {
            setCart([]); // fallback to empty array if corrupted
          }
        }
      } catch (error) {
        console.error("Failed to load cart from storage", error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        const stringifiedCart = JSON.stringify(cart);
        if (Platform.OS === "web") {
          localStorage.setItem("cart", stringifiedCart);
        } else {
          await AsyncStorage.setItem("cart", stringifiedCart);
        }
      } catch (error) {
        console.error("Failed to save cart to storage", error);
      }
    };
    if (!loading) {
      saveCart();
    }
  }, [cart, loading]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.variant.id === newItem.variant.id
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      } else {
        return [...prevCart, newItem];
      }
    });
  };

  const updateQuantity = (variantId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.variant.id === variantId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (variantId: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.variant.id !== variantId)
    );
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) =>
        total + getNumericPrice(item.variant.price.formatted) * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        loading,
        updateQuantity,
        removeFromCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
