import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    SET_CURRENT,
    UPDATE_USER,
    USER_ERROR,
    CLEAR_ERRORS
} from '../actions/types';

const initialState = {
    user: null,
    current: null,
    error: null,
    isAuthenticated: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload,
                current: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true
            };
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                error: action.payload
            };
        case SET_CURRENT:
            return{
                ...state,
                current: action.payload
            };
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
                current: action.payload
            };
        case USER_ERROR:
            console.log(action.payload);
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};