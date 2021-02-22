import { authHeader } from '../helpers/auth-headers';


const API_URL = 'https://client.ici.localhost/api';

function addToBasket(product_id, quantity) {
    const query = `mutation {
        addToBasket(p_order: {product_id: ${product_id}, quantity: ${quantity}}) {
            productOrdering{
                id,
                quantity,
                total_price,
                product {
                    id,
                    name,
                    measure_unit,
                    price_ht,
                    tax_rate,
                    picture
                },
        }
    }}`
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'user': localStorage.getItem('user')
        },
        body: JSON.stringify({query: query})
    };

    return fetch(API_URL, requestOptions)
        .then((response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            let error;
            if (!response.ok) {
                if (response.status === 401) {
                    logout();
                }
                error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            } else if (data["errors"]){
                const error = data["errors"][0]["message"];
                return Promise.reject(error);
            } else {
                const order = data["data"]["addToBasket"]["productOrdering"];
                return order;
            }
        
        })
    });
}

function getBasket() {
    const query = `query {
        basket{
            id,
            quantity,
            total_price,
            product {
                id,
                name,
                measure_unit,
                price_ht,
                tax_rate,
                picture
            },
        }
    }`
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'user': localStorage.getItem('user')
        },
        body: JSON.stringify({query: query})
    };

    return fetch(API_URL, requestOptions)
        .then((response) => {
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            let error;
            if (!response.ok) {
                if (response.status === 401) {
                    logout();
                }
                error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            } else if (data["errors"]){
                const error = data["errors"][0]["message"];
                return Promise.reject(error);
            } else {
                const basket = data["data"]["basket"];
                return basket;
            }
        
        })
    });
}


const orderServices = {
    addToBasket,
    getBasket
}

export default orderServices;