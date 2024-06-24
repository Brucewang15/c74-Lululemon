import fakeCartData from '../../components/shoppingcart/fakeCartData.json'


const initialState = {
    shoppingCart: fakeCartData.cartItems
    // shoppingCart: []     // 模拟空购物车
}

export const shoppingCartReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}