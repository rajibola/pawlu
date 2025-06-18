import { getProductById, getProducts, type Product } from "./api";

// Product utility functions

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
  return getProductById(id);
}

// Get products list
export async function fetchProducts(url?: string) {
  return getProducts(url);
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
