import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { myKey, productURL, singleProductURL } from "../../redux/helper";
import { Modal } from "./Modal";

const ProductDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { productID } = useParams(); // Getting the productID from URL parameters if needed
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const colorId = params.get('colorId');
        axios.get(`${singleProductURL}/${productID}?mykey=${myKey}`)
            .then(res => {
                const productData = res.data.rs;
                console.log('productData1 ===>', productData);
                if (!productData || !productData.images || productData.images.length === 0) {
                    navigate('/wrong-product');
                }
                setProduct(productData);
            }) // Corrected by adding a closing brace here
            .catch(error => {
                console.log('error fetching product', error);
                navigate('/wrong-product');
            });
    }, [productID, navigate, location.search]); // Added dependencies for useEffect

    if (error) {
        return <div>Failed to load product details. Please try again later.</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return <>
        <h1>Product Details</h1>
        <p>Name: {product.name}</p>
        <p>Description: {product.description}</p>
        {/* Add more fields as necessary based on the structure of product data */}
    </>;
};

export default ProductDetails;
