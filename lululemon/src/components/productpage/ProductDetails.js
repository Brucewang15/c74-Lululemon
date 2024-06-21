import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { myKey, productURL, singleProductURL } from "../../redux/helper";
import { Modal } from "./Modal";
import "./ProductDetails.css";
import ExpandablePanel from "./ExpandablePanel";

const ProductDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { productID } = useParams(); // Getting the productID from URL parameters if needed
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const toggleOpen = () => setIsOpen(!isOpen);


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
    const maxI = product.featurePanels.length-1;

    return <>


        <h1>Product Details</h1>
        <p>Name: {product.name}</p>
        <p>Description: {product.description}</p>
        {/* Add more fields as necessary based on the structure of product data */}

        <ul className="productDetails">

            {product.featureTitles.map((panel, index) => ( //() implicit return!!

                    <li className="productDetailsIndividual" key = {index}>

                        <img src={panel.iconPath} alt=""/>
                        <a href={`#productDetailsPanel${index}`}>{panel.title}</a>

                    </li>


            ))}

        </ul>


        <div className="productDetailPanels">

            {product.featurePanels.map((panel, index) => {

                if (panel.isPanel) {

                    return <>
                    <div className="productDetailPanel" id={`productDetailsPanel${index}`} onClick={toggleOpen}>

                        <div className="top" >
                            <div className="topLeft">
                                <img src={panel.iconPath} alt=""/>
                                {panel.title.replace('(Click to Expand)', '')}
                            </div>
                            <div className="arrow">
                                <div className="arrowHorizontal"></div>
                                <div className="arrowVerticle"></div>
                            </div>
                        </div>

                        <ExpandablePanel children = {panel.content} open={isOpen} i = {index} lastI = {maxI}/>



                    </div>
                    </>
                }
                else {
                    return <>
                    <div className="productDetailPanel" id={`productDetailsPanel${index}`}>

                        <img src={panel.iconPath} alt=""/>
                        <a href=""></a>
                    </div>

                    </>
                }

            })}



        </div>





    </>;
};

export default ProductDetails;
