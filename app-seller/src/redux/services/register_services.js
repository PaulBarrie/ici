
const API_URL = 'https://seller.ici.localhost/api';


function register(name, email, phone, password) {
    const query = `mutation{
        createSeller(seller: {name: "${name}", email: "${email}", phone: "${phone}", password: "${password}"}) {
            id,
            name,
            email,
            password
        }
    }`
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query: query})
    };
    return fetch(API_URL, requestOptions)
    .then(handleResponse)
    .then(resp => {
        return resp;
    });
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(API_URL, requestOptions).then(handleResponse);
}



function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(API_URL, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(API_URL, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        else if (data["errors"]){
            const error = data["errors"][0]["message"];
            return Promise.reject(error);
        }
        return data;
    });
}

export const registerService = {
    register
};
