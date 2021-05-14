import Axios from '../../helpers/appConfig'

function PromoCodeService() {
    const body = {
        'search': [{
            'searchfield': 'status',
            'searchvalue': 'active',
            'criteria': 'eq',
            'datatype': 'text'
        }], 'sort': { 'createdAt': 1 }
    }
    return Axios.post('coupons/filter', body);
}

export default PromoCodeService;