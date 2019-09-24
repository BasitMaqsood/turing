import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiEndpoint + '/categories';
// const apiEndpoint = '/categories';

export function getCategories() {
    return http.get(apiEndpoint);
  }
  