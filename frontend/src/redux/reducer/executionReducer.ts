import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Execution = {
  executionName: string;
  executionId: number;
  executionNumber: number;
};

export type ExecutionsSate = {
  executions: Execution[];
  executionSelected: Execution | null;
  loading: boolean;
  error: string | null;
};

export const initialExecutions: ExecutionsSate = {
  executions: [],
  executionSelected: null,
  loading: false,
  error: null
};

export const executionSlice = createSlice({
  name: 'execution',
  initialState: initialExecutions,
  reducers: {
    getExecutionsRequest: (state) => {
      return {
        ...state,
        loading: true,
        error: null
      };
    },

    getExecutionsSuccess: (state, action: PayloadAction<Execution[]>) => {
      state.executions = action.payload;
      state.executionSelected = action.payload.length > 0 ? action.payload[0] : null;
      state.loading = false;
      state.error = null;
    },

    getExecutionsFailure: (state, action: PayloadAction<{ error: string }>) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    },

    changeSelectExecution: (state, action: PayloadAction<{ value: number }>) => {
      const changeExecution: Execution[] = state.executions.filter(
        (execution) => execution.executionId === action.payload.value
      );
      return {
        ...state,
        executionSelected: changeExecution[0]
      };
    }
  }
});

export const Actions = executionSlice.actions;
export default executionSlice.reducer;
