import Axios from '../../helpers/appConfig'


function DisputeChatAdd(body) {
    JSON.stringify(body)
    return Axios.post('supports', body);
}


function DisputeChatFilterService(id) {
    const body =
    {
        "search": [{ "searchfield": "customerid", "searchvalue": id, "datatype": "ObjectId", "criteria": "eq" },
        { "searchfield": "category", "searchvalue": "Dispute", "datatype": "text", "criteria": "eq" }]
    }
    return Axios.post('supports/filter', body);
}

export { DisputeChatAdd, DisputeChatFilterService };