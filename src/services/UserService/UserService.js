import Axios from '../../helpers/appConfig';

const UserProfileService = (data) => {
    let id = data._id;
    const body = JSON.stringify(data);
    return Axios.patch('members/' + id, body);
}

const UserUpdateService = (data) => {
    let id = data._id;
    const body = JSON.stringify(data);
    return Axios.put('members/' + id, body);
}

const UserPatchService = (id, data) => {
    const body = JSON.stringify(data);
    return Axios.patch('members/' + id, body);
}

const getByIdMemberService = (id) => {
    return Axios.get('members/' + id);
}

const ConsultantListService = (id) => {
    let body;
    if (id != null && id != undefined) {
        body = {
            "search": [{
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            }, {
                'searchfield': 'role',
                'searchvalue': '5f6b3b6599e17f1ccc76318c',
                'criteria': 'eq',
                'datatype': 'objectId'
            }, {
                "searchfield": "property.skill",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "text"
            }], "sort": { "createdAt": 1 },
            "formname": "consultant"
        }
    } else {
        body = {
            'search': [{
                'searchfield': 'status',
                'searchvalue': 'active',
                'criteria': 'eq',
                'datatype': 'text'
            },
            {
                'searchfield': 'role',
                'searchvalue': '5f6b3b6599e17f1ccc76318c',
                'criteria': 'eq',
                'datatype': 'objectId'
            }
            ], "formname": "consultant"
        }
    }
    return Axios.post('users/filter', body);
}

const TopConsultantViewListService = (id) => {
    let body;
    if (id != null && id != undefined) {
        body = {
            "search": [{
                "searchfield": "status",
                "searchvalue": "active",
                "criteria": "eq",
                "datatype": "text"
            }, {
                "searchfield": "property.skill",
                "searchvalue": id,
                "criteria": "eq",
                "datatype": "text"
            }], "sort": { "createdAt": 1 },
            "formname": "consultant"
        }
    } else {
        body = {
            'search': [{
                'searchfield': 'status',
                'searchvalue': 'active',
                'criteria': 'eq',
                'datatype': 'text'
            }
            ], "formname": "consultant"
        }
    }

    return Axios.post('users/view/filter', body);
}

const UserListService = () => {
    const body = {
        'search': [{
            'searchfield': 'status',
            'searchvalue': 'active',
            'criteria': 'eq',
            'datatype': 'text'
        }]
    }
    return Axios.patch('members/' + id, body);
}

const getByIdUser = (id) => {
    const body = {
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
        "formname": "consultant"
    }
    return Axios.post('users/view/filter', body);
}

const CheckUser = (body) => {
    return Axios.post('public/checkmember', body);
}

export {
    UserProfileService, UserUpdateService, getByIdUser, getByIdMemberService, CheckUser,
    ConsultantListService, UserListService, TopConsultantViewListService, UserPatchService
};