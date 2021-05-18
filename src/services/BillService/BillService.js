import Axios from '../../helpers/appConfig'

function BillService(data) {
    const body = JSON.stringify(data)
    return Axios.post('bills', body);
}

function BillListService(id) {
    let body =
    {
        "search": [{
            "searchfield": "status",
            "searchvalue": "Paid",
            "criteria": "eq",
            "datatype": "text"
        },
        {
            "searchfield": "customerid",
            "searchvalue": id,
            "criteria": "eq",
            "datatype": "objectId"
        },
        {
            "searchfield": "type",
            "searchvalue": "Walletrecharge",
            "criteria": "eq",
            "datatype": "text"
        }
        ],
        "formname": "bill"
    }
    return Axios.post('bills/filter', body);
}

function WalletDetailService(id) {
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
        "formname": "member"
    }
    return Axios.post('members/filter/view', body);
}

export { BillService, BillListService, WalletDetailService };