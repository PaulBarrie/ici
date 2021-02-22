import { authHeader } from '../helpers/auth-headers';


const API_URL = 'https://client.ici.localhost/api';

function login(identifier, password, remember=true) {
    const query = `mutation{
        loginClient(identifier: "${identifier}", password: "${password}", remember: ${remember}) {
            uid,
            role,
            token,
            remember
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

function logout() {
    localStorage.removeItem('user');
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
            const user = data["data"]["loginClient"];
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
    });
}

export const authService = {
    login,
    logout
};
