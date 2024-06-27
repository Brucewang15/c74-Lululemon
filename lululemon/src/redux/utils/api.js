import axios from 'axios';
import { singleProductURL, myKey } from './helper';

export const fetchProductDetails = async (productId) => {
    try {
        const response = await axios.get(`${singleProductURL}/${productId}?mykey=${myKey}`);
        return response.data.rs;
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
};