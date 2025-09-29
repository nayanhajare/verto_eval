
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

// CRUD
router.post('/', controller.create);
router.get('/', controller.list);
router.get('/low-stock', controller.listLowStock);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

// inventory actions
router.post('/:id/increase', controller.increaseStock); // body: { amount: 5 }
router.post('/:id/decrease', controller.decreaseStock); // body: { amount: 3 }

module.exports = router;