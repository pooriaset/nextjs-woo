import {
  extractNumbers,
  getMinOfRangePrice,
  getProfitPercentage,
} from './price';

describe('extractNumbers function', () => {
  it('should return null when input is null', () => {
    expect(extractNumbers(null)).toBeNull();
  });

  it('should return null when input is an empty string', () => {
    expect(extractNumbers('')).toBeNull();
  });

  it('should return null when input has no numbers', () => {
    expect(extractNumbers('abc')).toBeNull();
  });

  it('should return the correct number when input has numbers', () => {
    expect(extractNumbers('123,000 تومان')).toBe(123000);
    expect(extractNumbers('123,000تومان')).toBe(123000);
    expect(extractNumbers('123,000')).toBe(123000);
    expect(extractNumbers('123000')).toBe(123000);
    expect(extractNumbers('abc123')).toBe(123);
    expect(extractNumbers('123abc')).toBe(123);
    expect(extractNumbers('12abc34')).toBe(1234);
    expect(extractNumbers('abc456def')).toBe(456);
    expect(extractNumbers('1,234')).toBe(1234);
    expect(extractNumbers('$1,234.56')).toBe(1234.56);
  });
});

describe('getMinOfRangePrice function', () => {
  it('should return null when input is null', () => {
    expect(getMinOfRangePrice(null)).toBeNull();
  });

  it('should return the same price when input is a single price', () => {
    expect(getMinOfRangePrice('100')).toBe('100');
  });

  it('should return the minimum value of the range when input is a range of prices', () => {
    expect(getMinOfRangePrice('50 - 100')).toBe('50');
  });

  it('should handle spaces around the hyphen in range input', () => {
    expect(getMinOfRangePrice(' 50 - 100 ')).toBe('50');
  });

  it('should return the minimum value of the range when input is a range of price and units', () => {
    expect(getMinOfRangePrice('تومان595,000 - تومان685,000')).toBe(
      'تومان595,000',
    );
  });

  it('should handle empty string input', () => {
    expect(getMinOfRangePrice('')).toBe(null);
  });
});

describe('getProfitPercentage function', () => {
  it('should return zero when one of the parameters is falsy', () => {
    expect(getProfitPercentage(10, null)).toBe(0);
    expect(getProfitPercentage(null, 15)).toBe(0);
    expect(getProfitPercentage(null, null)).toBe(0);
  });

  it('should return the correct number', () => {
    expect(getProfitPercentage(0, 0)).toBe(0);
    expect(getProfitPercentage(20, 40)).toBe(50);
    expect(getProfitPercentage(80, 100)).toBe(20);
    expect(getProfitPercentage(80, 100)).toBe(20);
    expect(getProfitPercentage(55, 82)).toBe(32);
  });
});
