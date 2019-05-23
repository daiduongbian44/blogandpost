import * as constants from './Constants'

let InitStore = {
    ListProducts: [],
    ListUsers: [],
    ListCategories: [],
    ActiveTab: constants.TAB_PRODUCT,
    EditingUser: null,
    EditingProduct: null,
    NewUser: null,
    NewProduct: null,
    IsOpenUserDetail: false,
    UserDetail: null
}

export default InitStore