import { createSlice } from '@reduxjs/toolkit';
import { convertDirectoryToNodeData } from '../../components/DirectoryTree/convert-directory-to-node-data';
const initDirectoryTreeState = {
  nodeData: null,
  loading: false,
  error: null
};

const directoryTreeSlice = createSlice({
  name: 'directoryTree',
  initialState: initDirectoryTreeState,
  reducers: {
    getNodeDataRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null
      };
    },

    getNodeDataSuccess: (state, action) => {
      const data = action.payload;
      const nodeData = convertDirectoryToNodeData(data);
      return {
        ...state,
        loading: false,
        nodeData: nodeData
      };
    },

    getNodeDataFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }
  }
});

export const Actions = directoryTreeSlice.actions;
export default directoryTreeSlice.reducer;
