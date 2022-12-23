const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/ExtendedReferencePattern/customer.routes');
const categoryRoutes = require('./routes/ExtendedReferencePattern/category.routes');
const productRoutes = require('./routes/ExtendedReferencePattern/products.routes');
const reviewRoutes = require('./routes/ExtendedReferencePattern/review.routes');
const orderRoutes = require('./routes/ExtendedReferencePattern/order.routes');

require('dotenv').config();

const mongoString = process.env.EXTENDED_PATTERN;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

const app = express();

app.use(express.json());

app.use('/', customerRoutes);
app.use('/', productRoutes);
app.use('/', categoryRoutes);
app.use('/', reviewRoutes);
app.use('/', orderRoutes);

app.listen(5000, () => {
  console.log(`Server Started at ${5000}`);
});

// q1 create customer
// q2 create Category
// q3 create Product
// q4 create order
// q5 create review
// q6 get customer
// q7 get customers recent orders
// q8 get  customers all orders
// q9 get recent review of a product by the customer which he has ordered
// q10 get products of similar category
