import { combineReducers } from 'redux';
import authReducer from './authReducer';
import directoryTreeReducer from './directoryTreeReducer';
import referenceReducer from './referencesReducer';
import inputDataReducer from './inputDataReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  directoryTree: directoryTreeReducer,
  references: referenceReducer,
  inputData: inputDataReducer
});

export default rootReducer;
