import Axios from '../../helpers/appConfig'

function StartChatService(data) {
    const body = JSON.stringify(data)
    return Axios.post('formdatas', body);
}

export { StartChatService };