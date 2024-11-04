import { combineReducers } from 'redux';
import authReducer from './authReducer';
import directoryTreeReducer from './directoryTreeReducer';
import referenceReducer from './referencesReducer';
import inputDataReducer from './inputDataReducer';
import metadata from '@khaitd0340/auspice/src/reducers/metadata';
import tree from '@khaitd0340/auspice/src/reducers/tree';
import frequencies from '@khaitd0340/auspice/src/reducers/frequencies';
import entropy from '@khaitd0340/auspice/src/reducers/entropy';
import controls from '@khaitd0340/auspice/src/reducers/controls';
import browserDimensions from '@khaitd0340/auspice/src/reducers/browserDimensions';
import notifications from '@khaitd0340/auspice/src/reducers/notifications';
import narrative from '@khaitd0340/auspice/src/reducers/narrative';
import treeToo from '@khaitd0340/auspice/src/reducers/treeToo';
import measurements from '@khaitd0340/auspice/src/reducers/measurements';
import executionReducer from './executionReducer';

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
  measurements,
  execution: executionReducer
});

export default rootReducer;
