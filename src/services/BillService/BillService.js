import Axios from '../../helpers/appConfig'

function BillService(data) {
    const body = JSON.stringify(data)
    return Axios.post('bills', body);
}

function BillPaymentService(data) {
    const body = JSON.stringify(data)
    return Axios.post('billpayments', body);
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

function WalletUsageListService() {
    let body =
    {
        "viewname": "bi-billspent",
        "formname": "formdata",
        "search": []
    }
    return Axios.post('branches/view/filter', body);
}

function WalletRechargeWithCouponService(data) {
    const body = JSON.stringify(data)
    return Axios.post('wallettxns', body);
}

export { BillService, BillListService, WalletDetailService, WalletUsageListService, BillPaymentService, WalletRechargeWithCouponService };