import Axios from 'axios';

const appConfig = Axios.create({
    baseURL: 'http://dashboard.vervitude.co/api/',
    headers: {
        'Content-Type': 'application/json',
        'authkey': '606abd8799e17f1678300c12'
    }
});

export default appConfig;