export const extractNumbers = (price: string | null): number | null => {
  if (!price) {
    return null;
  }

  const result = price.match(/\d+/g);
  if (result) {
    return +result.join('');
  }
  return result;
};

export const getMinOfRangePrice = (price: string | null): string | null => {
  if (!price) {
    return null;
  }

  if (price.includes(' - ')) {
    return price.split('-')[0];
  }
  return price;
};

export const getProfitPercentage = (
  newPrice: number | null,
  oldPrice: number | null,
): number => {
  if (!newPrice || !oldPrice) {
    return 0;
  }

  const divided = oldPrice / newPrice;
  return Math.floor((divided - 1) * 100);
};
