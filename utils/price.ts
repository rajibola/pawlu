/**
 * Converts a formatted price string (e.g., "€12.50") into a numeric value.
 * @param formattedPrice The price string from the API.
 * @returns The numeric value of the price.
 */
export const getNumericPrice = (formattedPrice: string): number => {
  if (!formattedPrice) return 0;
  // Remove currency symbols, thousands separators, and use dot as decimal separator
  const numericString = formattedPrice
    .replace(/[^0-9.,]/g, "")
    .replace(",", ".");
  return parseFloat(numericString);
};
