import Axios from '../../helpers/appConfig'

function LoginService(email) {
    const body = {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        }, {
            "searchfield": "property.primaryemail",
            "searchvalue": email,
            "criteria": "eq",
            "datatype": "text"
        }]
    }
    return Axios.post('members/filter', body);
}

function LoginWithMobileService(mobile) {
    const body = {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        }, {
            "searchfield": "property.mobile",
            "searchvalue": mobile,
            "criteria": "eq",
            "datatype": "text"
        }]
    }
    return Axios.post('members/filter', body);
}

export { LoginService, LoginWithMobileService }