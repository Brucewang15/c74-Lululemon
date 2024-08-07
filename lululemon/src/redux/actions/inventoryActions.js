import {myKey, inventoryURL} from "../utils/helper";
import {actionTypes} from "./actionTypes";
import axios from 'axios';



export const fetchInventory = () => {
    return dispatch => {
        //TODO: take store into account
        axios.get(`${inventoryURL}`).then(res => {
                const stock = res.data.stock;
                dispatch({
                    type: actionTypes.SET_INVENTORY,
                    payload: stock
                });
            })
            .catch(err => {
                console.error(`error fetching product stock of items`, err)
            })
    }
}