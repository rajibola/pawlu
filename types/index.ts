export type ProductMedia = {
  url: string;
  conversions?: { "medium-square"?: string };
};

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

export type ProductVariant = {
  id: number;
  price: { formatted: string };
  stock_count: number;
  variant_type_options: OptionValue[];
};

export type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
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
