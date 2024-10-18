import { combineReducers } from 'redux';
import authReducer from './authReducer';
import directoryTreeReducer from './directoryTreeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  directoryTree: directoryTreeReducer
});

export default rootReducer;
