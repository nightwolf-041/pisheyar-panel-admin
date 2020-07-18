let axios = require('axios');

let axiosConfig = axios.create({
    baseURL: 'http://185.211.59.237/'
});

export default axiosConfig;