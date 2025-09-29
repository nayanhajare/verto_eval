
// Service layer contains business logic and pure helper functions that are easy to unit test.

const Product = require('../models/product');

class InventoryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InventoryError';
    this.statusCode = 400;
  }
}

const productService = {
  // Pure logic helper (no DB) for safe decrease
  safeDecrease(currentQuantity, amount) {
    if (!Number.isInteger(amount) || amount < 0) {
      throw new InventoryError('Amount to decrease must be a non-negative integer');
    }
    if (amount > currentQuantity) {
      throw new InventoryError('Insufficient stock');
    }
    return currentQuantity - amount;
  },

  // Pure logic helper for increase
  safeIncrease(currentQuantity, amount) {
    if (!Number.isInteger(amount) || amount < 0) {
      throw new InventoryError('Amount to increase must be a non-negative integer');
    }
    return currentQuantity + amount;
  },

  // DB operations
  async createProduct(data) {
    const p = new Product(data);
    return p.save();
  },

  async getProductById(id) {
    return Product.findById(id);
  },

  async updateProduct(id, updates) {
    if (updates.stock_quantity != null && updates.stock_quantity < 0) {
      throw new InventoryError('stock_quantity cannot be negative');
    }
    return Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  },

  async deleteProduct(id) {
    return Product.findByIdAndDelete(id);
  },

  async listProducts(filter = {}) {
    return Product.find(filter);
  },

  async increaseStock(id, amount) {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new InventoryError('Amount must be a positive integer');
    }
    const product = await Product.findById(id);
    if (!product) throw new InventoryError('Product not found');
    product.stock_quantity = this.safeIncrease(product.stock_quantity, amount);
    await product.save();
    return product;
  },

  async decreaseStock(id, amount) {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new InventoryError('Amount must be a positive integer');
    }
    const product = await Product.findById(id);
    if (!product) throw new InventoryError('Product not found');
    product.stock_quantity = this.safeDecrease(product.stock_quantity, amount);
    await product.save();
    return product;
  },

  async listLowStock() {
    return Product.find({ $expr: { $lt: ["$stock_quantity", "$low_stock_threshold"] } });
  }
};

module.exports = { productService, InventoryError };






