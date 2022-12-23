const express = require('express');
const { default: mongoose } = require('mongoose');
const Product = require('../../model/SubsetPattern/Products.schema');
const Review = require('../../model/SubsetPattern/Review.schema');
const router = express.Router();

const fs = require('fs');

const {
  indirectPathCount,
  directedEdgesCount,
} = require('../../utils/helpers');

const { DAG, getTotalDirectedEdges } = require('../../utils/dag_sp');

router.post('/review', async (req, res) => {
  let startTime = new Date().getTime();

  let newReview = {
    review: 'I hated it',
    product: mongoose.Types.ObjectId('639862c1d0b2cf8daffb50b5'),
    customer: mongoose.Types.ObjectId('63a59cbdf62279b411978fab'),
  };
  let review = new Review(newReview);
  let product = await Product.findById(
    mongoose.Types.ObjectId('63a59cbdf62279b411978fab')
  );

  console.log(product);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await review.save({ session: sess });
    product.lastTenReview.push({
      review: review.review,
      review_id: review._id,
      customer_id: review.customer,
    });
    await product.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong please try again',
    });
  }

  res.json({ review, product });
  let endTime = new Date().getTime();
  let directedEdges = directedEdgesCount(DAG, 'Customer', 'Customer');

  let indirectPath = indirectPathCount(DAG, 'Customer', 'Customer');

  let data = `Q5 Time:${
    startTime - endTime
  } LOC:27 Stages:3 DirectedEdges:${directedEdges}  directedEdgesCoverage:${
    directedEdges / getTotalDirectedEdges()
  } indirectPath: ${indirectPath} requiredCollection:2`;

  data += '\n';
  fs.appendFile('sp.txt', data, (err) => {
    return console.log(err);
  });
});

module.exports = router;
