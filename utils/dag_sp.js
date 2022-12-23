const DAG = {
  Customer: ['Order'],
  Category: ['Product'],
  Product: ['Category', 'Review'],
  Review: ['Product', 'Customer'],
  Order: ['Product', 'Customer'],
};

const getTotalDirectedEdges = () => {
  let totalDirectedEdges = 0;
  Object.keys(DAG).forEach((key, index) => {
    totalDirectedEdges = totalDirectedEdges + DAG[key].length;
  });
  return totalDirectedEdges;
};

module.exports = { DAG, getTotalDirectedEdges };
