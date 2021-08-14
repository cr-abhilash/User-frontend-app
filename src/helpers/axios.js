import axios from 'axios';
import { api } from '../urlConfig';


const token = window.localStorage.getItem('token');

const axiosIntance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token || window.localStorage.getItem('token')}` : ''
    }
});

axiosIntance.interceptors.request.use((req) => {
    
        req.headers.Authorization = `Bearer ${token || window.localStorage.getItem('token')}`;
    
    return req;
})

axiosIntance.interceptors.response.use((res) => {
    return res;
}, (error) => {
    console.log(error.response);
    if(error.status==401){
        localStorage.clear();
    }
    return Promise.reject(error);

})

export default axiosIntance;