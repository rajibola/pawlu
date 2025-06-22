import { Product, ProductVariant } from "@/types";

export const variants: ProductVariant[] = [
  {
    id: 1,
    price: { formatted: "€7.50" },
    stock_count: 10,
    variant_type_options: [
      {
        id: 1,
        name: "Standard",
        value: "50g",
        variant_type: { id: 1, name: "Weight" },
      },
    ],
  },
  {
    id: 2,
    price: { formatted: "€7.50" }, // Price is often same for variants in mock data
    stock_count: 5,
    variant_type_options: [
      {
        id: 2,
        name: "Large",
        value: "100g",
        variant_type: { id: 1, name: "Weight" },
      },
    ],
  },
];

export const product: Product = {
  id: 1,
  slug: "test-product",
  title: "Test Product",
  description: "A product for testing.",
  media: [],
  product_variants: variants,
};
