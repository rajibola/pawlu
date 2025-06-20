import { act, renderHook, waitFor } from "@testing-library/react-native";
import { Product } from "../../types";
import useProducts from "../useProducts";

// Mock the services module
jest.mock("../../services", () => ({
  fetchProducts: jest.fn(),
  formatProductForDisplay: jest.fn(),
  ApiError: class ApiError extends Error {
    constructor(message: string, status?: number, response?: any) {
      super(message);
      this.name = "ApiError";
    }
  },
}));

const mockProducts: Product[] = [
  {
    id: 1,
    title: "Test Product 1",
    slug: "test-product-1",
    description: "Test description 1",
    media: [{ url: "test-image-1.jpg" }],
    product_variants: [
      {
        id: 101,
        price: { formatted: "$10.00" },
        stock_count: 10,
        variant_type_options: [],
      },
    ],
  },
  {
    id: 2,
    title: "Test Product 2",
    slug: "test-product-2",
    description: "Test description 2",
    media: [{ url: "test-image-2.jpg" }],
    product_variants: [
      {
        id: 102,
        price: { formatted: "$20.00" },
        stock_count: 5,
        variant_type_options: [],
      },
    ],
  },
];

const mockApiResponse = {
  data: mockProducts,
  meta: {
    current_page: 1,
    last_page: 5,
    per_page: 10,
    total: 50,
    next_page_url: "https://api.example.com/products?page=2",
    prev_page_url: null,
  },
};

describe("useProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch products on mount", async () => {
    const { fetchProducts } = require("../../services");
    fetchProducts.mockResolvedValue(mockApiResponse);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.meta).toEqual(mockApiResponse.meta);
    expect(result.current.error).toBeNull();
  });

  it("should handle API errors", async () => {
    const { fetchProducts } = require("../../services");
    const errorMessage = "Failed to fetch products";
    fetchProducts.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });

  it("should handle pagination", async () => {
    const { fetchProducts } = require("../../services");
    fetchProducts.mockResolvedValue(mockApiResponse);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const nextPageUrl = "https://api.example.com/products?page=2";
    await act(async () => {
      result.current.handlePageChange(nextPageUrl);
    });
    await waitFor(() => {
      expect(result.current.apiUrl).toBe(nextPageUrl);
    });
  });

  it("should render product items correctly", async () => {
    const {
      fetchProducts,
      formatProductForDisplay,
    } = require("../../services");
    fetchProducts.mockResolvedValue(mockApiResponse);
    formatProductForDisplay.mockReturnValue({
      title: "Test Product 1",
      image: "test-image-1.jpg",
      price: "$10.00",
    });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const product = mockProducts[0];
    const renderedProduct = result.current.renderProduct({ item: product });

    expect(renderedProduct).toBeDefined();
  });

  it("should not change page if URL is the same", async () => {
    const { fetchProducts } = require("../../services");
    fetchProducts.mockResolvedValue(mockApiResponse);

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const currentUrl = result.current.apiUrl;
    await act(async () => {
      result.current.handlePageChange(currentUrl);
    });
    expect(result.current.apiUrl).toBe(currentUrl);
  });
});
