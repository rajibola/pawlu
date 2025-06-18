// Base API configuration
const API_BASE_URL = "https://pawlus.twinepos.dev/api/online/v1";

// API endpoints
export const ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
} as const;

// Types
export type ProductMedia = {
  url: string;
  conversions?: { "medium-square"?: string };
};

export type ProductVariant = {
  price: { formatted: string };
};

export type Product = {
  id: number;
  title: string;
  media: ProductMedia[];
  product_variants: ProductVariant[];
};

export type PaginationMeta = {
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

export type ApiResponse<T> = {
  data: T;
  meta: PaginationMeta;
};

// API error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Generic API request function
async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        response
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Network error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

// Products API functions
export async function getProducts(
  url?: string
): Promise<ApiResponse<Product[]>> {
  const endpoint = url || ENDPOINTS.PRODUCTS;
  return apiRequest<ApiResponse<Product[]>>(endpoint);
}

export async function getProductById(id: number): Promise<Product> {
  const endpoint = `${ENDPOINTS.PRODUCTS}/${id}`;
  return apiRequest<Product>(endpoint);
}

// Export convenience object for backward compatibility
export const productsApi = {
  getProducts,
  getProductById,
};
