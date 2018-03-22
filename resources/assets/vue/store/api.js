import axios from 'axios';

const axiosI = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://stage-api.modasti.net/api'
});

axiosI.interceptors.request.use(function (request) {
    
    if (typeof window === 'undefined') {
        return request;
    }
    
    request.headers['api_token'] = window.$store.getters.api_token || localStorage.getItem('api_token') || '';

    return request;

}, function (error) {
    return Promise.reject(error);
});

axiosI.interceptors.response.use(function (response) {
    if (typeof window === 'undefined') {
        return response;
    }
    if(response.status == 401){
        localStorage.removeItem('api_token');
        localStorage.removeItem('user');
        window.location = '/';
    };
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axiosI;