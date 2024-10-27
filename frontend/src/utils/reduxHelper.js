export const createAction =
  (type, ...argNames) =>
  (...args) => {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[arg] = args[index];
    });
    return action;
  };

export const createReducer = (initialState, handlers) => {
  const reducer = (state = initialState, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

  return Object.assign(reducer, { handlers, initialState });
};
