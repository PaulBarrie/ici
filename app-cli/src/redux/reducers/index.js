
import { combineReducers } from 'redux';
import {register} from './register_reducer';
import { authentication } from './auth_reducer';
import {sellers_around} from './seller_reducer';
import {products} from './product_reducer';
import {orders} from './order_reducer';
const rootReducer = combineReducers({
  register,
  authentication,
  sellers_around,
  products,
  orders
});

export default rootReducer;