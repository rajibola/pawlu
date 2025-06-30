import { useError } from "@/context/ErrorContext";
import { PaginationMeta, Product } from "@/types";
import { useApiWithErrorContext } from "@/utils/withErrorContext";
import { Link } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ProductCard } from "../components";
import { fetchProducts, formatProductForDisplay } from "../services";

export type { PaginationMeta, Product };

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const apiWithError = useApiWithErrorContext();
  const { clearError } = useError();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    clearError();

    apiWithError(() => fetchProducts(pageUrl || undefined))
      .then((response) => {
        if (!isMounted || !response) return;
        setProducts(response.data);
        setMeta(response.meta);
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
    meta,
    handlePageChange,
    renderProduct,
    apiUrl: pageUrl,
  };
};
