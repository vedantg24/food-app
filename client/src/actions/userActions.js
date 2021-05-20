import{ 
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    SET_CURRENT,
    UPDATE_USER,
    USER_ERROR,
    CLEAR_ERRORS
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

//Load User
export const loadUser = ()=> async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/users');
        dispatch({ type: USER_LOADED, payload: res.data });

    } catch (err) {
        dispatch({ type:AUTH_ERROR });
    }
}

//Register user
export const register = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/users', formData, config);

        dispatch({ type: REGISTER_SUCCESS, payload: res.data });

        setAuthToken(res.data.token);
    } catch (err) {
        dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg }); 
    }
};

//Update user
export const updateUser = (user) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {

        const res = await axios.put(`api/users/${user.id}`, user, config);
        console.log(res.data);

        dispatch({ type: UPDATE_USER, payload: res.data });

    } catch (err) {
        dispatch({ type: USER_ERROR, payload: err.response.msg })    
    }
};

//Login User
export const login = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/users/login', formData, config);

        dispatch({ type: LOGIN_SUCCESS, payload: res.data });

        setAuthToken(res.data.token);
    } catch (err) {
        dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg }); 
    }
};

//Logout
export const logout = () => {
    return { 
        type: LOGOUT 
    };
};

//Set current user
export const setCurrent = (user) => {
    return{
        type: SET_CURRENT,
        payload: user
    };
};

//Clear Errors
export const clearErrors = () => {
    return { 
        type: CLEAR_ERRORS 
    };
};