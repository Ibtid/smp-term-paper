const express = require('express');
const { default: mongoose } = require('mongoose');
const Review = require('../../model/ExtendedReferencePattern/Review.schema');
const router = express.Router();

const fs = require('fs');

const {
  indirectPathCount,
  directedEdgesCount,
} = require('../../utils/helpers');

const { DAG, getTotalDirectedEdges } = require('../../utils/dag_erp');

router.post('/review', async (req, res) => {
  let startTime = new Date().getTime();

  let newReview = {
    review: 'I hated it',
    product: mongoose.Types.ObjectId('63a5f1ef0e7a90a3f4edda43'),
    customer: mongoose.Types.ObjectId('63a5f00d3fb08ce64c0cee89'),
  };
  let review = new Review(newReview);
  await review.save();

  res.json({ review });
  let endTime = new Date().getTime();
  let directedEdges = directedEdgesCount(DAG, 'Customer', 'Customer');

  let indirectPath = indirectPathCount(DAG, 'Customer', 'Customer');

  let data = `Q5 Time:${
    startTime - endTime
  } LOC:27 Stages:3 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
    directedEdges / getTotalDirectedEdges()
  } indirectPath: ${indirectPath} requiredCollection:2`;

  data += '\n';
  fs.appendFile('erp.txt', data, (err) => {
    return console.log(err);
  });
});

module.exports = router;
