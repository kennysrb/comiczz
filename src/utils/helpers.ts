export const pluralize = (format: string) => {
  if (format === "All") return "All Comics";
  return format.endsWith("s") ? format : `${format}s`;
};
