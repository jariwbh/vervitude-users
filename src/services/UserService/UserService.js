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

const ConsultantListService = () => {
    const body = {
        'search': [{
            'searchfield': 'status',
            'searchvalue': 'active',
            'criteria': 'eq',
            'datatype': 'text'
        }]
    }
    return Axios.post('users/filter', body);
}

export { UserProfileService, UserUpdateService, ConsultantListService };