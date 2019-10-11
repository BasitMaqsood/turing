import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiEndpoint + '/shipping/regions/';

export function getShippingRegions(){
    return http.get(apiEndpoint);
}

export function getshippingRegionDetails(id){
    return http.get(apiEndpoint + id);
}