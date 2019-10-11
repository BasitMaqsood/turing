import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiEndpoint +'/customers';

function register(user){
    return http.post(apiEndpoint , {
        email: user.username,
        name: user.name,
        password: user.password
    });
}

export  {
    register
};