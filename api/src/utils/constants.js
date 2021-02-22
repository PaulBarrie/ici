exports.errorName = {
    INTERNAL_ERROR: 'INTERNAL ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    EMAIL_ALREADY_USED: 'EMAIL_ALREADY_USED',
    PHONE_ALREADY_USED: 'PHONE_ALREADY_USED',
    INVALID_EMAIL: 'INVALID_EMAIL',
    INVALID_PHONE: 'INVALID_PHONE',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    INVALID_PRODUCT_ID: 'INVALID_PRODUCT_ID',
    INVALID_PRODUCT_ORDER_ID: 'INVALID_PRODUCT_ORDER_ID',
}

exports.errorType = {
    UNAUTHORIZED: {
        message: "Authentication is required for the requested operation.",
        statusCode: 401
    },
    FORBIDDEN: {
        message: "Server refused to perform the requested operation",
        statusCode: 403
    },
    EMAIL_ALREADY_USED:{
        message: "Email is already used",
        statusCode: 403
    },
    PHONE_ALREADY_USED:{
        message: "Phone is already used",
        statusCode: 403
    },
    INVALID_EMAIL: {
        message: "The provided email matches with none of our records",
        statusCode: 403 
    },
    INVALID_PHONE: {
        message: "The provided phone number matches with none of our records",
        statusCode: 403 
    },
    INVALID_PASSWORD: {
        message: "The password is invalid",
        statusCode: 403
    },
    INVALID_PRODUCT_ID: {
        message: "The prodvided product id does not exist",
        statusCode: 403
    },
    INVALID_PRODUCT_ORDER_ID: {
        message: "The prodvided product order id does not exist",
        statusCode: 403
    },
    INTERNAL_ERROR: {
        message: "An internal error occured",
        statusCode: 500
    }
}

exports.errorMessage= (message, code) => {
    return ({message: message, statusCode: code})
}