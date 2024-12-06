import { createSlice } from '@reduxjs/toolkit';

const initAuthState = {
  user: null,
  loading: false,
  error: null
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initAuthState,
  reducers: {
    signInRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null
      };
    },

    getAccountRequest: (state) => {
      return {
        ...state,
        error: null
      };
    },

    signInSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    },

    signInFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    },

    updateInforRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null
      };
    },

    updateInforSuccess: (state, action) => {
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          ...state.user,
          ...action.payload
        })
      );
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    },

    updateInforFailure: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    },

    logout: () => initAuthState
  }
});

export const Actions = authSlice.actions;
export default authSlice.reducer;
