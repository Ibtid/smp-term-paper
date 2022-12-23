const express = require('express');
const { default: mongoose } = require('mongoose');
const Product = require('../../model/SubsetPattern/Products.schema');
const Order = require('../../model/SubsetPattern/Order.schema');
const Customer = require('../../model/SubsetPattern/Customer.schema');
const router = express.Router();

const fs = require('fs');

const {
  indirectPathCount,
  directedEdgesCount,
} = require('../../utils/helpers');

const { DAG, getTotalDirectedEdges } = require('../../utils/dag_sp');

router.post('/order', async (req, res) => {
  let startTime = new Date().getTime();
  let newOrder = {
    netamount: 1000,
    taxonomy: 100,
    totalamount: 1100,
    products: [
      mongoose.Types.ObjectId('63a59cbdf62279b411978fab'),
      mongoose.Types.ObjectId('63a59cbdf62279b411978fab'),
    ],
    customer: mongoose.Types.ObjectId('63a599c7c014200c551e66a6'),
  };
  let order = new Order(newOrder);
  let customer = await Customer.findById(
    mongoose.Types.ObjectId('63a599c7c014200c551e66a6')
  );

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await order.save({ session: sess });
    customer.lastTenOrders.push({ price: 1100, order_id: order._id });
    await customer.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong please try again',
    });
  }

  res.json({ order, customer });
  let endTime = new Date().getTime();
  let directedEdges =
    directedEdgesCount(DAG, 'Customer', 'Customer') +
    directedEdgesCount(DAG, 'Order', 'Order');

  let indirectPath =
    indirectPathCount(DAG, 'Customer', 'Customer') +
    indirectPathCount(DAG, 'Order', 'Order');

  let data = `Q4 Time:${
    startTime - endTime
  } LOC:25 Stages:3 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
    directedEdges / getTotalDirectedEdges()
  } indirectPath: ${indirectPath} requiredCollection:2`;

  data += '\n';
  fs.appendFile('sp.txt', data, (err) => {
    return console.log(err);
  });
});

router.get('/order/recent', async (req, res) => {
  let startTime = new Date().getTime();

  let recentOrders = await Customer.findById(
    mongoose.Types.ObjectId('63a599c7c014200c551e66a6')
  ).select('lastTenOrders');
  res.json(recentOrders);

  let endTime = new Date().getTime();
  let directedEdges = directedEdgesCount(DAG, 'Customer', 'Customer');

  let indirectPath = indirectPathCount(DAG, 'Customer', 'Customer');

  let data = `Q7 Time:${
    startTime - endTime
  } LOC:4 Stages:3 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
    directedEdges / getTotalDirectedEdges()
  } indirectPath: ${indirectPath} requiredCollection:1`;

  data += '\n';
  fs.appendFile('sp.txt', data, (err) => {
    return console.log(err);
  });
});

router.get('/order/all', async (req, res) => {
  let startTime = new Date().getTime();
  let allOrders = await Order.find().where({
    customer: mongoose.Types.ObjectId('639727e0de472407751ba45c'),
  });
  res.json(allOrders);

  let endTime = new Date().getTime();
  let directedEdges = directedEdgesCount(DAG, 'Order', 'Order');

  let indirectPath = indirectPathCount(DAG, 'Order', 'Order');

  let data = `Q8 Time:${
    startTime - endTime
  } LOC:4 Stages:2 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
    directedEdges / getTotalDirectedEdges()
  } indirectPath: ${indirectPath} requiredCollection:1`;

  data += '\n';
  fs.appendFile('sp.txt', data, (err) => {
    return console.log(err);
  });
});

router.get('/order/myProducts/reviews', async (req, res) => {
  let startTime = new Date().getTime();

  let allOrders = await Order.find()
    .where({
      customer: mongoose.Types.ObjectId('639727e0de472407751ba45c'),
    })
    .populate({
      path: 'products',
      populate: {
        path: 'lastTenReview',
        where: {
          customer: mongoose.Types.ObjectId('639727e0de472407751ba45c'),
        },
      },
    });
  res.json(allOrders);
  let endTime = new Date().getTime();
  let directedEdges = directedEdgesCount(DAG, 'Order', 'Review');

  let indirectPath = indirectPathCount(DAG, 'Order', 'Review');

  let data = `Q9 Time:${
    startTime - endTime
  } LOC:13 Stages:5 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
    directedEdges / getTotalDirectedEdges()
  } indirectPath: ${indirectPath} requiredCollection:1`;

  data += '\n';
  fs.appendFile('sp.txt', data, (err) => {
    return console.log(err);
  });
});

module.exports = router;
