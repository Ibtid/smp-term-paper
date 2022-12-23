const express = require('express');
const { default: mongoose } = require('mongoose');
const Product = require('../../model/SubsetPattern/Products.schema');
const Category = require('../../model/SubsetPattern/Categories.schema');
const router = express.Router();

const fs = require('fs');
const {
  indirectPathCount,
  directedEdgesCount,
} = require('../../utils/helpers');
const { DAG, getTotalDirectedEdges } = require('../../utils/dag_sp');

router.post('/product', async (req, res) => {
  let startTime = new Date().getTime();
  let newProduct = {
    title: 'Gameboy',
    actor: 'Game',
    price: 100,
    special: 10,
    category: mongoose.Types.ObjectId('63a59acfc014200c551e66a8'),
  };
  let product = new Product(newProduct);
  let category = await Category.findById(
    mongoose.Types.ObjectId('63a59acfc014200c551e66a8')
  );
  category.products.push(product._id);
  await category.save();
  await product.save();
  res.json({ product });

  let endTime = new Date().getTime();
  let data = `Q3 Time:${startTime - endTime} LOC:6 Stages:3 DirectedEdges:${
    directedEdgesCount(DAG, 'Product', 'Product') +
    directedEdgesCount(DAG, 'Category', 'Category')
  }  directedEdgesCoverage:${
    directedEdgesCount(DAG, 'Product', 'Product') +
    directedEdgesCount(DAG, 'Category', 'Category') / getTotalDirectedEdges()
  } indirectPath: ${
    indirectPathCount(DAG, 'Product', 'Product') +
    indirectPathCount(DAG, 'Category', 'Category')
  } requiredCollection:2`;

  data += '\n';
  fs.appendFile('sp.txt', data, (err) => {
    return console.log(err);
  });
});

router.get('/product/category/products', async (req, res) => {
  let startTime = new Date().getTime();

  let relatedProducts = await Product.findById(
    mongoose.Types.ObjectId('63a59cbdf62279b411978fab')
  ).populate({
    path: 'category',
    populate: {
      path: 'products',
    },
  });

  res.json({ relatedProducts });
  let endTime = new Date().getTime();
  let directedEdges =
    directedEdgesCount(DAG, 'Product', 'Category') +
    directedEdgesCount(DAG, 'Category', 'Product');

  let indirectPath =
    indirectPathCount(DAG, 'Product', 'Category') +
    indirectPathCount(DAG, 'Category', 'Product');

  let data = `Q10 Time:${
    startTime - endTime
  } LOC:7 Stages:3 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
    directedEdges / getTotalDirectedEdges()
  } indirectPath: ${indirectPath} requiredCollection:2`;

  data += '\n';
  fs.appendFile('sp.txt', data, (err) => {
    return console.log(err);
  });
});

module.exports = router;
