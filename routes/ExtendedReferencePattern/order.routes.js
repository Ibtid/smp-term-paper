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
  let newOrder = {
    netamount: 1000,
    taxonomy: 100,
    totalamount: 1100,
    products: [
      {
        name: 'iii',
        price: 100,
        prod_id: mongoose.Types.ObjectId('639862c1d0b2cf8daffb50b5'),
      },
    ],
    customer: {
      name: 'p',
      address1: 'pp',
      address2: 'ppp',
      cust_id: mongoose.Types.ObjectId('639727e0de472407751ba45c'),
    },
  };
  let order = new Order(newOrder);
  await order.save({ session: sess });

  res.json({ order });
  // let endTime = new Date().getTime();
  // let directedEdges =
  //   directedEdgesCount(DAG, 'Customer', 'Customer') +
  //   directedEdgesCount(DAG, 'Order', 'Order');

  // let indirectPath =
  //   indirectPathCount(DAG, 'Customer', 'Customer') +
  //   indirectPathCount(DAG, 'Order', 'Order');

  // let data = `Q4 Time:${
  //   startTime - endTime
  // } LOC:25 Stages:3 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
  //   directedEdges / getTotalDirectedEdges()
  // } indirectPath: ${indirectPath} requiredCollection:2`;

  // data += '\n';
  // fs.appendFile('sp.txt', data, (err) => {
  //   return console.log(err);
  // });
});

// router.get('/order/recent', async (req, res) => {
//   let startTime = new Date().getTime();

//   let recentOrders = await Customer.findById(
//     mongoose.Types.ObjectId('639727e0de472407751ba45c')
//   ).select('lastTenOrders');
//   res.json(recentOrders);

//   let endTime = new Date().getTime();
//   let directedEdges = directedEdgesCount(DAG, 'Customer', 'Customer');

//   let indirectPath = indirectPathCount(DAG, 'Customer', 'Customer');

//   let data = `Q7 Time:${
//     startTime - endTime
//   } LOC:4 Stages:2 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
//     directedEdges / getTotalDirectedEdges()
//   } indirectPath: ${indirectPath} requiredCollection:1`;

//   data += '\n';
//   fs.appendFile('sp.txt', data, (err) => {
//     return console.log(err);
//   });
// });

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
