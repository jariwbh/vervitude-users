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
            ]
        }
    }
    return Axios.post('users/filter', body);
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

export { UserProfileService, UserUpdateService, ConsultantListService, UserListService };