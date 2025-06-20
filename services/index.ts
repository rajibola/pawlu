// Export all services
export {
  ENDPOINTS,
  getProductBySlug,
  getProducts,
  productsApi,
  type ApiError,
} from "./api";

export {
  fetchProductBySlug,
  fetchProducts,
  formatProductForDisplay,
  getProductImage,
  getProductPrice,
} from "./productService";
