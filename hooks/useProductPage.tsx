import { useCart } from "@/context/CartContext";
import useProductDetail from "@/hooks/useProductDetail";
import { Option, ProductVariant } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

export function useProductPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { product, loading, error } = useProductDetail(slug || "");
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    if (product && product.product_variants.length > 0) {
      setPrice(product.product_variants[0].price.formatted);
    }
  }, [product]);

  const options = useMemo(() => {
    if (!product || !product.product_variants) return [];
    const allOptions: Record<string, Option> = {};
    product.product_variants.forEach((variant: ProductVariant) => {
      if (variant.variant_type_options) {
        variant.variant_type_options.forEach((ov) => {
          if (!allOptions[ov.variant_type.id]) {
            allOptions[ov.variant_type.id] = {
              id: ov.variant_type.id,
              name: ov.variant_type.name,
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
            if (ov.variant_type.id === opt.id && !seenValues.has(ov.id)) {
              values.push({
                id: ov.id,
                name: ov.value,
                value: ov.value,
              });
              seenValues.add(ov.id);
            }
          });
        }
      });
      return { ...opt, option_values: values };
    });

    return finalOptions;
  }, [product]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;

    const allOptionsSelected =
      options.length > 0 &&
      Object.keys(selectedOptions).length === options.length;

    if (!allOptionsSelected && options.length > 0) {
      return null;
    }

    if (
      Object.keys(selectedOptions).length === 0 &&
      product.product_variants.length > 0 &&
      options.length > 0
    ) {
      return null;
    }

    const variant = product.product_variants.find((variant: ProductVariant) =>
      Object.entries(selectedOptions).every(([optionId, valueId]) =>
        variant.variant_type_options.some(
          (ov) => ov.id === valueId && ov.variant_type.id === parseInt(optionId)
        )
      )
    );

    return variant || product.product_variants[0];
  }, [product, selectedOptions, options]);

  useEffect(() => {
    if (selectedVariant) {
      setPrice(selectedVariant.price.formatted);
    }
  }, [selectedVariant]);

  const handleOptionSelect = (optionId: number, valueId: number) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
  };

  const handleAddToCart = () => {
    if (!product) return;

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
    price,
  };
}
