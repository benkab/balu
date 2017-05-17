import { combineReducers } from 'redux';

import branchReducer from './branchReducer';
import menuReducer from './menuReducer';
import userReducer from './userReducer';
import navigationReducer from './navigationReducer';
import transferReducer from './transferReducer';


export default combineReducers({
  branchReducer,
  menuReducer,
  userReducer,
  navigationReducer,
  transferReducer
});