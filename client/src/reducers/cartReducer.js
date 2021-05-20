import { 
    ADD_CART, 
    GET_CART,
    DELETE_CART,
    CART_ERROR,
    BUY_CART
} from '../actions/types';

const initialState = {
    cart: [],
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_CART:
            return{
                ...state,
                cart: action.payload
            }
        case BUY_CART:
            return{
                ...state,
                cart: []
            }
        case ADD_CART:
            return{
                ...state,
                cart: [...state.cart, action.payload]
            }
        case DELETE_CART:
            return {
                ...state,
                cart: state.cart.filter(citem => citem._id !== action.payload)
            }
        case CART_ERROR:
            console.log(action.payload)
            return{
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};