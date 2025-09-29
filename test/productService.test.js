const { productService, InventoryError } = require('../src/services/productService');

describe('pure inventory logic', () => {
  test('safeIncrease with positive integer', () => {
    expect(productService.safeIncrease(5, 3)).toBe(8);
  });

  test('safeIncrease throws for negative amount', () => {
    expect(() => productService.safeIncrease(5, -2)).toThrow(InventoryError);
  });

  test('safeDecrease reduces correctly', () => {
    expect(productService.safeDecrease(10, 4)).toBe(6);
  });

  test('safeDecrease throws on insufficient stock', () => {
    expect(() => productService.safeDecrease(2, 5)).toThrow(InventoryError);
  });

  test('safeDecrease throws on non-integer amount', () => {
    expect(() => productService.safeDecrease(10, 2.5)).toThrow(InventoryError);
  });
});