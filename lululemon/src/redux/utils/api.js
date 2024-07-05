import axios from 'axios';
import { singleProductURL, productURL, myKey } from './helper';
import {setToken, setUser} from "../actions/authAction";
import {useDispatch} from "react-redux";

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

export const refreshToken = async () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    try {
        const response = await axios.post(`http://api-lulu.hibitbyte.com/auth/refresh-token?mykey=${myKey}`, {
            email: userInfo.email,
            password:"ITLabAPI@2024"
        });
        const newToken = response.data.data.token;
        const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours

        localStorage.setItem('token', newToken);
        localStorage.setItem('tokenExpiration', expirationTime);

        return newToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
}

const api = axios.create({
    baseURL: 'http://api-lulu.hibitbyte.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        if (token && tokenExpiration) {
            const isTokenExpired = new Date().getTime() > tokenExpiration;
            if (isTokenExpired) {
                const newToken = await refreshToken();
                if (newToken) {
                    config.headers['Authorization'] = `Bearer ${newToken}`;
                }
            } else {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;