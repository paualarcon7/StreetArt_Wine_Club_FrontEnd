import axios from 'axios'
import { GET_PRODUCTS, LOADING_ACTION, GET_PRODUCT_BY_ID, GET_FILTER_PRODUCTS, GET_FILTER_QUANTITIES } from './allActions';


const headers = {
    headers: {
        "accept-encoding": null,
    }
}

export function loadingAction(payload) {
    return {
        type: LOADING_ACTION,
        payload,
    }
};

export function getProducts() {
    return async function (dispatch) {
        try {
            let products = await axios.get('http://localhost:3001/products', headers);
            console.log(products.data)
            return (dispatch({
                type: GET_PRODUCTS,
                payload: products.data
            }),
                dispatch(loadingAction(false)))
        } catch (error) {
            return error
        }
    }
};

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var detail = await axios.get(`http://localhost:3001/products/${id}`
                , headers);

            return dispatch({
                type: GET_PRODUCT_BY_ID,
                payload: detail.data
            }),
                dispatch(loadingAction(false))

        } catch (error) {
            console.log("Error", error)
        }

    }
