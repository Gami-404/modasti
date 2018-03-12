import axios from 'axios';

export default axios.create({
    baseURL: 'http://stage-api.modasti.net/api'
});