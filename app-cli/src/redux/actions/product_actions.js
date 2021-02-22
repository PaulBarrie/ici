import {productConstants} from "../constants/product_constants"; 
import {productsOfSeller} from "../services/product_services";

export function productSeller(id, page, perpage) {
    return dispatch => {
        dispatch(request());

        productsOfSeller(id, page, perpage)
            .then(
                products => {
                    dispatch(success(products));
                },
                error => {
                    dispatch(failure(error)); 
                }
            )
    }
    function request() { return { type: productConstants.PRODUCT_SELLER_REQUEST} }
    function success(res) { return {type: productConstants.PRODUCT_SELLER_SUCCESS, data: res, error: null}}
    function failure(err) { return {type: productConstants.PRODUCT_SELLER_FAILURE, data: null, error: err}}

}
