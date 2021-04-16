import Axios from 'axios';

const appConfig = Axios.create({
    baseURL: 'http://dashboard.vervitude.co/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default appConfig;