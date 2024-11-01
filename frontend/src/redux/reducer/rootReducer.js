import { combineReducers } from 'redux';
import authReducer from './authReducer';
import directoryTreeReducer from './directoryTreeReducer';
import referenceReducer from './referencesReducer';
import inputDataReducer from './inputDataReducer';
import metadata from 'auspice/src/reducers/metadata';
import tree from 'auspice/src/reducers/tree';
import frequencies from 'auspice/src/reducers/frequencies';
import entropy from 'auspice/src/reducers/entropy';
import controls from 'auspice/src/reducers/controls';
import browserDimensions from 'auspice/src/reducers/browserDimensions';
import notifications from 'auspice/src/reducers/notifications';
import narrative from 'auspice/src/reducers/narrative';
import treeToo from 'auspice/src/reducers/treeToo';
import measurements from 'auspice/src/reducers/measurements';

const rootReducer = combineReducers({
  auth: authReducer,
  directoryTree: directoryTreeReducer,
  references: referenceReducer,
  inputData: inputDataReducer,
  metadata,
  tree,
  frequencies,
  controls,
  entropy,
  browserDimensions,
  notifications,
  narrative,
  treeToo,
  // general: auspiceGeneralReducer,
  // query: auspiceQueryReducer,
  measurements
});

export default rootReducer;
