import axios from 'axios';

axios.interceptors.response.use(null , error =>{
    const expectedError = 
      error.response && 
      error.response.status >=400 && 
      error.response.state <500;
      
      if(!expectedError){
  
        console.log(error);
      }

      return Promise.reject(error);
  });

  function setJwt(jwt){
    axios.defaults.headers.common['accessToken'] = jwt;
  }

  export default {
      get: axios.get,
      post: axios.post,
      put: axios.put,
      delete: axios.delete,
      setJwt
  };