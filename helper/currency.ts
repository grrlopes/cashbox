const formatCurrency = (text: string): string => {
  const numeric = parseFloat(text.replace(/[^\d.]/g, ""));
  const value = isNaN(numeric) ? 0 : numeric;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const parseCurrencyToCents = (text: string): number => {
  const numeric = text.replace(/[^\d.-]/g, "");
  return parseFloat(numeric) * 100;
};

export { formatCurrency, parseCurrencyToCents }
