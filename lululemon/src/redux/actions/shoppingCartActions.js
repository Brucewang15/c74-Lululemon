// Add an item to the cart
import {actionTypes} from "./actionTypes";
import axios from "axios";
import {useState} from "react";
import {useSelector} from "react-redux";

// add items to server
export const addItemToServer = (cartItem, cartId) => async dispatch => {
    try {
        const res = await axios.post(`http://localhost:3399/cart/${cartId}/addItem`, cartItem)
        console.log('cartItem from cartAction ==>', cartItem)
        console.log('res from cartAction ==>', res)
        console.log('cartId from cartACtion ==>', cartId)
        dispatch(fetchCartItems(true))
    } catch (e) {
        console.log('adding item to server failed', e)
    }
}

export const addItems = (product) => (dispatch, getState) => {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    const existingItemIndex = cart.findIndex(
        (item) => item.productId === product.productId && item.colorId === product.colorId && item.size === product.size
    );

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    dispatch({
        type: actionTypes.ADD_ITEMS,
        payload: cart,
    });
};

// Change the quantity of a specific item in the cart when the user is NOT logged in
export const changeQuantity = (newQuantity, index) => (dispatch, getState) => {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    if (index >= 0 && index < cart.length) {
        cart[index].quantity = newQuantity;
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        dispatch({
            type: actionTypes.CHANGE_QUANTITY,
            payload: cart,
        });
    }
};

export const changeServerQuantity = (cartId, itemId, newQuantity) => async dispatch => {
    try {
        const res = await axios.put(`http://localhost:3399/cart/${cartId}/updateQuantity/${itemId}`, {quantity: newQuantity})
        dispatch(fetchCartItems(true))
    } catch (e) {
        console.log('change item quantity on server failed', e)
    }
}


// Update an item in the cart when the user is NOT logged in
export const editCart = (newSize, newColorId, index, colorDes, image) => (dispatch, getState) => {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    if (index >= 0 && index < cart.length) {
        cart[index].size = newSize;
        cart[index].colorId = newColorId;
        cart[index].swatchName = colorDes;
        cart[index].image = image;

        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        dispatch({
            type: actionTypes.EDIT_CART,
            payload: cart,
        });
    }
};

// edit cart item attributes (such as color, size etc) on our db server
export const editServerCart = (cartId, itemId, newItem) => async dispatch => {
    await axios.put(`http://localhost:3399/cart/${cartId}/updateItem/${itemId}`, {newItem})
    dispatch(fetchCartItems(true))
}


// Remove an item from the cart (both logged in or not)
export const removeProduct = (isLoggedIn, productId, itemId, size, colorId) => async (dispatch, getState) => {
    if (isLoggedIn === true) {
        const cartId = localStorage.getItem('cartId')
        await axios.delete(`http://localhost:3399/cart/${cartId}/deleteItem/${itemId}`)
        dispatch(fetchCartItems(isLoggedIn))

    } else {

        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        cart = cart.filter((product) => {
            return product.productId !== productId || product.id !== itemId ||
                (product.size !== size && !(product.size === null && size === null)) ||
                product.colorId !== colorId;
        });
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        dispatch({
            type: actionTypes.REMOVE_PRODUCTS,
            payload: cart,
        });
    }
};


// Fetch cart items from local storage
export const fetchCartItems = (isLoggedIn) => async dispatch => {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const cartId = JSON.parse(localStorage.getItem('cartId'))


    if (isLoggedIn === true) {
        try {
            if (cart.length > 0) {
                console.log('Syncing cart with:', JSON.stringify({items: cart}, null, 2));
                const res1 = await axios.post(`http://localhost:3399/cart/${cartId}/syncCart`, {
                    items: cart
                }, {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                })
                console.log('merged cart from shopping cartAction', res1)
                localStorage.removeItem('shoppingCart')

            }

            const res = await axios.get(`http://localhost:3399/cart/${cartId}`)
            const cartFromServer = res.data.data
            console.log('cart items from server==>', cartFromServer)
            console.log('cart from localStorage==>', cart)


            // const newCart = cartFromServer.slice()
            // cart.forEach(localItem => {
            //     const index = newCart.findIndex(serverItem => {
            //         return serverItem.productId === localItem.productId &&
            //             serverItem.colorId === localItem.colorId &&
            //             serverItem.size === localItem.size
            //     })
            //     if (index > -1) {
            //         newCart[index].quantity += localItem.quantity
            //     } else {
            //         newCart.push(localItem)
            //     }
            // })
            dispatch({
                type: actionTypes.FETCH_CART_SUCCESS,
                payload: cartFromServer
            })
        } catch (e) {
            console.log('fetching cart error', e)
            dispatch({
                type: actionTypes.FETCH_CART_ERROR,
                payload: e
            })

        }
    } else
        dispatch({
            type: actionTypes.FETCH_CART_SUCCESS,
            payload: cart,
        });
};

export const getCartId = (cartId) => {
    return {
        type: actionTypes.SET_CARTID,
        payload: cartId,
    }
}


export const saveForLater = (item) => {
    return {
        type: actionTypes.SAVE_FOR_LATER,
        payload: item
    }
}

export const addBackToCart = (item) => {
    return {
        type: actionTypes.ADD_BACK_TO_CART,
        payload: item
    }
}
// import {actionTypes} from "./actionTypes";
// import axios from "axios";
//
// // export const changeQuantity = (newQuantity, index) => {
// //     return {
// //         type: actionTypes.CHANGE_QUANTITY,
// //         payload: {
// //             newQuantity,
// //             index
// //         }
// //
// //     }
// // }
// export const changeQuantity = (newQuantity, index, itemId) => async dispatch => {
//     try {
//         const response = await axios.post(`http://localhost:8000/cart/update/${itemId}`, {quantity: newQuantity});
//         dispatch({
//             type: actionTypes.CHANGE_QUANTITY,
//             payload: {
//                 newQuantity,
//                 index
//             }
//         });
//         dispatch(fetchCartItems());
//     } catch (error) {
//         console.error("Error updating quantity:", error);
//         // 可以在此处添加错误处理逻辑
//     }
// };
//
// export const updateQuantity = (quantity, index, itemId) => {
//     return {
//         type: actionTypes.CHANGE_QUANTITY,
//         payload: {
//             newQuantity: quantity,
//             index: index,
//             itemId: itemId
//         }
//     }
// };
//
//
// // export const edtCart = (newSize, newColorId, index, itemId) => async dispatch => {
// //     try {
// //         const response = await axios.post(`http://localhost:8000/cart/update/${itemId}`,
// //             {size: newSize, colorId: newColorId});
// //         dispatch({
// //             type: actionTypes.EDIT_CART,
// //             payload: {
// //                 newSize,
// //                 newColorId,
// //                 index
// //             }
// //         });
// //         dispatch(fetchCartItems());
// //     } catch (error) {
// //         console.error("Error updating cart:", error);
// //         // 可以在此处添加错误处理逻辑
// //     }
// // };
// export const edtCart = (newSize, newColorId, index, itemId, colorDes, image) => async (dispatch, getState) => {
//     try {
//         const {shoppingCartReducer: {shoppingCart}} = getState();
//
//         // 查找是否存在相同的商品
//         const existingItemIndex = shoppingCart.findIndex(item =>
//             item.productId === shoppingCart[index].productId &&
//             item.colorId === newColorId &&
//             item.size === newSize
//         );
//
//         if (existingItemIndex !== -1 && existingItemIndex !== index) {
//             // 如果存在相同的商品，并且不是当前更新的商品，合并数量
//             const updatedQuantity = shoppingCart[existingItemIndex].quantity + shoppingCart[index].quantity;
//             await axios.post(`http://localhost:8000/cart/update/${shoppingCart[existingItemIndex]._id}`, {quantity: updatedQuantity});
//
//             // 删除当前商品
//             await axios.delete(`http://localhost:8000/cart/delete/${itemId}`);
//
//             // 更新 Redux store
//             dispatch({
//                 type: actionTypes.MERGE_CART_ITEMS,
//                 payload: {
//                     existingItemIndex,
//                     updatedQuantity
//                 }
//             });
//         } else {
//             // 否则，正常更新
//             await axios.post(`http://localhost:8000/cart/update/${itemId}`, {
//                 size: newSize,
//                 colorId: newColorId,
//                 swatchName: colorDes,
//                 image: image});
//             dispatch({
//                 type: actionTypes.EDIT_CART,
//                 payload: {
//                     newSize,
//                     newColorId,
//                     index,
//                     colorDes,
//                     image
//                 }
//             });
//         }
//
//         dispatch(fetchCartItems());
//     } catch (error) {
//         console.error("Error updating cart:", error);
//     }
// };
//
// export const removeProduct = (itemId, selectedSize, selectedColorId) => {
//
//     return {
//         type: actionTypes.REMOVE_PRODUCTS,
//         // payload: {productID, selectedSize, selectedColorId}
//         payload: {itemId, selectedSize, selectedColorId}
//
//     }
// }
// // test to add new items, Whitney you can delete this later
//
// export const addItems = (product) => {
//     return {
//         type: actionTypes.ADD_ITEMS,
//         payload: product
//     }
// }
// export const fetchCartSuccess = (cartItems) => ({
//     type: actionTypes.FETCH_CART_SUCCESS,
//     payload: cartItems,
// });
//
// export const fetchCartFailure = (error) => ({
//     type: actionTypes.FETCH_CART_ERROR,
//     payload: error,
// });
// export const fetchCartItems = () => async (dispatch) => {
//     try {
//         const response = await axios.get('http://localhost:8000/cart');
//         console.log(response.data);
//         dispatch(fetchCartSuccess(response.data));
//     } catch (error) {
//         dispatch(fetchCartFailure(error));
//     }
// }
//
