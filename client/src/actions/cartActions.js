import {
    ADD_CART,
    DELETE_CART,
    GET_CART,
    CART_ERROR,
    BUY_CART
} from './types';
import axios from 'axios';

//Add items to cart
export const addCart = (item) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        await axios.post('/api/cart', item, config);

        dispatch({ type: ADD_CART, payload: item });

    } catch (err) {
        dispatch({ type: CART_ERROR, payload: err.response.statusText });
    }
};

//Get cart items
export const getCart = () => async dispatch => {
    try {
        const res = await axios.get('/api/cart');

        dispatch({ type: GET_CART, payload: res.data });

    } catch (err) {
        dispatch({ type: CART_ERROR, payload: err.response.statusText });
    }
};

//Buy cart items
export const buyCart = () => async dispatch => {
    try {
        const res = await axios.get('/api/cart/buy');

        dispatch({ type: BUY_CART, payload: res.data });

    } catch (err) {
        dispatch({ type: CART_ERROR, payload: err.response.statusText });
    }
};

//Delete menuitem
export const deleteMenuItem = (item) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        await axios.delete('/api/cart', { data: item }, config);

        dispatch({ type: DELETE_CART, payload: item._id });

    } catch (err) {
        dispatch({ type: CART_ERROR, payload: err.response.statusText })
    }
};