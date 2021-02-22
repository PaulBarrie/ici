import { authConstants } from '../constants/auth_constants';


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, loading: false, user, error: {identifier: "", password: ""}} : 
  {loggedIn: false,loading: false,user: {identifier: "", password: "", remember: false}, error: {identifier: "", password: ""}};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...initialState,
        loading: true
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loggedIn: true,
        loading: false
      };
    case authConstants.LOGIN_INVALID_IDENTIFIER:
      return {
        ...state,
        error: {identifier: "Unknown identifier", password:""},
        loading: false
      };
    case authConstants.LOGIN_INVALID_PASSWORD:
      return {
        ...state,
        error: {identifier: "", password: "Invalid password"},
        loading: false
      };
    case authConstants.LOGOUT:
      return initialState;
    default:
      return state
  }
}