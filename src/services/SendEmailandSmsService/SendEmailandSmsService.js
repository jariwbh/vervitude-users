import Axios from '../../helpers/appConfig';

const SendEmailandSmsService = (body) => {
    return Axios.post('communications/send', body);
}

export default SendEmailandSmsService;