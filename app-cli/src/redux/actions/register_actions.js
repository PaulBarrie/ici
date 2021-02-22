import {registerConstants} from '../constants/register_constants';
import {registerService} from '../services/register_services';
import  {history} from '../helpers/history';
// import { browserHistory } from 'react-router'
import {authActions} from "./auth_actions";


export function registerRequest(){
    return {
        type: registerConstants.REGISTER_REQUEST
    }
   }

export function registerSuccess(results){
    return {
        type: registerConstants.REGISTER_SUCCESS,
        data: results,
        error: null
    }
}

export function registerError(error){
    let errType;
    if (error == 'EMAIL_ALREADY_USED'){
        errType = registerConstants.EMAIL_ALREADY_USED;
    } else if (error == 'PHONE_ALREADY_USED') {
        errType = registerConstants.PHONE_ALREADY_USED;
    } else {
        errType = registerConstants.UNKNOWN_ERROR;
    }
    return {
        type: errType,
        data: null,
        error: error
    }
}

export const register = (values) =>{
    const {first_name, last_name, phone, email, password} = values; 
    return (dispatch) => {
        dispatch(registerRequest())
        registerService.register(first_name, last_name, email, phone, password)
            .then(
                user => {
                    dispatch(registerSuccess(user));
                },
                error => {
                    dispatch(registerError(error));
                }
            )
    }
}

