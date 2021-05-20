import axios from 'axios';
import { 
    GET_RESTAURANTS, 
    GET_RESTAURANT,
    REST_ERROR, 
    SET_CURRENT,
    ADD_RESTAURANT, 
    DELETE_RESTAURANT,
    ADD_MENUITEM,
    DELETE_MENUITEM
} from './types';

//Get restaurants from server
export const getRestaurants = () => async dispatch => {
    try {
        const res = await axios.get('/api/restaurants')

        dispatch({ type: GET_RESTAURANTS, payload: res.data });

    } catch (err) {
        dispatch({ type: REST_ERROR, payload: err.response.statusText })    
    }
};

//Get a restaurant from server by its id
export const getRestaurant = () => async dispatch => {
    try {
        const id= localStorage.getItem('restaurantid');

        const res = await axios.get(`/api/restaurants/${id}`);

        const items = await axios.get(`/api/menu/${id}`);

        dispatch({ type: GET_RESTAURANT, payload: {rest: res.data, items:items.data} });

    } catch (err) {
        dispatch({ type: REST_ERROR, payload: err.response.statusText })    
    }
};

//Add a restaurant 
export const addRestaurant = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/restaurants', data, config);

        dispatch({ type: ADD_RESTAURANT, payload: res.data });

    } catch (err) {
        dispatch({ type: REST_ERROR, payload: err.response.statusText })    
    }
};

//Delete restaurant
export const deleteRestaurant = (id) => async dispatch => {
    
    try {
        await axios.delete(`/api/restaurants/${id}`);

        dispatch({ type: DELETE_RESTAURANT, payload: id });

    } catch (err) {
        dispatch({ type: REST_ERROR, payload:err.response.statusText })    
    }
};

//Add a menuitem 
export const addMenuitem = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/menu', data, config);

        dispatch({ type: ADD_MENUITEM, payload: res.data });

    } catch (err) {
        dispatch({ type: REST_ERROR, payload: err.response.statusText })    
    }
};

//Delete menuitem of a restaurant
export const deleteMenuitem = (id) => async dispatch => {
    
    try {
        await axios.delete(`/api/menu/${id}`);

        dispatch({ type: DELETE_MENUITEM, payload: id });

    } catch (err) {
        dispatch({ type: REST_ERROR, payload:err.response.statusText })    
    }
};

//Set current restaurant
export const setCurrent = (id) => {
    return{
        type: SET_CURRENT,
        payload: id
    };
};
