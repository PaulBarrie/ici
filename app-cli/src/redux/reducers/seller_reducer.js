import { sellerConstants } from '../constants/seller_constants';



const initialState = {
  data: [],
  error: "",
  loading: false, 
  received: false,
}

export function sellers_around(state = initialState, action) {
  switch (action.type) {
    case sellerConstants.SELLER_AROUND_REQUEST:
      return {
        ...initialState,
        loading: true, 
      }
    case sellerConstants.SELLER_AROUND_SUCCESS:
      state =  {
        received: true,
        loading: false, 
        data: action.data,
        error: initialState.error
      };
      return state; 
    case sellerConstants.SELLER_AROUND_FAILURE:
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