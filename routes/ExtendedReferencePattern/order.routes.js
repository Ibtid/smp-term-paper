const express = require('express');
const { default: mongoose } = require('mongoose');
const Product = require('../../model/ExtendedReferencePattern/Product.schema');
const Order = require('../../model/ExtendedReferencePattern/Order.schema');
const Customer = require('../../model/ExtendedReferencePattern/Customer.schema');
const router = express.Router();

const fs = require('fs');

const {
  indirectPathCount,
  directedEdgesCount,
} = require('../../utils/helpers');

const { DAG, getTotalDirectedEdges } = require('../../utils/dag_erp');

router.post('/order', async (req, res) => {
  let startTime = new Date().getTime();
  let products_ids = ['63a5f1ef0e7a90a3f4edda43'];
  let products = [];
  for (let i = 0; i < products_ids.length; i++) {
    let retrieveProduct = await Product.findById(
      mongoose.Types.ObjectId('63a5f1ef0e7a90a3f4edda43')
    );
    products.push({
      name: retrieveProduct.title,
      price: retrieveProduct.price,
      prod_id: products_ids[i],
    });
  }

  let customer = await Customer.findById(
    mongoose.Types.ObjectId('63a5f00d3fb08ce64c0cee89')
  );

  let newOrder = {
    netamount: 1000,
    taxonomy: 100,
    totalamount: 1100,
    products: products,
    customer: {
      name: customer.firstname,
      address1: customer.address1,
      address2: customer.address2,
      cust_id: mongoose.Types.ObjectId('63a5f00d3fb08ce64c0cee89'),
    },
  };
  let order = new Order(newOrder);
  await order.save();

  res.json({ order });
  let endTime = new Date().getTime();
  let directedEdges = directedEdgesCount(DAG, 'Order', 'Order');

  let indirectPath = indirectPathCount(DAG, 'Order', 'Order');

  let data = `Q4 Time:${
    startTime - endTime
  } LOC:32 Stages:5 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
    directedEdges / getTotalDirectedEdges()
  } indirectPath: ${indirectPath} requiredCollection:3`;

  data += '\n';
  fs.appendFile('erp.txt', data, (err) => {
    return console.log(err);
  });
});

router.get('/order/recent', async (req, res) => {
  let startTime = new Date().getTime();

  let recentOrders = await Order.findOne({
    where: {
      customer: {
        cust_id: mongoose.Types.ObjectId('63a5f00d3fb08ce64c0cee89'),
      },
    },
  })
    .limit(10)
    .skip(0)
    .sort({
      orderdate: 'desc',
    });

  res.json(recentOrders);

  let endTime = new Date().getTime();
  let directedEdges = directedEdgesCount(DAG, 'Order', 'Order');

  let indirectPath = indirectPathCount(DAG, 'Order', 'Order');

  let data = `Q7 Time:${
    startTime - endTime
  } LOC:13 Stages:5 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
    directedEdges / getTotalDirectedEdges()
  } indirectPath: ${indirectPath} requiredCollection:1`;

  data += '\n';
  fs.appendFile('erp.txt', data, (err) => {
    return console.log(err);
  });
});

// router.get('/order/all', async (req, res) => {
//   let startTime = new Date().getTime();
//   let allOrders = await Order.find().where({
//     customer: mongoose.Types.ObjectId('639727e0de472407751ba45c'),
//   });
//   res.json(allOrders);

//   let endTime = new Date().getTime();
//   let directedEdges = directedEdgesCount(DAG, 'Order', 'Order');

//   let indirectPath = indirectPathCount(DAG, 'Order', 'Order');

//   let data = `Q8 Time:${
//     startTime - endTime
//   } LOC:4 Stages:2 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
//     directedEdges / getTotalDirectedEdges()
//   } indirectPath: ${indirectPath} requiredCollection:1`;

//   data += '\n';
//   fs.appendFile('sp.txt', data, (err) => {
//     return console.log(err);
//   });
// });

// router.get('/order/myProducts/reviews', async (req, res) => {
//   let startTime = new Date().getTime();

//   let allOrders = await Order.find()
//     .where({
//       customer: mongoose.Types.ObjectId('639727e0de472407751ba45c'),
//     })
//     .populate({
//       path: 'products',
//       populate: {
//         path: 'lastTenReview',
//         where: {
//           customer: mongoose.Types.ObjectId('639727e0de472407751ba45c'),
//         },
//       },
//     });
//   res.json(allOrders);
//   let endTime = new Date().getTime();
//   let directedEdges = directedEdgesCount(DAG, 'Order', 'Review');

//   let indirectPath = indirectPathCount(DAG, 'Order', 'Review');

//   let data = `Q9 Time:${
//     startTime - endTime
//   } LOC:13 Stages:5 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
//     directedEdges / getTotalDirectedEdges()
//   } indirectPath: ${indirectPath} requiredCollection:1`;

//   data += '\n';
//   fs.appendFile('sp.txt', data, (err) => {
//     return console.log(err);
//   });
// });

module.exports = router;
