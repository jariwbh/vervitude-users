import Axios from '../../helpers/appConfig'

function FeedBackService(body) {
    return Axios.post('formdatas', body);
}
export default FeedBackService;