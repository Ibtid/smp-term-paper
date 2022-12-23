const express = require('express');
const { default: mongoose } = require('mongoose');
const Category = require('../../model/SubsetPattern/Categories.schema');
const router = express.Router();
const fs = require('fs');

const {
  indirectPathCount,
  directedEdgesCount,
} = require('../../utils/helpers');

const { DAG, getTotalDirectedEdges } = require('../../utils/dag_sp');

router.post('/category', async (req, res) => {
  let startTime = new Date().getTime();
  let newCategory = {
    categoryname: 'Abstract',
  };
  let category = new Category(newCategory);
  await category.save();
  res.json({ category });

  let endTime = new Date().getTime();

  let data = `Q2 Time:${
    startTime - endTime
  } LOC:3 Stages:1 DirectedEdges:${directedEdgesCount(
    DAG,
    'Category',
    'Category'
  )}  directedEdgesCoverage:${
    directedEdgesCount(DAG, 'Category', 'Category') / getTotalDirectedEdges()
  } indirectPath: ${indirectPathCount(
    DAG,
    'Category',
    'Category'
  )} requiredCollection:1`;

  data += '\n';
  fs.appendFile('sp.txt', data, (err) => {
    return console.log(err);
  });
});

module.exports = router;
