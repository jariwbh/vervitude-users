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

function FindChatById(id) {
    let body =
    {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        },
        {
            "searchfield": "_id",
            "searchvalue": id,
            "criteria": "eq",
            "datatype": "objectId"
        }
        ],
        "formname": "livechat"
    }
    return Axios.post('formdatas/filter', body);
}

function EndChatService(id, body) {
    return Axios.put('formdatas/' + id, body);
}

export { StartChatService, RecentChatService, EndChatService, FindChatById };