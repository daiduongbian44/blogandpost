import * as constants from './Constants';

function Reducer(state, action) {
    switch (action.type) {
        case constants.FETCH_LIST_PRODUCTS:
            return {
                ...state,
                ListProducts: action.payload
            }
        case constants.FETCH_LIST_USERS:
            return {
                ...state,
                ListUsers: action.payload
            }
        case constants.FETCH_LIST_CATEGORIES:
            return {
                ...state,
                ListCategories: action.payload
            }
        case constants.CHANGE_TAB:
            return {
                ...state,
                ActiveTab: action.payload
            }
        case constants.TOGGLE_DISPLAY_USER_DETAIL:
            return {
                ...state,
                IsOpenUserDetail: !state.IsOpenUserDetail,
                UserDetail: action.payload.userItem
            }
        default:
            return state;
    }
}

export default Reducer