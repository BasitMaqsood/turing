import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiEndpoint + '/orders';
const token = localStorage.getItem('token');

export async function createOrder(cart_id, shipping_id , tax_id){
    console.log("Create Order Service" , cart_id, shipping_id, tax_id)
    try{
        return await http.post(apiEndpoint,  {cart_id , shipping_id , tax_id},  { headers: {"Authorization" : token }});
    }catch(ex){

    }
}