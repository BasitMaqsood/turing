import jwtDecode from 'jwt-decode';
import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiEndpoint +  '/customers/login';
const tokenKey = 'token';


export async function login(email , password){
    const { data: jwt } = await http.post(apiEndpoint , { email , password });
    localStorage.setItem(tokenKey , jwt);
}

export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey , jwt);
}

export function logout(){
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser(){
    try{
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
 
      }catch{
          return null;
      }
}

export function getJwt(){
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    loginWithJwt,
    getCurrentUser,
    getJwt
};