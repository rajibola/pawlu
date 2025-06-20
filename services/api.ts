import { ApiResponse, Product } from "@/types";

// Base API configuration
const API_BASE_URL = "https://pawlus.twinepos.dev/api/online/v1";

// API endpoints
export const ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/products`,
} as const;

// Types
export type OptionValue = {
  id: number;
  name: string;
  value: string;
  option_id: number;
};

export type Option = {
  id: number;
  name: string;
  option_values: OptionValue[];
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

export async function getProductById(id: number): Promise<{ data: Product }> {
  const endpoint = `${ENDPOINTS.PRODUCTS}/${id}`;
  return apiRequest<{ data: Product }>(endpoint);
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const endpoint = `${ENDPOINTS.PRODUCTS}/${slug}`;
  return apiRequest<Product>(endpoint);
}

// Export convenience object for backward compatibility
export const productsApi = {
  getProducts,
  getProductById,
  getProductBySlug,
};
