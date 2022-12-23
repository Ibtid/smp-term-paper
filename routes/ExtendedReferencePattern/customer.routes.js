const express = require('express');
const { default: mongoose } = require('mongoose');
const Customer = require('../../model/ExtendedReferencePattern/Customer.schema');
const router = express.Router();
const fs = require('fs');
const {
  indirectPathCount,
  directedEdgesCount,
} = require('../../utils/helpers');

const { DAG, getTotalDirectedEdges } = require('../../utils/dag_erp');

router.post('/customer', async (req, res) => {
  let startTime = new Date().getTime();
  let newCustomer = {
    firstname: 'ibtid',
    lastname: 'rahman',
    address1: 'abcd',
    address2: 'abcd',
    city: 'dhaka',
    state: 'dhaka',
    zip: '123r3',
    country: 'bangladesh',
    region: 1234,
    email: 'ibtid@gmail.com',
    creditcardtype: 'visa',
    creditcard: '123******',
    creditcardexpiration: '12/12/12',
    username: 'ibtid',
    password: 'ibtid',
    income: '1200',
    genders: 'male',
  };
  let customer = new Customer(newCustomer);
  await customer.save();
  res.json({ customer });
  let endTime = new Date().getTime();

  let data = `Q1 Time:${
    startTime - endTime
  } LOC:3 Stages:1 DirectedEdges:${directedEdgesCount(
    DAG,
    'Customer',
    'Customer'
  )}  directedEdgesCoverage:${
    directedEdgesCount(DAG, 'Customer', 'Customer') / getTotalDirectedEdges()
  } indirectPath: ${indirectPathCount(
    DAG,
    'Customer',
    'Customer'
  )} requiredCollection:1`;

  data += '\n';
  fs.appendFile('erp.txt', data, (err) => {
    return console.log(err);
  });
});

router.get('/customer', async (req, res) => {
  let startTime = new Date().getTime();

  let customer = await Customer.findById(
    mongoose.Types.ObjectId('63a5f00d3fb08ce64c0cee89')
  );
  res.json({ customer });

  let endTime = new Date().getTime();

  let data = `Q6 Time:${
    startTime - endTime
  } LOC:4 Stages:2 DirectedEdges:${directedEdgesCount(
    DAG,
    'Customer',
    'Customer'
  )}  directedEdgesCoverage:${
    directedEdgesCount(DAG, 'Customer', 'Customer') / getTotalDirectedEdges()
  } indirectPath: ${indirectPathCount(
    DAG,
    'Customer',
    'Customer'
  )} requiredCollection:1`;

  data += '\n';
  fs.appendFile('erp.txt', data, (err) => {
    return console.log(err);
  });
});

module.exports = router;
