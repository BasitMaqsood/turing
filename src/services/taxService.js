import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiEndpoint + '/tax';

export function getTaxesType(){
    return http.get(apiEndpoint);
}

export function getTaxTypeByID(id){
    return http.get(apiEndpoint + "/" + id);
}