import Axios from '../../helpers/appConfig'

function LoginService(data) {
    const body = {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        }, {
            "searchfield": "membernumber",
            "searchvalue": data.email,
            "criteria": "eq",
            "datatype": "text"
        }]
    }
    return Axios.post('members/filter', body);
}

export default LoginService;