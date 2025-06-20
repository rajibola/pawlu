import { Product } from "@/types";
import { useEffect, useState } from "react";
import { fetchProductBySlug } from "../services/productService";

export default function useProductDetail(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    const loadProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await fetchProductBySlug(slug);
        if (isMounted) {
          setProduct(productData);
        }
      } catch (e: any) {
        if (isMounted) {
          setError(e.message || "Failed to fetch product");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { product, loading, error };
}
