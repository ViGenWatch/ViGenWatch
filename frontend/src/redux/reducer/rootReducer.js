import { combineReducers } from 'redux';
import authReducer from './authReducer';
import directoryTreeReducer from './directoryTreeReducer';
import referenceReducer from './referencesReducer';
import inputDataReducer from './inputDataReducer';
import treeReducer from './treeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  directoryTree: directoryTreeReducer,
  references: referenceReducer,
  inputData: inputDataReducer,
  treeState: treeReducer
});

export default rootReducer;
