import Axios from '../../helpers/appConfig'

function StartChatService(body) {
    return Axios.post('formdatas', body);
}

function RecentChatService(id) {
    const body =
    {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        }, {
            "searchfield": "formid",
            "searchvalue": "608a5d7ebbeb5b2b03571f2c",
            "criteria": "eq",
            "datatype": "objectId"
        },
        {
            "searchfield": "contextid",
            "searchvalue": id,
            "criteria": "eq",
            "datatype": "objectId"
        }
        ], "formname": "livechat"
    }
    return Axios.post('formdatas/filter', body);
}

export { StartChatService, RecentChatService };