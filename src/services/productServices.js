import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiEndpoint + '/products';

function productsUrl(id){
    return `${apiEndpoint}/${id}`;
}

function productsWithCategoryUrl(id){
    return `${apiEndpoint}/inCategory/${id}`;
}


export function getProducts(){
    return http.get(apiEndpoint);
}

export function getProduct(productId){
    return http.get(productsUrl(productId));
}

export function getProductsByCategory(categoryId){
    return http.get(productsWithCategoryUrl(categoryId));
}

export function saveProduct(product){
    if(product._id){
        const body = { ...product };
        delete body._id;
        return http.put(productsUrl(product._id), body);

    }
    return http.post(apiEndpoint, product);
}

export function deleteMovie(productId){
    return http.delete(productsUrl(productId));
}

