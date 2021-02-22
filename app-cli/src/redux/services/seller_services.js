

const API_URL = 'https://client.ici.localhost/api';

export function sellersAround(from, upto) {
    const query = `query {
        sellersAround(dist: ${upto}, from: [${from[0]}, ${from[1]}]) {
          id,
          name, 
          phone,
          email,
          address {
            location,
            street_nb,
            street_name,
            post_code,
            city,
            country
          }
          
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
            const sellers = data["data"]["sellersAround"];
            return sellers;
        }
    });
}