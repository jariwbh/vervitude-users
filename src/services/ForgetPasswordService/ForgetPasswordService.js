import Axios from '../../helpers/appConfig';

const ForgetPasswordService = (body) => {
    return Axios.post('public/member/resetpassword', body);
}

export default ForgetPasswordService;