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
    },

    updateRequireStatusRequest: (state) => {
      return {
        ...state,
        loading: 'true',
        error: null
      };
    },

    updateRequireStatusSuccess: (state, action) => {
      const referenceId = action.payload.referenceId;
      const status = action.payload.status;
      const prevReferences = state.references;
      if (status) {
        return {
          ...state,
          loading: false,
          references: prevReferences.map((reference) =>
            reference.id === referenceId ? { ...reference, require: status } : reference
          )
        };
      } else {
        return {
          ...state,
          loading: false,
          references: prevReferences.map((reference) =>
            reference.id === referenceId ? { ...reference, status: status } : reference
          )
        };
      }
    },

    getReferencesRequestRoleAuthority: (state) => {
      return {
        ...state,
        loading: 'true',
        error: null
      };
    }
  }
});

export const Actions = referencesSlice.actions;
export default referencesSlice.reducer;
