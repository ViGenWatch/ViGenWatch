import { createReducer } from '../../utils/reduxHelper';
import * as types from '../../actions/types';
export const initTreeDataState = () => ({
  loaded: false,
  nodes: null,
  name: undefined,
  visibility: null,
  visibilityVersion: 0,
  nodeColors: null,
  nodeColorsVersion: 0,
  tipRadii: null,
  tipRadiiVersion: 0,
  branchThickness: null,
  branchThicknessVersion: 0,
  vaccines: false,
  version: 0,
  idxOfInViewRootNode: 0,
  totalStateCounts: {},
  observedMutations: {},
  availableBranchLabels: [],
  selectedClade: undefined
});

const setDataStart = (state, action) => Object.assign({}, initTreeDataState, action.data.tree);

const treeReducer = createReducer(initTreeDataState, {
  [types.SET_DATA_START]: setDataStart
});

export default treeReducer;
