// Export all services
export {
  ENDPOINTS,
  getProductById,
  getProducts,
  productsApi,
  type ApiError,
  type ApiResponse,
  type PaginationMeta,
  type Product,
  type ProductMedia,
  type ProductVariant,
} from "./api";

export {
  fetchProductById,
  fetchProducts,
  formatProductForDisplay,
  getProductImage,
  getProductPrice,
} from "./productService";
