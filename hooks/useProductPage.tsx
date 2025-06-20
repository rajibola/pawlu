import { useCart } from "@/context/CartContext";
import useProductDetail from "@/hooks/useProductDetail";
import { Option, ProductVariant } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert } from "react-native";

export function useProductPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { product, loading, error } = useProductDetail(slug || "");
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, number>
  >({});

  const options = useMemo(() => {
    if (!product || !product.product_variants) return [];
    const allOptions: Record<string, Option> = {};
    product.product_variants.forEach((variant: ProductVariant) => {
      if (variant.variant_type_options) {
        variant.variant_type_options.forEach((ov) => {
          if (!allOptions[ov.option_id]) {
            allOptions[ov.option_id] = {
              id: ov.option_id,
              name: ov.name,
              option_values: [],
            };
          }
        });
      }
    });

    const finalOptions = Object.values(allOptions).map((opt) => {
      const values: any[] = [];
      const seenValues = new Set();
      product.product_variants.forEach((variant: ProductVariant) => {
        if (variant.variant_type_options) {
          variant.variant_type_options.forEach((ov) => {
            if (ov.option_id === opt.id && !seenValues.has(ov.id)) {
              values.push(ov);
              seenValues.add(ov.id);
            }
          });
        }
      });
      return { ...opt, option_values: values };
    });

    return finalOptions;
  }, [product]);

  const handleOptionSelect = (optionId: number, valueId: number) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
  };

  const handleAddToCart = () => {
    if (!product) return;

    const selectedVariant = product.product_variants.find(
      (variant: ProductVariant) =>
        Object.entries(selectedOptions).every(([optionId, valueId]) =>
          variant.variant_type_options.some(
            (ov) => ov.id === valueId && ov.option_id === parseInt(optionId)
          )
        )
    );

    if (options.length > 0 && !selectedVariant) {
      Alert.alert("Please select all options");
      return;
    }

    const variantToAdd = selectedVariant || product.product_variants[0];

    if (variantToAdd) {
      addToCart({ product, variant: variantToAdd, quantity });
      Alert.alert("Success", "Product added to cart!");
    } else {
      Alert.alert("Error", "This product variation is not available.");
    }
  };

  return {
    product,
    loading,
    error,
    options,
    quantity,
    setQuantity,
    selectedOptions,
    handleOptionSelect,
    handleAddToCart,
  };
}
