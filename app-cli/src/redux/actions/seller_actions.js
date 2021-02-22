import {sellerConstants} from "../constants/seller_constants"; 
import {sellersAround} from "../services/seller_services";

export function getSellersAround(from, upto) {
    return dispatch => {
        dispatch(request());

        sellersAround(from, upto)
            .then(
                sellers => {
                    dispatch(success(sellers));
                },
                error => {
                    dispatch(failure(error));
                }
            )
    }
    function request() { return { type: sellerConstants.SELLER_AROUND_REQUEST} }
    function success(res) { return {type: sellerConstants.SELLER_AROUND_SUCCESS, data: res, error: null}}
    function failure(err) { return {type: sellerConstants.SELLER_AROUND_FAILURE, data: null, error: err}}

}