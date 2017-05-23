import { combineReducers } from 'redux';

import menuReducer from './menuReducer';
import userReducer from './userReducer';
import navigationReducer from './navigationReducer';
import parkingReducer from './parkingReducer';


export default combineReducers({
  menuReducer,
  userReducer,
  navigationReducer,
  parkingReducer
});
