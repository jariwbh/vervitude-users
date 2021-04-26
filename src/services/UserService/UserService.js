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

export { UserProfileService, UserUpdateService };