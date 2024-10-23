import { createSlice } from '@reduxjs/toolkit';

const initInputData = {
  inputFilesData: [],
  indexReference: null
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
        indexReference: action.payload
      };
    },

    resetInputFilesData: () => {
      return initInputData;
    }
  }
});

export const Actions = inputDataSlice.actions;
export default inputDataSlice.reducer;
