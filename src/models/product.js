const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
name: { type: String, required: true, trim: true },
description: { type: String, default: '' },
stock_quantity: { type: Number, required: true, min: 0, default: 0 },
low_stock_threshold: { type: Number, min: 0, default: 5 }
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);