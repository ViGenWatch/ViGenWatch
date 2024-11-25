import { createSlice } from '@reduxjs/toolkit';

const initInputData = {
  inputFilesData: [],
  selectedReferenceId: null
};

const inputDataSlice = createSlice({
  name: 'inputData',
  initialState: initInputData,
  reducers: {
    setInputFilesData: (state, action) => {
      const prevFiles = state.inputFilesData;
      return {
        ...state,
        inputFilesData: [...prevFiles, ...action.payload]
      };
    },

    removeInputFileData: (state, action) => {
      const newInputFilesData = state.inputFilesData.filter((file) => file.name !== action.payload);
      return {
        ...state,
        inputFilesData: newInputFilesData
      };
    },

    setIndexReference: (state, action) => {
      return {
        ...state,
        selectedReferenceId: action.payload
      };
    },

    removeSelectReference: (state) => {
      return {
        ...state,
        selectedReferenceId: null
      };
    },

    resetInputFilesData: () => {
      return initInputData;
    }
  }
});

export const Actions = inputDataSlice.actions;
export const ActionsInputData = inputDataSlice.actions;
export default inputDataSlice.reducer;
