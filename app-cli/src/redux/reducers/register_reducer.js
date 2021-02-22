import { registerConstants } from '../constants/register_constants';


const initialState = {
  data: {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_conf: '',
    policy: false,
  },
  error: {
    first_name: '',
    last_name: '',
    email: '',
    password: '', 
    password_conf: '',
    phone: '',
    policy: ''
  },
  loading: false, 
  registered: false,
}

export function register(state = initialState, action) {
  switch (action.type) {
    case registerConstants.REGISTER_REQUEST:
      return {
        ...initialState,
        loading: true, 
      }
    case registerConstants.REGISTER_SUCCESS:
      state =  {
        registered: true,
        loading: false, 
        data: state.data,
        error: initialState.error
      };
      return state; 
    case registerConstants.REGISTER_FAILURE:
      console.error("Unknown error");
      return {
          ...state,
          loading: false, 
          registered: false,
      };
    case registerConstants.EMAIL_ALREADY_USED:
      return {
        ...state,
        error: {email: "This email is already used", ...initialState},
        loading: false, 
        registered: false,
      };
    case registerConstants.PHONE_ALREADY_USED:
      return {
        ...state,
        error: {phone: "This phone number is already used", ...initialState},
        loading: false, 
        registered: false,
      };
    default:
      return state
  }
}