const createDAG = (database) => {
  let dag = {};

  const modelNames = database.modelNames();

  modelNames.forEach((name) => {
    let schema = database.model(name).schema.obj;
    dag[name] = [];
    Object.keys(schema).forEach((key, index) => {
      if (schema[key].ref) {
        dag[name].push(schema[key].ref);
      }
      if (schema[key][0]?.ref) {
        dag[name].push(schema[key][0].ref);
      }
    });
  });

  return dag;
};

const directedEdgesCount = (
  dag,
  source,
  destination,
  visitedNode = [source]
) => {
  if (source === destination) {
    return 0;
  }
  if (dag[source].includes(destination)) {
    return 1;
  }
  let edgesCount = 1000;
  visitedNode.push(source);
  dag[source].forEach((node) => {
    if (!visitedNode.includes(node)) {
      edgesCount = Math.min(
        edgesCount,
        directedEdgesCount(dag, node, destination, visitedNode) + 1
      );
    }
  });
  return edgesCount;
};

const indirectPathCount = (
  dag,
  source,
  destination,
  visitedNode = [source]
) => {
  if (source === destination || dag[source].includes(destination)) {
    return 1;
  }
  let pathCount = 0;
  visitedNode.push(source);
  dag[source].forEach((node) => {
    if (!visitedNode.includes(node)) {
      pathCount =
        indirectPathCount(dag, node, destination, visitedNode) + pathCount;
    }
  });
  return pathCount;
};

function getSubpath(num) {
  let result = num;
  if (num === 0 || num === 1) return 1;
  while (num > 1) {
    num--;
    result *= num;
  }
  return result;
}

module.exports = {
  getSubpath,
  indirectPathCount,
  directedEdgesCount,
  createDAG,
};
