export const extractNumbers = (price: string | null): number | null => {
  if (!price) {
    return null;
  }

  const result = price.match(/[\d.]+/g);
  if (result) {
    return +result.join('');
  }
  return result;
};

export const getMinOfRangePrice = (price: string | null): string | null => {
  if (!price) {
    return null;
  }

  console.log(price);

  if (price.includes(' - ')) {
    return price.split('-')[0].trim();
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

  if (newPrice >= oldPrice) {
    return 0;
  }

  return Math.floor(((oldPrice - newPrice) / oldPrice) * 100);
};
