import Axios from '../../helpers/appConfig'

function HelpSupportService(data) {
    const body = JSON.stringify(data)
    return Axios.post('supports', body);
}

export default HelpSupportService;