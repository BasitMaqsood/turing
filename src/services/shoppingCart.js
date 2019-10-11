import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiEndpoint + '/shoppingcart';

export function generateCartID(){
    return http.get(apiEndpoint + "/generateUniqueId");
}

export function addCart(cart_id , product_id , attributes){
    console.log('cart_id',cart_id)
    return http.post(apiEndpoint + "/add" , {cart_id , product_id , attributes});
}

export function getCartProducts(cart_id){
    console.log('getCartProducts',cart_id)
    return http.get(apiEndpoint + "/" + cart_id);
}

export function removeAllProduct(cart_id){
    return http.delete(apiEndpoint + "/empty/" + cart_id);
}

export function updateCartItem(item_id , quantity){
    console.log(quantity)
    return http.put(apiEndpoint + "/update/" + item_id ,  { quantity });
}

export function removeProduct(item_id){
    return http.delete(apiEndpoint + "/removeProduct/" + item_id);
}

export function gettotalAmount(cart_id){
    return http.get(apiEndpoint + "/totalAmount/" + cart_id);
}

// function productsWithCategoryUrl(id){
//     return `${apiEndpoint}/inCategory/${id}`;
// }


// export function getProducts(){
//     return http.get(apiEndpoint);
// }

// export function getProduct(productId){
//     return http.get(productsUrl(productId));
// }

// export function getProductsByCategory(categoryId){
//     return http.get(productsWithCategoryUrl(categoryId));
// }

// export function cartAdd(product){
//     if(product._id){
//         const body = { ...product };
//         delete body._id;
//         return http.put(productsUrl(product._id), body);

//     }
//     return http.post(apiEndpoint, product);
// }

// export function deleteMovie(productId){
//     return http.delete(productsUrl(productId));
// }