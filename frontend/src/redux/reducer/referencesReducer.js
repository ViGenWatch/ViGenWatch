import { createSlice } from '@reduxjs/toolkit';

const initReferencesState = {
  references: null,
  loading: false,
  error: null
};

const referencesSlice = createSlice({
  name: 'references',
  initialState: initReferencesState,
  reducers: {
    getReferencesRequest: (state) => {
      return {
        ...state,
        loading: 'true',
        error: null
      };
    },

    getReferencesSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        references: action.payload
      };
    },

    getReferencesFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }
  }
});

export const Actions = referencesSlice.actions;
export default referencesSlice.reducer;
