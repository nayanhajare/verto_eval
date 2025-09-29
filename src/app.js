const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/product');
require('dotenv').config(); 

// console.log('PORT =', process.env.PORT);
// console.log('MONGO_URI =', process.env.MONGO_URI);

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/api/products', productRoutes);


// error handler
app.use((err, req, res, next) => {
console.error(err);
if (!err.statusCode) err.statusCode = 500;
res.status(err.statusCode).json({ error: err.message });
});


const PORT = process.env.PORT || 5000;


if (require.main === module) {
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/warehouse_db';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to MongoDB');
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
})
.catch(err => {
console.error('Mongo connection error', err);
process.exit(1);
});
}


module.exports = app; // for testing