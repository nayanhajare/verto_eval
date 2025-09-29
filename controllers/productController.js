
const { productService, InventoryError } = require('../services/productService');

const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

module.exports = {
  create: wrap(async (req, res) => {
    const created = await productService.createProduct(req.body);
    res.status(201).json(created);
  }),

  list: wrap(async (req, res) => {
    const products = await productService.listProducts();
    res.json(products);
  }),

  get: wrap(async (req, res) => {
    const p = await productService.getProductById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  }),

  update: wrap(async (req, res) => {
    const updated = await productService.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  }),

  remove: wrap(async (req, res) => {
    const d = await productService.deleteProduct(req.params.id);
    if (!d) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Deleted' });
  }),

  increaseStock: wrap(async (req, res) => {
    const amount = Number(req.body.amount);
    const updated = await productService.increaseStock(req.params.id, amount);
    res.json(updated);
  }),

  decreaseStock: wrap(async (req, res) => {
    const amount = Number(req.body.amount);
    try {
      const updated = await productService.decreaseStock(req.params.id, amount);
      res.json(updated);
    } catch (err) {
      if (err instanceof InventoryError) return res.status(err.statusCode).json({ error: err.message });
      throw err;
    }
  }),

  listLowStock: wrap(async (req, res) => {
    const list = await productService.listLowStock();
    res.json(list);
  })
};