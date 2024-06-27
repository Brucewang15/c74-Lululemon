import axios from 'axios';
import { singleProductURL, productURL, myKey } from './helper';

export const fetchProductDetails = async (productId) => {
    try {
        const response = await axios.get(`${singleProductURL}/${productId}?mykey=${myKey}`);
        return response.data.rs;
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
};

export const fetchFirstPageProducts = async() => {
    try {
        const response = await axios.post(productURL);
        //console.log(response.data);
        return response.data.rs.products;

    } catch (error) {
        console.log('error fetching goes well products: ', error);
        return null;
    }
}