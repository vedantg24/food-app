import { 
    GET_RESTAURANTS,
    GET_RESTAURANT, 
    REST_ERROR,
    SET_CURRENT, 
    CLEAR_CURRENT, 
    ADD_RESTAURANT, 
    DELETE_RESTAURANT,
    ADD_MENUITEM,
    DELETE_MENUITEM
} from '../actions/types';

const initialState = {
    restaurants: null,
    restaurant: null,
    current: null,
    menuitems: null,
    error: null
};

export default (state= initialState, action) => {
    switch (action.type) {
        case GET_RESTAURANTS:
            return {
                ...state,
                restaurants: action.payload,
            };
        case GET_RESTAURANT:
            return {
                ...state,
                restaurant: action.payload.rest,
                menuitems: action.payload.items.items
            };
        case ADD_RESTAURANT:
            return {
                ...state,
                restaurants: [...state.restaurants, action.payload]
            };
        case DELETE_RESTAURANT:
            return{
                ...state,
                restaurants: state.restaurants.filter(rest => rest._id !== action.payload)
            };
        case ADD_MENUITEM:
            return {
                ...state,
                menuitems: [...state.menuitems, action.payload]
            };
        case DELETE_MENUITEM:
            return{
                ...state,
                menuitems: state.menuitems.filter(items => items._id !== action.payload)
            };
        case REST_ERROR:
            console.log(action.payload);
            return {
                ...state,
                error: action.payload
            };
        case SET_CURRENT:
            localStorage.setItem('restaurantid', action.payload); 
        default:
            return state ;
    }
}