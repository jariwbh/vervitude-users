import Axios from '../../helpers/appConfig'

function OrganizationSetting() {
    return Axios.get('organizationsettings');
}

function Paymentgateway(id) {
    let body = {
        "billid": id
    }
    return Axios.post('public/paymentgateway', body);
}

export { OrganizationSetting, Paymentgateway };