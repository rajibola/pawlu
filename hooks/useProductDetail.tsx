import { useError } from "@/context/ErrorContext";
import { Product } from "@/types";
import { useApiWithErrorContext } from "@/utils/withErrorContext";
import { useEffect, useState } from "react";
import { fetchProductBySlug } from "../services/productService";

export default function useProductDetail(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const apiWithError = useApiWithErrorContext();
  const { clearError } = useError();

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    const loadProduct = async () => {
      setLoading(true);
      clearError();
      const productData = await apiWithError(() => fetchProductBySlug(slug));
      if (isMounted && productData) {
        setProduct(productData);
      }
      if (isMounted) {
        setLoading(false);
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { product, loading };
}
