import { authConstants } from '../constants/auth_constants';
import { authService } from '../services/auth_services';


function loginSuccess(res){
    return {
        type: authConstants.LOGIN_SUCCESS,
        user: res,
        error: null
    }
}

function loginError(err){
    let errType;
    if (err == 'INVALID_EMAIL' || err == 'INVALID_PHONE') {
        errType = authConstants.LOGIN_INVALID_IDENTIFIER;
    } else if (err == 'INVALID_PASSWORD') {
        errType = authConstants.LOGIN_INVALID_PASSWORD;
    } else {
        errType = authConstants.LOGIN_FAILURE
    }
    return{ 
        type: errType,
        user: null,
        error: err
    }   
}


export function login(identifier, password, remember) {
    return dispatch => {
        dispatch(request());

        authService.login(identifier, password, remember)
            .then(
                user => {
                    dispatch(loginSuccess(user));
                },
                error => {
                    dispatch(loginError(error));
                }
            )
    }
    function request() { return { type: authConstants.LOGIN_REQUEST} }
}

export function logout() {
    authService.logout();
    return { type: authConstants.LOGOUT};
}



