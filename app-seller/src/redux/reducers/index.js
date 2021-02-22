
import { combineReducers } from 'redux';
import {register} from './register_reducer';
import { authentication } from './auth_reducer';

const rootReducer = combineReducers({
  register,
  authentication,
});

export default rootReducer;