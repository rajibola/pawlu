import { PaginationMeta, Product } from "@/types";
import { Link } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import ProductCard from "../components/ProductCard";
import {
  fetchProducts,
  formatProductForDisplay,
  type ApiError,
} from "../services";

export type { PaginationMeta, Product };

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageUrl, setPageUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchProducts(pageUrl || undefined)
      .then((response) => {
        if (!isMounted) return;
        setProducts(response.data);
        setMeta(response.meta);
      })
      .catch((error: ApiError) => {
        if (isMounted) {
          setProducts([]);
          setError(error.message);
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
      if (url !== pageUrl) {
        setPageUrl(url);
      }
    },
    [pageUrl]
  );

  const renderProduct = useCallback(({ item }: { item: Product }) => {
    const formattedProduct = formatProductForDisplay(item);
    return (
      <Link href={`/product/${item.slug}`} asChild>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ width: "48%", marginBottom: 16 }}
        >
          <ProductCard
            image={formattedProduct.image}
            name={formattedProduct.title}
            price={formattedProduct.price}
          />
        </TouchableOpacity>
      </Link>
    );
  }, []);

  return {
    products,
    loading,
    error,
    meta,
    handlePageChange,
    renderProduct,
    apiUrl: pageUrl,
  };
}
