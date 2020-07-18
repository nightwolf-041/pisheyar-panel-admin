import * as authActionCreators from '../storeConfigure/actionCreators/authActionCreators'
let axios = require('axios');

let axiosConfig = axios.create({
    baseURL: 'http://185.211.59.237/api/'
});

axiosConfig.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        authActionCreators.loggedOut()
    }
    return error;
});

export default axiosConfig;