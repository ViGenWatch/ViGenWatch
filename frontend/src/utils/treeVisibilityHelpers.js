import { freqScale, NODE_NOT_VISIBLE, NODE_VISIBLE, NODE_VISIBLE_TO_MAP_ONLY } from './globals';
import { calcTipCounts } from './treeCountHelper';
import { getTraiFromNode } from './treeMisHelpers';

const getInView = (tree) => {
  if (!tree.nodes) {
    console.error('getInView() ran without tree.nodes');
    return null;
  }
  let inView;
  try {
    inView = tree.nodes.map((d) => d.shell.inView);
  } catch (e) {
    inView = tree.nodes.map((d) => (d.inView !== undefined ? d.inView : true));
  }
  return inView;
};

export const calcVisibility = (tree, controls, dates, inView) => {
  if (tree.nodes) {
    const visibility = tree.nodes.map((node, idx) => {
      if (inView[idx]) {
        const nodeDate = getTraiFromNode(node, 'num_date');
        const parentNodeDate = getTraiFromNode(node.parent, 'num_date');
        if (!nodeDate || !parentNodeDate) {
          return NODE_VISIBLE;
        }
        if (controls.branchLengthsToDisplay === 'divOnly') {
          return NODE_VISIBLE;
        }
        if (nodeDate >= dates.dateMinNumeric && nodeDate <= dates.dateMaxNumeric) {
          return NODE_VISIBLE;
        }
        if (!(nodeDate < dates.dateMinNumeric || parentNodeDate > dates.dateMaxNumeric)) {
          return NODE_VISIBLE_TO_MAP_ONLY;
        }
      }
      return NODE_NOT_VISIBLE;
    });
    return visibility;
  }
  console.error('calcVisibility ran without tree.nodes');
  return NODE_VISIBLE;
};

const calcBranchThickness = (nodes, visibility) => {
  let maxTipCount = nodes[0].tipCount;
  if (!maxTipCount) {
    maxTipCount = 1;
  }
  return nodes.map((d, idx) => {
    if (visibility[idx] === NODE_VISIBLE) {
      return freqScale((d.tipCount + 5) / (maxTipCount + 5));
    }
    return 0.5;
  });
};

export const calculateVisiblityAndBranchThickness = (tree, controls, dates) => {
  const inView = getInView(tree);
  const idxOfFilteredRoot = undefined;
  const visibility = calcVisibility(tree, controls, dates, inView);
  calcTipCounts(tree.nodes[0], visibility);
  return {
    visibility: visibility,
    visibilityVersion: tree.visibilityVersion + 1,
    branchThickness: calcBranchThickness(tree.nodes, visibility),
    branchThicknessVersion: tree.branchThicknessVersion + 1,
    idxOfFilteredRoot: idxOfFilteredRoot
  };
};
