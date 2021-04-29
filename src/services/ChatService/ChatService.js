import Axios from '../../helpers/appConfig'

function StartChatService(body) {
    return Axios.post('formdatas', body);
}

export { StartChatService };