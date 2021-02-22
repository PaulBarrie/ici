import { productConstants } from '../constants/product_constants';



const initialState = {
  data: undefined,
  error: "",
  loading: false, 
  received: false,
}

export function products(state = initialState, action) {
  switch (action.type) {
    case productConstants.PRODUCT_SELLER_REQUEST:
      return {
        ...state,
        error: "",
        loading: true,
        received: false
      }
    case productConstants.PRODUCT_SELLER_SUCCESS:
      state =  {
        received: true,
        loading: false, 
        data: action.data,
        error: initialState.error
      };
      return state; 
    case productConstants.PRODUCT_SELLER_FAILURE:
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