import { calendarToNumeric } from './dateHelpers';
import { isValueValid } from './globals';
import { getTraiFromNode } from './treeMisHelpers';

export const getExtravals = (nodes, colorBy, providedVals) => {
  let valsInTree = nodes.map((node) => getTraiFromNode(node, colorBy));
  valsInTree = [...new Set(valsInTree)];
  return valsInTree.filter((x) => providedVals.indexOf(x) === -1).filter((x) => isValueValid(x));
};

export const numDate = (value) => {
  switch (typeof value) {
    case 'number':
      return value;
    case 'string':
      return calendarToNumeric(value, true);
    default:
      return undefined;
  }
};

export const calcNodeColor = (tree, colorScale) => {
  if (tree && tree.nodes && colorScale && colorScale.colorBy) {
    const nodeColorAttr = tree.nodes.map((node) => getTraiFromNode(node, colorScale.colorBy));
    return nodeColorAttr.map((value) => colorScale.scale(value));
  }
  return null;
};
