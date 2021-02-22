import orderServices from "../services/order_services";
import {orderConstants} from "../constants/order_constants";


export function addToBasket(product_id, quantity) {
    return dispatch => {
        dispatch(request());

        orderServices.addToBasket(product_id, quantity)
            .then(
                res => {
                    dispatch(success(res));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                }
            )
    }
    function request() { return { type: orderConstants.ADD_TO_BASKET_REQUEST}};
    function failure(err) { return { type: orderConstants.ADD_TO_BASKET_FAILURE, data: null, error: err}}
    function success(res) { return { type: orderConstants.ADD_TO_BASKET_SUCCESS, data: res, error: null}}
}


export function getBasket() {
    return dispatch => {
        dispatch(request());

        orderServices.getBasket()
            .then(
                res => {
                    dispatch(success(res));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error));
                }
            )
    }
    function request() { return { type: orderConstants.GET_BASKET_REQUEST}};
    function failure(err) { return { type: orderConstants.GET_BASKET_FAILURE, data: null, error: err}}
    function success(res) { return { type: orderConstants.GET_BASKET_SUCCESS, data: res, error: null}}
}

