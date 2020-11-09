import axios from 'axios';
import { toast } from 'react-toastify';
import userService from './userService';

axios.defaults.headers.common["x-auth-token"]= userService.getJwt();

// add middleware to post request
axios.interceptors.response.use(null,(error)=>{
    const expectedError = error.response && error.response.status >= 403;
    if (expectedError){
        toast('An unexpected error occured.');
    } 
    // because doSubmit is async function, we return Promise in the interceptor
    return Promise.reject(error);
}
);

export default {
    get:axios.get,
    post:axios.post,
    put:axios.put,
    patch:axios.patch,
    delete:axios.delete
}