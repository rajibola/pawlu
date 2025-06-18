import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import ProductCard from "../components/ProductCard";

type ProductMedia = {
  url: string;
  conversions?: { "medium-square"?: string };
};

type ProductVariant = {
  price: { formatted: string };
};

type Product = {
  id: number;
  title: string;
  media: ProductMedia[];
  product_variants: ProductVariant[];
};

type PaginationMeta = {
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

const PLACEHOLDER_IMAGE = require("../assets/images/logo.png");
const API_URL = "https://pawlus.twinepos.dev/api/online/v1/products";

export type { PaginationMeta, Product };
export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageUrl, setPageUrl] = useState<string>(API_URL);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(pageUrl)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setProducts(data.data);
        setMeta(data.meta);
      })
      .catch(() => {
        if (isMounted) {
          setProducts([]);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [pageUrl]);

  const handlePageChange = useCallback(
    (url: string | null) => {
      if (url && url !== pageUrl) {
        setPageUrl(url);
      }
    },
    [pageUrl]
  );

  const renderProduct = useCallback(({ item }: { item: Product }) => {
    const image =
      item.media && item.media.length > 0
        ? item.media[0].conversions?.["medium-square"] || item.media[0].url
        : PLACEHOLDER_IMAGE;
    const price =
      item.product_variants && item.product_variants.length > 0
        ? item.product_variants[0].price.formatted
        : "-";
    return (
      <View style={{ width: "48%", marginBottom: 16 }}>
        <ProductCard image={image} name={item.title} price={price} />
      </View>
    );
  }, []);

  return {
    products,
    loading,
    meta,
    handlePageChange,
    renderProduct,
    apiUrl: API_URL,
  };
}
