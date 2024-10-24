import { createSlice } from '@reduxjs/toolkit';

export const initTreeDataState = () => {
  return {
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
  };
};

const treeDataSlice = createSlice({
  name: 'tree',
  initialState: initTreeDataState(),
  reducers: {
    setTreeDataState: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export const TreeActions = treeDataSlice.actions;
export default treeDataSlice.reducer;
