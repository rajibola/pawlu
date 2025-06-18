import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Next } from "../assets/images/svgs/Next";
import { Previous } from "../assets/images/svgs/Previous";
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

  const renderPagination = useCallback(() => {
    if (!meta) return null;
    const { current_page, last_page, next_page_url, prev_page_url } = meta;
    const paginationItems = [];

    // Previous button
    paginationItems.push({
      type: "prev",
      label: (
        <View className="flex-row items-center gap-2">
          <Previous />
          <Text className="text-sm text-gray-500">Prev</Text>
        </View>
      ),
      url: prev_page_url,
      disabled: !prev_page_url,
    });

    // Always show first page
    paginationItems.push({
      type: "page",
      label: "1",
      page: 1,
      url: `${API_URL}?page=1`,
      active: current_page === 1,
    });

    // Show left ellipsis if needed
    if (current_page > 2) {
      paginationItems.push({ type: "ellipsis" });
    }

    // Show current page if not first or last
    if (current_page !== 1 && current_page !== last_page) {
      paginationItems.push({
        type: "page",
        label: String(current_page),
        page: current_page,
        url: `${API_URL}?page=${current_page}`,
        active: true,
      });
    }

    // Show right ellipsis if needed
    if (current_page < last_page - 1) {
      paginationItems.push({ type: "ellipsis" });
    }

    // Always show last page if more than one
    if (last_page > 1) {
      paginationItems.push({
        type: "page",
        label: String(last_page),
        page: last_page,
        url: `${API_URL}?page=${last_page}`,
        active: current_page === last_page,
      });
    }

    // Next button
    paginationItems.push({
      type: "next",
      label: (
        <View className="flex-row items-center gap-2">
          <Text className="text-sm text-gray-500">Next</Text>
          <Next />
        </View>
      ),
      url: next_page_url,
      disabled: !next_page_url,
    });

    return (
      <View className="flex-row justify-center items-center mt-[53px] self-end mr-[20px]">
        {paginationItems.map((item, idx) => {
          if (item.type === "ellipsis") {
            return (
              <View
                key={idx}
                className="h-[36px] min-w-[36px] px-4 mx-1 rounded border border-[#EAECF0] flex items-center justify-center"
              >
                <Text style={{ fontSize: 16, color: "#101828" }}>...</Text>
              </View>
            );
          }

          const isActive = item.active;
          const isDisabled = item.disabled;

          return (
            <TouchableOpacity
              key={idx}
              disabled={isDisabled || isActive}
              onPress={() => handlePageChange(item.url ?? null)}
              style={{
                height: 36,
                minWidth: 36,
                paddingHorizontal: 12,
                marginHorizontal: 4,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: isActive ? "#101828" : "#EAECF0",
                backgroundColor: isActive ? "#101828" : "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "#FFFFFF" : "#101828",
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, [meta, handlePageChange]);

  return {
    products,
    loading,
    meta,
    renderPagination,
    renderProduct,
  };
}
