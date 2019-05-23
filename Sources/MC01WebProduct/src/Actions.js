import * as constants from './Constants'
import axios from 'axios'
import { toast } from 'react-toastify'

export function handleChangeTab(dispatch, tabId) {
    dispatch({type: constants.CHANGE_TAB, payload: tabId})
}

export async function getListProductsAsync(dispatch) {
    try {
        const response = await axios.get(constants.ProductResourceUrl)
        dispatch({
            type: constants.FETCH_LIST_PRODUCTS,
            payload: response.data.Data
        })
    } catch (error) {
        console.error(error)
        toast.error("Error loading!", {
            position: toast.POSITION.TOP_RIGHT
        })
    }
}

export async function getListUsersAsync(dispatch) {
    try {
        const response = await axios.get(constants.UserResourceUrl)
        dispatch({
            type: constants.FETCH_LIST_USERS,
            payload: response.data.Data
        })
    } catch (error) {
        console.error(error)
        toast.error("Error loading!", {
            position: toast.POSITION.TOP_RIGHT
        })
    }
}

export async function getListCategoriesAsync(dispatch) {
    try {
        const response = await axios.get(constants.CategoryResourceUrl)
        dispatch({
            type: constants.FETCH_LIST_CATEGORIES,
            payload: response.data.Data
        })
    } catch (error) {
        console.error(error)
        toast.error("Error loading!", {
            position: toast.POSITION.TOP_RIGHT
        })
    }
}

export function toggleDiplayUserDetail(dispatch, userItem) {
    dispatch({
        type: constants.TOGGLE_DISPLAY_USER_DETAIL,
        payload: {
            userItem
        }
    })
}

export async function likeProductAsync(dispatch, userId, productId, status) {
    try {
        const response = await axios.post(constants.UserProductResourceUrl, {
            UserId: userId,
            ProductId: productId,
            IsLiked: status
        })
        toggleDiplayUserDetail(dispatch, null)
        if(status) {
            toast.success("Liked this product!", {
                position: toast.POSITION.TOP_RIGHT
            })
        } else {
            toast.success("Unliked this product!", {
                position: toast.POSITION.TOP_RIGHT
            })
        }

        await getListUsersAsync(dispatch)
    } catch (error) {
        console.error(error)
        toast.error("Error loading!", {
            position: toast.POSITION.TOP_RIGHT
        })
    }
}