import { Product, ProductVariant } from "@/types";
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
  loading: boolean;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
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
          setCart(JSON.parse(storedCart));
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

  return (
    <CartContext.Provider value={{ cart, addToCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};
