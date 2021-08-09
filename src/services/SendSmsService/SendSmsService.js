import Axios from '../../helpers/appConfig';

const SendSmsService = (body) => {
    return Axios.post('communications/send', body);
}

export default SendSmsService;