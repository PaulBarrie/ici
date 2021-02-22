import {logout} from '../actions/auth_actions';


const API_URL = 'https://client.ici.localhost/api';


export function productsOfSeller(id, page, perpage) {
    const query = `query {
        productSeller(id: ${id}, page: ${page}, perpage: ${perpage}) {
          products{
              id,
              name,
              expiration_date,
              q_available,
              measure_unit,
              description,
              tax_rate,
              price_ht,
              category {
                  name
              }
          },
          nb_products 
      }
      }`
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({query: query})
    };

    return fetch(API_URL, requestOptions)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(data);
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
            const sellers = data["data"]["productSeller"];
            return sellers;
        }
    });
}                                                     