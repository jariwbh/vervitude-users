import Axios from '../../helpers/appConfig'

const CategoryService = () => {
    const body =
    {
        'search': [{
            'searchfield': 'status',
            'searchvalue': 'active',
            'criteria': 'eq',
            'datatype': 'text'
        }, {
            'searchfield': 'formid',
            'searchvalue': '607410dfdc539111b09d6a8f',
            'criteria': 'eq',
            'datatype': 'objectId'
        }], 'sort': { 'createdAt': 1 }, 'formname': 'skill'
    }
    return Axios.post('formdatas/filter', body)
}

const SubCategoryService = (val) => {
    const body =
    {
        "search": [{
            "searchfield": "status",
            "searchvalue": "active",
            "criteria": "eq",
            "datatype": "text"
        }, {
            "searchfield": "property.skillcategory",
            "searchvalue": val,
            "criteria": "eq",
            "datatype": "text"
        }], "formname": "skill"
    }
    return Axios.post('formdatas/filter', body)
}

export { CategoryService, SubCategoryService };