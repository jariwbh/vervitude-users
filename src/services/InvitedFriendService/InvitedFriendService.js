import Axios from '../../helpers/appConfig'

function InvitedFriendService(data) {
    const body = JSON.stringify(data)
    return Axios.post('enquiries', body);
}

export default InvitedFriendService;