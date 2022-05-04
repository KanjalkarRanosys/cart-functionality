import { CART_PRODUCT_COUNT } from "../actions"

const initialState = [{
        cart_count: 0,
        test: true
}]


export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_PRODUCT_COUNT:
            return {
                ...state,
                // cart_count: action.payload
            }

        default:
            return state
    }
}