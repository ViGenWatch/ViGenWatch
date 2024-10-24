import { initTreeDataState } from '../redux/reducer/treeReducer';
import { calcFullTipCounts } from '../utils/treeCountHelper';
import { getDivFromNode, getTraiFromNode, getVaccineFromNode } from '../utils/treeMisHelpers';

const pseudoRandomName = () => (Math.random() * 1e32).toString(36).slice(0, 6);

const appendParentsToTree = (root) => {
  root.parent = root;
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    if (node.children) {
      node.children.forEach((child) => {
        child.parent = node;
        stack.push(child);
      });
    }
  }
};

const treeArrayByDfs = (root) => {
  const stack = [root];
  const array = [];
  while (stack.length !== 0) {
    const node = stack.pop();
    array.push(node);
    if (node.children) {
      for (let i = node.children.length - 1; i >= 0; i -= 1) {
        stack.push(node.children[i]);
      }
    }
  }
  return array;
};

const makeSubtreeRootNode = (nodesArray, subtreeIndicies) => {
  const node = {
    name: '__ROOT',
    node_attrs: { hidden: 'always' },
    children: subtreeIndicies.map((index) => nodesArray[index])
  };

  node.parent = node;

  const observedDivs = node.children.map((node) => getDivFromNode(node)).filter((div) => div !== undefined);
  if (observedDivs.length) node.node_attrs.div = Math.min(...observedDivs);
  const observedTimes = node.children
    .map((node) => getTraiFromNode(node, 'num_date'))
    .filter((num_date) => num_date !== undefined);
  if (observedTimes.length) node.node_attrs.num_date = { value: Math.min(...observedTimes) };
  return node;
};

const processNodes = (nodes) => {
  const nodeNamesSeen = new Set();
  const nodeAttrKeys = new Set();
  calcFullTipCounts(nodes[0]);

  nodes.forEach((node, idx) => {
    node.arrayIdx = idx;
    node.hasChildren = !!node.children;
    if (!node.name) {
      node.name = pseudoRandomName();
    } else if (nodeNamesSeen.has(node.name)) {
      const prevName = node.name;
      node.name = `${prevName}_${pseudoRandomName()}`;
    }
    nodeNamesSeen.add(node.name);
    Object.entries(node.node_attrs || {}).forEach(([attrKey, attrValue]) => {
      if (attrValue?.value !== undefined) {
        nodeAttrKeys.add(attrKey);
      }
    });
  });
  return { nodeAttrKeys, nodes };
};

const processBranchLabelInPlace = (nodes) => {
  const availableBranchLabels = new Set();
  nodes.forEach((node) => {
    if (node.branch_attrs && node.branch_attrs.labels) {
      Object.keys(node.branch_attrs.labels).forEach((label) => {
        availableBranchLabels.add(label);
        node.branch_attrs.labels[label] = String(node.branch_attrs.labels[label]);
      });
    }
  });
  return ['none', ...availableBranchLabels];
};

const collectObservedMutations = (nodesArray) => {
  const mutations = {};

  nodesArray.forEach((node) => {
    if (node.branch_attrs && node.branch_attrs.mutations) {
      Object.entries(node.branch_attrs.mutations).forEach(([gene, muts]) => {
        muts.forEach((mut) => {
          const key = `${gene}:${mut}`;
          mutations[key] = (mutations[key] || 0) + 1;
        });
      });
    }
  });
  return mutations;
};

export const treeDataToState = (treeData) => {
  const trees = Array.isArray(treeData) ? treeData : [treeData];
  const nodesArray = [];
  const subtreeIndicies = [];
  for (const treeRootNode of trees) {
    appendParentsToTree(treeRootNode);
    subtreeIndicies.push(nodesArray.length);
    nodesArray.push(...treeArrayByDfs(treeRootNode));
  }
  nodesArray.unshift(makeSubtreeRootNode(nodesArray, subtreeIndicies));
  const { nodeAttrKeys, nodes } = processNodes(nodesArray);
  nodes.forEach((n) => {
    n.parentInfo = {
      original: n.parent
    };
  });
  const vaccines = nodes.filter((node) => {
    const v = getVaccineFromNode(node);
    return v && (Object.keys(v).length > 1 || Object.keys(v)[0] !== 'serum');
  });
  const availableBranchLabels = processBranchLabelInPlace(nodes);
  const observedMutations = collectObservedMutations(nodes);
  return Object.assign({}, initTreeDataState(), {
    nodes,
    nodeAttrKeys,
    vaccines,
    observedMutations,
    availableBranchLabels,
    loaded: true
  });
};
