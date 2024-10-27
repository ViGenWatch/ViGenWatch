import { createAction } from '../utils/reduxHelper';
import * as types from './types';

export const setDataStart = createAction(types.SET_DATA_START, 'data');

export const applyInViewNodesToTree = (idx, tree) => {
  const validIdxRoot = idx !== undefined ? idx : tree.idxOfInViewRootNode;
  tree.nodes.forEach((d) => {
    d.inView = false;
  });
  const _markChildrenInView = (node) => {
    node.inView = true;
    if (node.children) {
      for (const child of node.children) _markChildrenInView(child);
    }
  };
  const startingNode = tree.nodes[validIdxRoot].hasChildren
    ? tree.nodes[validIdxRoot]
    : tree.nodes[validIdxRoot].parent;
  _markChildrenInView(startingNode);
  return validIdxRoot;
};
