
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// require('./bootstrap');


window.Vue = require('vue');
import router from '../vue/Router';
import store from '../vue/store';
import axios from 'axios';
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const axiosI = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://stage-api.modasti.net/api'
});

axiosI.interceptors.request.use(function (request) {
    request.headers['api_token'] = store.getters.api_token;
    return request;
}, function (error) {
    return Promise.reject(error);
});

axiosI.interceptors.response.use(function (response) {
    if(response.status == 401){
        localStorage.removeItem('api_token');
        localStorage.removeItem('user');
        window.location = '/';
    };
    return response;
}, function (error) {
    return Promise.reject(error);
});

window.axios = axiosI;


Vue.component(
    'App', 
    require('../vue/App.vue')
);

const app = new Vue({
    el: '#app',
    store,
    router,
});