import Axios from '../../helpers/appConfig';

const UserService = (data) => {
    console.log(`data`, data);
    let id = data._id;
    const body = JSON.stringify(data);
    return Axios.patch('members/' + id, body);
}

export default UserService;