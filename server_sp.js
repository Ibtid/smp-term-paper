const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/SubsetPattern/customer.routes');
const categoryRoutes = require('./routes/SubsetPattern/category.routes');
const productRoutes = require('./routes/SubsetPattern/products.routes');
const reviewRoutes = require('./routes/SubsetPattern/review.routes');
const orderRoutes = require('./routes/SubsetPattern/order.routes');
const {
  getSubpath,
  indirectPathCount,
  directedEdgesCount,
  createDAG,
} = require('./utils/helpers');

require('dotenv').config();

const mongoString = process.env.SUBSET_PATTERN;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

const DAG = {
  Customer: ['Order'],
  Category: ['Product'],
  Product: ['Category', 'Review'],
  Review: ['Product', 'Customer'],
  Order: ['Product', 'Customer'],
};

let dag;
let totalDirectedEdges = 0;

database.once('connected', () => {
  console.log('Database Connected');

  // dag = createDAG(database);

  // console.log(dag);
  // Object.keys(dag).forEach((key, index) => {
  //   totalDirectedEdges = totalDirectedEdges + dag[key].length;
  // });
  // console.log(totalDirectedEdges);
  // console.log(directedEdgesCount(dag, 'Category', 'Order'));
  // console.log(indirectPathCount(dag, 'Product', 'Product') - 1);
  // console.log(getSubpath(directedEdgesCount(dag, 'Category', 'Order')));
});

module.exports = { dag, totalDirectedEdges };
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
