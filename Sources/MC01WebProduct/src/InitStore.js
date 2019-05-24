import * as constants from './Constants'

let InitStore = {
    ListProducts: [],
    ListUsers: [],
    ListCategories: [],
    ActiveTab: constants.TAB_USER,
    EditingUser: null,
    EditingProduct: null,
    
    NewUser: null,
    IsOpenNewUser: false,
    
    NewProduct: null,
    IsOpenUserDetail: false,
    UserDetail: null
}

export default InitStore