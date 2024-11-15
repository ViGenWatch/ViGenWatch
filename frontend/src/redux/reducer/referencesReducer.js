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

    //role user 0x01

    updateRequireStatusRequest: (state) => {
      return {
        ...state,
        loading: 'true',
        error: null
      };
    },

    updateRequireStatusSuccess: (state, action) => {
      const referenceId = action.payload.referenceId;
      const nextStatus = action.payload.status;
      const prevReferences = state.references;
      if (nextStatus) {
        return {
          ...state,
          loading: false,
          references: prevReferences.map((reference) =>
            reference.id === referenceId ? { ...reference, require: nextStatus } : reference
          )
        };
      } else {
        return {
          ...state,
          loading: false,
          references: prevReferences.map((reference) =>
            reference.id === referenceId ? { ...reference, status: nextStatus } : reference
          )
        };
      }
    },

    //role user 0x02

    updateStatusRequestRoleAuthority: (state) => {
      return {
        ...state,
        loading: 'true',
        error: null
      };
    },

    updateStatusRoleAuthoritySuccess: (state, action) => {
      const { referenceId, status: nextStatus } = action.payload;
      const prevReferences = state.references;
      return {
        ...state,
        loading: false,
        references: prevReferences.map((reference) =>
          reference.id === referenceId ? { ...reference, status: nextStatus, require: 0 } : reference
        )
      };
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
