export const CART_PRODUCT_COUNT = "CART_PRODUCT_COUNT"


export const cartCount = (count) => {
    return {
        type: CART_PRODUCT_COUNT,
        payload: {
            cartCount: count
        }
    }
}