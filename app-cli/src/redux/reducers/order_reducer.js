import { orderConstants } from '../constants/order_constants';


const initialState = {
  data: [],
  error: "",
  loading: false, 
  received: false,
}

export function orders(state = initialState, action) {
  switch (action.type) {
    case orderConstants.ADD_TO_BASKET_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
        received: false
      }
    case orderConstants.ADD_TO_BASKET_SUCCESS:
      let new_data;
      if (state.data.length === 0) {
        new_data = [action.data];
      } else {
        new_data = state.data.map((order) => {
          if (order.product.id == action.data.product.id) {
            return action.data;
          } else {
            return order;
          }
        });
      }
      console.log(new_data); 
      return {
        ...state,
        received: true,
        loading: false, 
        data: new_data,
      };
    case orderConstants.ADD_TO_BASKET_FAILURE:
      return {
          ...state,
          error: action.error, 
          loading: false, 
          received: false,
      };
    case orderConstants.GET_BASKET_REQUEST:
      return {
          ...state,
          error: "",
          loading: true,
          received: false
      };
    case orderConstants.GET_BASKET_SUCCESS:
      return {
          ...state,
          data: action.data, 
          loading: false, 
          received: false,
      };
      case orderConstants.GET_BASKET_FAILURE:
        return {
            ...state,
            error: action.error, 
            loading: false, 
            received: false,
        };

    default:
      return state
  }
}