import { Product } from "@/types";
import { getProductById, getProductBySlug, getProducts } from "./api";

// Get product image with fallback
export function getProductImage(product: Product): string {
  if (product.media && product.media.length > 0) {
    return (
      product.media[0].conversions?.["medium-square"] || product.media[0].url
    );
  }
  return require("../assets/images/logo.png");
}

// Get product price with fallback
export function getProductPrice(product: Product): string {
  if (product.product_variants && product.product_variants.length > 0) {
    return product.product_variants[0].price.formatted;
  }
  return "-";
}

// Get product by ID
export async function fetchProductById(id: number): Promise<Product> {
  const response = await getProductById(id);
  return response.data;
}

// Get products list
export async function fetchProducts(url?: string) {
  return getProducts(url);
}

// Get product by slug
export async function fetchProductBySlug(slug: string): Promise<Product> {
  return getProductBySlug(slug);
}

// Format product for display
export function formatProductForDisplay(product: Product) {
  return {
    id: product.id,
    title: product.title,
    image: getProductImage(product),
    price: getProductPrice(product),
  };
}
