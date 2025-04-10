import { Price } from "../types/types";

export const pluralize = (format: string) => {
  if (format === "All") return "All Comics";
  return format.endsWith("s") ? format : `${format}s`;
};

export function getLowestPrice(prices: Price[]): number | "N/A" {
  return prices.length > 0 ? Math.min(...prices.map((p) => p.price)) : "N/A";
}
